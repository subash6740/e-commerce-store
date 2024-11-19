module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Allow null for descriptions if not always required
    },
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true, // Ensures price is a decimal
      },
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true, // Ensures stock quantity is an integer
        min: 0, // Prevent negative stock
      },
    },
  }, {
    tableName: 'Products',
    timestamps: true,
    underscored: true,
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.Category, {
      through: 'ProductCategory',  // Name of the join table
      as: 'categories',            // Alias to access categories for a product
      foreignKey: 'product_id'
    });
  }

  return Product;
};
