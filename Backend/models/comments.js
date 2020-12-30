'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comments.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
      models.Comments.belongsTo(models.Message, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Comments.init({
    content: DataTypes.STRING,
    MessageId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};