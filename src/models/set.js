const slugify = require('slugify')

const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ User }) {
      this.belongsTo(User, { foreignKey: 'authorId' })
    }

    toJSON () {
      return { ...this.get(), public: undefined }
    }
  };
  Set.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set (value) {
        this.setDataValue('name', value)
        this.setDataValue('slug', slugify(value, {
          lower: true
        }))
      }
    },
    slug: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    authorId: {
      type: DataTypes.UUID
      // allowNull: false
    },
    authorName: {
      type: DataTypes.STRING
      // allowNull: true
    },
    expressions: DataTypes.TEXT,
    public: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'set',
    modelName: 'Set'
  })
  return Set
}
