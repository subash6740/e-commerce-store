import API from "../utils/axios";

export const userLogin = async (data) => {
    const response = await API.post('user_login', data)
    console.log(response)
    return { userId: response.data.userId, username: response.data.username }
}

export const userRegister = async (data) => {
    await API.post('user_register', data)
}