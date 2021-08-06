module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('set', [{
      name: 'sample set',
      author: 'admin',
      expressions: [],
      public: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
