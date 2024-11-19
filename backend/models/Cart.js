// models/Cart.js
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Reference to the Users table
        key: 'id',
      },
      onDelete: 'CASCADE', // If user is deleted, the cart will also be deleted
    },
  }, {
    tableName: 'Carts',
    timestamps: true,
    underscored: true,
  });

  Cart.associate = (models) => {
    Cart.hasMany(models.CartItem, {
      foreignKey: 'cart_id', // Foreign key in CartItem
      as: 'items', // Alias for accessing cart items
    });
  };

  return Cart;
};
