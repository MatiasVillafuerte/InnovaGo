const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { sendVerificationEmail } = require('../config/email');

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Register
exports.register = [
  body('name').trim().isLength({ min: 3, max: 255 }).withMessage('El nombre debe tener entre 3 y 255 caracteres'),
  body('email').trim().isEmail().withMessage('El correo electrónico no es válido'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden');
    }
    return true;
  }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: 'Error de validación',
          errors: errors.array().reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {})
        });
      }

      const { name, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'El correo electrónico ya está registrado',
          errors: { email: 'El correo electrónico ya está registrado' }
        });
      }

      // Create user with role (default: user)
      const user = await User.create({ name, email, password, role: role || 'user' });

      // Generate and send verification code
      const code = await user.generateVerificationCode();
      const emailSent = await sendVerificationEmail(email, code, name);

      if (!emailSent) {
        return res.status(500).json({
          success: false,
          message:
            'Usuario creado, pero no se pudo enviar el correo. Revisa la configuración SMTP en backend-node/.env y reinicia el servidor.'
        });
      }

      const token = generateToken(user.id);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente. Por favor verifica tu correo electrónico.',
        token,
        requires_verification: true,
        user: user.toJSON()
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar usuario'
      });
    }
  }
];

// Login
exports.login = [
  body('email').trim().isEmail().withMessage('El correo electrónico no es válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: 'Error de validación',
          errors: errors.array().reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {})
        });
      }

      const { email, password, remember } = req.body;

      // Find user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Las credenciales no coinciden con nuestros registros.'
        });
      }

      // Check if account is locked
      if (user.isLocked()) {
        const minutesLeft = Math.ceil((new Date(user.lockedUntil) - new Date()) / 60000);
        return res.status(423).json({
          success: false,
          message: `Tu cuenta ha sido bloqueada temporalmente. Intenta nuevamente en ${minutesLeft} minutos.`
        });
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        await user.incrementLoginAttempts();
        const attemptsLeft = 5 - user.loginAttempts;
        
        if (attemptsLeft > 0) {
          return res.status(401).json({
            success: false,
            message: `Las credenciales son incorrectas. Te quedan ${attemptsLeft} intentos.`
          });
        } else {
          return res.status(423).json({
            success: false,
            message: 'Tu cuenta ha sido bloqueada temporalmente por demasiados intentos fallidos.'
          });
        }
      }

      // Reset login attempts
      await user.resetLoginAttempts();

      // Check if email is verified
      if (!user.emailVerifiedAt) {
        // Generate new verification code if needed
        if (!user.verificationCode || new Date(user.verificationCodeExpiresAt) < new Date()) {
          const code = await user.generateVerificationCode();
          await sendVerificationEmail(email, code, user.name);
        }
        
        const token = generateToken(user.id);

        return res.json({
          success: true,
          message: 'Por favor verifica tu correo electrónico antes de acceder al dashboard.',
          requires_verification: true,
          token,
          user: user.toJSON()
        });
      }

      // Generate token
      const token = generateToken(user.id);

      res.json({
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        user: user.toJSON()
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión'
      });
    }
  }
];

// Get user
exports.getUser = async (req, res) => {
  try {
    res.json(req.user.toJSON());
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario'
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // In a real implementation, you might want to blacklist the token
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cerrar sesión'
    });
  }
};

// Verify email
exports.verifyEmail = [
  body('code').isLength({ min: 6, max: 6 }).withMessage('El código debe tener 6 dígitos'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: 'Error de validación',
          errors: errors.array().reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {})
        });
      }

      const { code } = req.body;
      const user = req.user;

      if (user.emailVerifiedAt) {
        return res.json({
          success: true,
          message: 'El correo ya ha sido verificado',
          user: user.toJSON()
        });
      }

      if (!user.verifyCode(code)) {
        return res.status(400).json({
          success: false,
          message: 'Código de verificación inválido o expirado'
        });
      }

      user.emailVerifiedAt = new Date();
      user.verificationCode = null;
      user.verificationCodeExpiresAt = null;
      await user.save();

      res.json({
        success: true,
        message: 'Correo verificado exitosamente',
        user: user.toJSON()
      });
    } catch (error) {
      console.error('Error en verificación:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar el correo'
      });
    }
  }
];

// Resend verification code
exports.resendVerificationCode = async (req, res) => {
  try {
    const user = req.user;

    if (user.emailVerifiedAt) {
      return res.status(400).json({
        success: false,
        message: 'El correo ya ha sido verificado'
      });
    }

    const code = await user.generateVerificationCode();
    const emailSent = await sendVerificationEmail(user.email, code, user.name);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Error al enviar el código de verificación'
      });
    }

    res.json({
      success: true,
      message: 'Código de verificación reenviado exitosamente'
    });
  } catch (error) {
    console.error('Error al reenviar código:', error);
    res.status(500).json({
      success: false,
      message: 'Error al reenviar el código de verificación'
    });
  }
};
