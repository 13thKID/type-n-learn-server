const expressions = require('./data/expressions')

const { User } = require('../models')

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({
      attributes: ['id']
    })

    const userIds = users.map(user => user.id)

    function getRandomAuthor () {
      return userIds[getRandomInt(0, userIds.length)]
    }

    await queryInterface.bulkInsert('set', [
      {
        name: 'Fruits',
        slug: 'fruits',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
        authorId: getRandomAuthor(),
        authorName: 'me',
        expressions: JSON.stringify(expressions.fruits),
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vegetables',
        slug: 'vegetables',
        authorId: getRandomAuthor(),
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
        authorId: getRandomAuthor(),
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
        authorId: getRandomAuthor(),
        authorName: 'me',
        expressions: JSON.stringify(expressions.weather),
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Drinks',
        slug: 'drinks',
        authorId: getRandomAuthor(),
        authorName: 'me',
        expressions: JSON.stringify(expressions.drinks),
        public: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('set', null, {})
  }
}
