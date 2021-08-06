const { hashString } = require('../helpers/crypto')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
      {
        email: 'sample_1@mail.com',
        password: hashString('tomojehaslo1'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sample_2@mail.com',
        password: hashString('tomojehaslo2'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sample_3@mail.com',
        password: hashString('tomojehaslo3'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {})
  }
}
