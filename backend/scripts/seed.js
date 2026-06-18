/**
 * Script para crear usuario de prueba
 * Uso: node scripts/seed.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { sequelize } = require('../config/database');
const User = require('../models/User');

const seedDatabase = async () => {
  try {
    console.log('🔄 Conectando a la base de datos...');
    
    // Sincronizar base de datos
    await sequelize.sync({ alter: true });
    console.log('✅ Base de datos sincronizada');

    // Usuarios de prueba
    const testUsers = [
      {
        name: 'Admin Usuario',
        email: 'admin@example.com',
        password: 'Admin123456',
        emailVerifiedAt: new Date()
      },
      {
        name: 'Emprendedor Test',
        email: 'emprendedor@example.com',
        password: 'Emprendedor123456',
        emailVerifiedAt: new Date()
      },
      {
        name: 'Usuario Regular',
        email: 'usuario@example.com',
        password: 'Usuario123456',
        emailVerifiedAt: new Date()
      }
    ];

    // Insertar usuarios
    for (const userData of testUsers) {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      
      if (!existingUser) {
        await User.create(userData);
        console.log(`✅ Usuario creado: ${userData.email}`);
      } else {
        console.log(`⏭️  Usuario ya existe: ${userData.email}`);
      }
    }

    console.log('\n📋 CREDENCIALES DE PRUEBA:');
    console.log('═════════════════════════════');
    testUsers.forEach(user => {
      console.log(`\nEmail: ${user.email}`);
      console.log(`Contraseña: ${user.password}`);
    });
    console.log('\n═════════════════════════════\n');

    await sequelize.close();
    console.log('✅ Seed completado exitosamente');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
};

seedDatabase();
