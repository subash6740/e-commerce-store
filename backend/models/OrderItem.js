module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    tableName: 'OrderItems',
    timestamps: true,
    underscored: true,
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
    OrderItem.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
  };

  return OrderItem;
};
