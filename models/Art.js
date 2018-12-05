module.exports = function(sequelize, DataTypes) {
  var Art = sequelize.define("Art", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    artist: DataTypes.STRING,
    category: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    long: DataTypes.INTEGER
  });

  Art.associate = function(models) {
    Art.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Art.hasMany(models.Comment);
    Art.hasMany(models.Image);
  };
  return Art;
};
