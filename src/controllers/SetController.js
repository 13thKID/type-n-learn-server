const { Set } = require('../models')

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
          }
        })
      }

      // As default, phpmyadmin does not allow for an ARRAY type, so 'song.expressions' is a JSON-string
      sets.map(set => (
        set.expressions = JSON.parse(set.expressions)
      ))

      res.throwError('set-unknown-error')

      // res.send(sets)
    } catch (err) {
      res.throwError('set-unknown-error')
    }
  }
  // async add (req, res) {
  //   console.log('Add a new song', req.body)
  //   try {
  //     const song = await Song.create(req.body)
  //     res.send(song)
  //   } catch (err) {
  //     res.status(500).send({
  //       error: 'Song information is invalid'
  //     })
  //   }
  // }
}
