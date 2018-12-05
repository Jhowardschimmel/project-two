module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    imageURL: DataTypes.STRING
  });
  return Image;
};
