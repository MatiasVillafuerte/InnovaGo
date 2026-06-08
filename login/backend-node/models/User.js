const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailVerifiedAt: {
    type: DataTypes.DATE,
    field: 'email_verified_at',
    allowNull: true
  },
  verificationCode: {
    type: DataTypes.STRING(6),
    field: 'verification_code',
    allowNull: true
  },
  verificationCodeExpiresAt: {
    type: DataTypes.DATE,
    field: 'verification_code_expires_at',
    allowNull: true
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    field: 'login_attempts',
    defaultValue: 0
  },
  lockedUntil: {
    type: DataTypes.DATE,
    field: 'locked_until',
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

// Instance methods
User.prototype.isLocked = function() {
  return this.lockedUntil && new Date(this.lockedUntil) > new Date();
};

User.prototype.incrementLoginAttempts = async function() {
  this.loginAttempts = (this.loginAttempts || 0) + 1;
  
  if (this.loginAttempts >= 5) {
    this.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  }
  
  await this.save();
};

User.prototype.resetLoginAttempts = async function() {
  this.loginAttempts = 0;
  this.lockedUntil = null;
  await this.save();
};

User.prototype.generateVerificationCode = async function() {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  this.verificationCode = code;
  this.verificationCodeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  await this.save();
  return code;
};

User.prototype.verifyCode = function(code) {
  return this.verificationCode === code && 
         this.verificationCodeExpiresAt && 
         new Date(this.verificationCodeExpiresAt) > new Date();
};

User.prototype.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  delete values.verificationCode;
  return values;
};

module.exports = User;
