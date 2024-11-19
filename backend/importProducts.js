const { Product, Category, ProductCategory } = require('./models');

async function fetchImageAsBinary(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
}

// Main function to import products and categories
async function importProducts() {
    try {
        // Await the fetch and .json() call to get the actual product data array
        let productsData = await (await fetch('https://fakestoreapi.com/products')).json();

        console.log(productsData); // Confirm data is correctly fetched

        // Extract unique categories from product data
        const categories = [...new Set(productsData.map(product => product.category))];

        // Insert categories into the Category table if they don’t already exist
        console.log("Importing Categories");
        const categoryRecords = await Promise.all(
            categories.map(async (categoryName) => {
                const [category] = await Category.findOrCreate({
                    where: { name: categoryName }
                });
                return category;
            })
        );

        // Create a map to easily find category IDs by name
        const categoryMap = {};
        categoryRecords.forEach((category) => {
            categoryMap[category.name] = category.id;
        });

        // Prepare and insert products
        console.log("Importing Products");
        const formattedProducts = await Promise.all(
            productsData.map(async (product) => {
                const imageBinary = await fetchImageAsBinary(product.image);
                return {
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    description: product.description,
                    image: imageBinary,
                };
            })
        );

        await Product.bulkCreate(formattedProducts, { ignoreDuplicates: true });

        // Insert into ProductCategory table to associate products with categories
        for (const product of productsData) {
            const productRecord = await Product.findOne({ where: { id: product.id } });
            const categoryId = categoryMap[product.category];

            if (productRecord && categoryId) {
                await ProductCategory.findOrCreate({
                    where: {
                        product_id: productRecord.id,
                        category_id: categoryId,
                    },
                });
            }
        }

        console.log('Sample products and categories inserted successfully.');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

importProducts();
