const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Users',
    timestamps: true,
    underscored: true,
  });

  // Define associations
  User.associate = function(models) {
    User.hasMany(models.Order, {
      foreignKey: 'user_id',
      as: 'orders',
    });
    User.hasOne(models.Cart, {
      foreignKey: 'user_id',
      as: 'cart',
    });
  };

  User.prototype.getJwtToken = function () {
    console.log(this); // This will now correctly log the User instance
    console.log("--------------user-------------------");
    return jwt.sign({ id: this.id }, process.env.SECRET_KEY, { expiresIn: "2d" });
  };

  return User;
};
