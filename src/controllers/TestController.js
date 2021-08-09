/** node_modules */

/** models */
const { Set, User } = require('../models') // eslint-disable-line

/** helpers */

module.exports = {
  async testGet (req, res) {
    const users = await User.findAll({
      attributes: ['id']
    })

    const userIds = users.map(user => user.id)

    res.send(userIds)
  }
}
