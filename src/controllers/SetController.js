/** node_modules */

/** models */
const { Set, User } = require('../models')

/** helpers */

module.exports = {
  async getPublicSets (req, res) {
    try {
      let sets
      if (req.userId) {
        // TODO ⛏
      } else {
        sets = await Set.findAll({
          limit: req.body.limit || 10,
          offset: req.body.skip || 0,
          where: {
            public: true
          },
          include: User
        })
      }

      // As default, phpmyadmin does not allow for an ARRAY type, so 'song.expressions' is a JSON-string
      sets.map(set => (
        set.expressions = JSON.parse(set.expressions)
      ))

      res.send(sets)
    } catch (err) {
      res.throwError('set-unknown-error')
    }
  },
  async addSet (req, res) {
    const authorId = '680916fc-8ca9-445d-9123-79231ac26642'
    const user = await User.findByPk(authorId)

    console.log(user)

    const set = await user.createSet(req.body)

    res.send(set)
  },
  async getSets (req, res) {
    try {
      let sets
      if (req.userId) {
        // TODO ⛏
      } else {
        sets = await Set.findAll({
          limit: req.body.limit || 10,
          offset: req.body.skip || 0,
          include: User,
          where: {
            public: true
          }
        })
      }

      // As default, phpmyadmin does not allow for an ARRAY type, so 'song.expressions' is a JSON-string
      sets.map(set => (
        set.expressions = JSON.parse(set.expressions)
      ))

      res.send(sets)
    } catch (err) {
      res.throwError('set-unknown-error')
    }
  }
}
