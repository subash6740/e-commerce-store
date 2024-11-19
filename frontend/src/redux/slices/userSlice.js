import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
    return {
        userId: localStorage.getItem('userId') || null,
        username: localStorage.getItem('username') || null,
        isLoggedIn: localStorage.getItem('isLoggedIn') || false
    }
};

const initialState = getInitialState()

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        login(state, action) {
            localStorage.setItem('userId', action.payload.userId)
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('isLoggedIn', true)

            return {
                userId: action.payload.userId,
                username: action.payload.username,
                isLoggedIn: true
            }
        },

        logout(state, action) {
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
            localStorage.removeItem('isLoggedIn')

            return {
                userId: null,
                username: null,
                isLoggedIn: false
            }
        }
    }
});


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;