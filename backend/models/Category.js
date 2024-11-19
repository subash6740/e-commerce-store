module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'Categories',
    timestamps: true,
    underscored: true,
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Product, {
      through: models.ProductCategory,
      foreignKey: 'category_id',
      otherKey: 'product_id',
      as: 'products',
    });
  };

  return Category;
};
