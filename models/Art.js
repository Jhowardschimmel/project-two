module.exports = function(sequelize, DataTypes) {
  var Art = sequelize.define("Art", {
    name: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
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
      defaultValue: "Uncategorized",
      allowNull: false
    },
    latitude: DataTypes.FLOAT(11,7),
    longitude: DataTypes.FLOAT(11,7),
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    }
  }, {
    timestamps: true
  });

  Art.associate = function(models) {
    Art.belongsTo(models.User, {
      foreignKey: {
        defaultValue: 1,
        allowNull: false
      }
    });
    Art.hasMany(models.Comment);
    Art.hasMany(models.Image);
  };
  return Art;
};
