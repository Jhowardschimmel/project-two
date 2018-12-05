module.exports = function(sequelize, DataTypes) {
  var Art = sequelize.define("Art", {
    name: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5
      }
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: 50
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER
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
