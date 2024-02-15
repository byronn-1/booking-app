import { createSlice } from '@reduxjs/toolkit';


export const clubSlice = createSlice({
    name: 'club',
    initialState: {
        clubDetails: null,
        isLoading: false,
        hasError: false,
    },
    reducers: {
        setClubDetails: (state, action) => {
            state.clubDetails = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        setClubLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setClubError: (state, action) => {
            state.hasError = action.payload;
        },
    },
});
export const { setClubDetails, setClubLoading, setClubError } = clubSlice.actions;
export default clubSlice.reducer;