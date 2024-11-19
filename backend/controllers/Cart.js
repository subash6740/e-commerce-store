const { Cart, CartItem, Product } = require("../models");

exports.getCart = async (req, res) => {
    try {
        const userId = req.userId
        let cart = await Cart.findOne({ where: { user_id: userId } });

        const cartItems = await CartItem.findAll({
            where: { cart_id: cart.id },
            include: {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'price', 'description', 'image']  // Adjust fields as necessary
            }
        });

        const items = cartItems.map(item => ({
            id: item.product.id,
            quantity: item.quantity,
            name: item.product.name,
            price: item.product.price,
            description: item.product.description,
            image: item.product.image
        }));

        res.status(200).json(items);

    } catch (error) {
        console.error("Error Fetching cart:", error.message);
        res.status(500).json({ message: "Error Fetching cart" });
    }
}

exports.emptyCart = async (req, res) => {
    try {
        const userId = req.userId;

        let cart = await Cart.findOne({ where: { user_id: userId } });

        await CartItem.destroy({
            where: {
                cart_id: cart.id,
            },
        })

        res.status(200).json({ message: 'Cart Emptied' });
    } catch (error) {
        console.error("Error Emptying cart: ", error.message);
        res.status(500).json({ message: "Error Emptying cart" });
    }
}
// Add item to cart
exports.addCartItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        // Ensure cart exists for user
        let cart = await Cart.findOne({ where: { user_id: userId } });

        // Check if product already exists in the cart
        let cartItem = await CartItem.findOne({
            where: { cart_id: cart.id, product_id: productId }
        });

        if (cartItem) {
            // Increment quantity if item already exists
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            // Add new item to cart if it doesn't exist
            cartItem = await CartItem.create({
                cart_id: cart.id,
                product_id: productId,
                quantity: 1
            });
        }

        res.status(200).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ message: "Error adding to cart" });
    }
}

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        // Find the cart for the user
        const cart = await Cart.findOne({ where: { user_id: userId } });

        // Find the cart item for the given cart and product
        const cartItem = await CartItem.findOne({
            where: { cart_id: cart.id, product_id: productId }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        if (cartItem.quantity > 1) {
            // Decrease quantity if more than one
            cartItem.quantity -= 1;
            await cartItem.save();
        } else {
            // Remove item if quantity is 1
            await cartItem.destroy();
        }

        res.status(200).json({ message: 'Product removed from cart', cartItem });
    } catch (error) {
        console.error("Error removing from cart:", error.message);
        res.status(500).json({ message: "Error removing from cart" });
    }
}

exports.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.query
        let orders = await Order.findAll({
            where: { user_id: userId },
            include: {
                model: OrderItem,
                as: "orderItems",
                include: {
                    model: Product,
                    as: 'product'
                }
            }
        })

        res.status(200).json(orders)
    } catch (error) {
        console.error('Error Fetching Orders:', error);
        res.status(500).json({ error: 'Error Fetching Orders' });
    }
}