module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[0, 1, 2, 3]], // e.g., 0: Pending, 1: Processing, 2: Shipped, 3: Completed
        },
      },
      // Address fields
      address_line1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_line2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Card details
      card_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isCreditCard: true, // Validate that the input is a credit card number
        },
      },
      card_expiration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_cvv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Orders',
      timestamps: true,
      underscored: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'orderItems',
    });
  };

  return Order;
};
