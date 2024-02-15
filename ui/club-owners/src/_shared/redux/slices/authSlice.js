import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isOwner: false,
        clubId: null,
        ownerId: null,
        token: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.isOwner = action.payload.isOwner;
            state.clubId = action.payload.clubId;
            state.ownerId = action.payload.ownerId;
            state.token = action.payload.token;
        }
        // Add other reducers as needed
    },
});
export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;