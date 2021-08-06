module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('set', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expressions: Sequelize.TEXT,
      public: Sequelize.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('set')
  }
}
