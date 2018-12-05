module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    imageURL: {
      type: DataTypes.STRING,
      isURL: true
    }
  });

  Image.associate = function(models) {
    Image.belongsTo(models.Art, {
      foreignKey: {
        allowNull: false
      }
    });
    Image.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Image;
};
