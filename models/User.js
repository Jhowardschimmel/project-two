module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 20]
      }
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 16]
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Art);
    User.hasMany(models.Comment);
    User.hasMany(models.Image);
  };
  return User;
};
