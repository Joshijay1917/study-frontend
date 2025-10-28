import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload
            if(!user) {
                console.error("User not found!!")
                return;
            }
            state.user = user
            state.accessToken = accessToken
            state.refreshToken = refreshToken
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        }
    }
})

export const { setCredentials, logOut } = UserSlice.actions

export default UserSlice.reducer