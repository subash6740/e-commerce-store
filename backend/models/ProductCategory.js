module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'ProductCategories',
    timestamps: true,
    underscored: true,
  });

  return ProductCategory;
};
