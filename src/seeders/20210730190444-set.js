const expressions = require('./data/expressions')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('set', [
      {
        name: 'Fruits',
        slug: 'fruits',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
        authorId: '1',
        authorName: 'me',
        expressions: JSON.stringify(expressions.fruits),
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vegetables',
        slug: 'vegetables',
        authorId: '1',
        authorName: 'me',
        expressions: JSON.stringify(expressions.vegetables),
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Colors',
        slug: 'colors',
        description: 'Praesentium blanditiis perferendis? Illum tempore eum vero suscipit voluptate, in quia nulla tenetur, saepe nemo praesentium totam odio',
        authorId: '1',
        authorName: 'me',
        expressions: JSON.stringify(expressions.colors),
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Weather',
        slug: 'weather',
        description: 'Recusandae',
        authorId: '1',
        authorName: 'me',
        expressions: JSON.stringify(expressions.weather),
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Drinks',
        slug: 'drinks',
        authorId: '1',
        authorName: 'me',
        expressions: JSON.stringify(expressions.drinks),
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('set', null, {})
  }
}
