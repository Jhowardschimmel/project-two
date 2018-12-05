module.exports = function(sequelize, DataTypes) {
  var Art = sequelize.define("Art", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    artist: DataTypes.STRING,
    category: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    long: DataTypes.INTEGER
  });
  return Art;
};
