const { Model, where } = require('sequelize')
const { Order, OrderItem, Product } = require('./models')

Order.findAll({
    where: {user_id: 1},
    include: {
        model: OrderItem,
        as: "orderItems",
        include: {
            model: Product,
            as: 'product'
        }
    }
})
.then(orders => {
    console.log(orders)
    console.log("--------------------------------------")
    console.log(orders[0].orderItems[0])
    console.log("--------------------------------------")
    console.log(orders[0].orderItems[0].product)
})