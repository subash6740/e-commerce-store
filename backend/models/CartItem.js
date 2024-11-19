// models/CartItem.js
module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Carts', // Reference to the Carts table
          key: 'id',
        },
        onDelete: 'CASCADE', // If the cart is deleted, the cart items will also be deleted
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // Reference to the Products table
          key: 'id',
        },
        onDelete: 'CASCADE', // If the product is deleted, this item will also be deleted
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default quantity is 1
      },
    }, {
      tableName: 'CartItems',
      timestamps: true,
      underscored: true,
    });
  
    CartItem.associate = (models) => {
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cart_id', // Foreign key in Cart
        as: 'cart', // Alias for accessing the cart
      });

      CartItem.belongsTo(models.Product, {
        foreignKey: 'product_id', // Foreign key in Product
        as: 'product', // Alias for accessing the product
      });
    };
  
    return CartItem;
  };
  