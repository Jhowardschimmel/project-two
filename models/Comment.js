module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5
      }
    }
  });
  Comment.associate = function(models) {
    Comment.belongsTo(models.Art, {
      foreignKey: {
        allowNull: false
      }
    });
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};
