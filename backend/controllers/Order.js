const { Order, OrderItem, Product } = require('../models')

exports.createOrder = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        address,
        address2,
        country,
        state,
        pinCode,
        cardName,
        cardNumber,
        cardExpiration,
        cardCvv,
        items,
    } = req.body;
    const userId = req.userId

    if (!firstName || !lastName || !email || !address || !country || !state || !pinCode || !cardName || !cardNumber || !cardExpiration || !cardCvv || !items.length) {
        return res.status(400).json({ error: 'Missing required order information' });
    }

    try {
        const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

        const newOrder = await Order.create({
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            email,
            status: 0,
            address_line1: address,
            address_line2: address2 || null,
            country,
            state,
            zip_code: pinCode,
            total_price: totalPrice,
            status: 0,
            card_name: cardName,
            card_number: cardNumber,
            card_expiration: cardExpiration,
            card_cvv: cardCvv,
        });

        await Promise.all(
            items.map(async (item) => {
                await OrderItem.create({
                    order_id: newOrder.id,
                    product_id: item.productId,
                    quantity: item.quantity,
                    price: item.quantity * item.price,
                });
            })
        );

        res.status(201).json({ message: 'Order created successfully', orderId: newOrder.id });
    } catch (error) {
        console.error('Failed to create order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
}

exports.getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.userId
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