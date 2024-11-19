import API from "../utils/axios";

export const createOrder = async (data) => {
    await API.post('create_order', data)
}

export const orderHistory = async() => {
    const response = await API.get('order_history')
    return response.data
}