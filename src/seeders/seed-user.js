const { hashString } = require('../helpers/crypto')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
      {
        id: uuidv4(),
        email: 'admin@mail.com',
        password: hashString('hasloadmin'),
        username: 'admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        email: 'sample_1@mail.com',
        password: hashString('tomojehaslo1'),
        username: 'sample_1',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        email: 'sample_2@mail.com',
        password: hashString('tomojehaslo2'),
        role: 'user',
        username: 'sample_2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        email: 'sample_3@mail.com',
        password: hashString('tomojehaslo3'),
        role: 'user',
        username: 'sample_3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {})
  }
}
