module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    text: DataTypes.STRING
  });
  return Comment;
};
