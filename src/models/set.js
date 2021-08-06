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
    static associate (models) {
      // define association here
    }

    toJSON () {
      return { ...this.get(), public: undefined }
    }
  };
  Set.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false
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
