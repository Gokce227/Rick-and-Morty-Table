import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
     characters: [],
     status: 'idle',
     error: null,
}

export const getCharacters = createAsyncThunk('getCharacters', async () => {
     var allCharacters = [];
     var nextPage = 'https://rickandmortyapi.com/api/character';

     while (nextPage) {
          const res = await axios.get(nextPage);
          allCharacters = allCharacters.concat(res.data.results);
          nextPage = res.data.info.next;
     }
     return allCharacters;
})



export const characterSlice = createSlice({
     name: 'characters',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               .addCase(getCharacters.pending, (state) => { // Bekleme 
                    state.status = 'loading'
               })
               .addCase(getCharacters.fulfilled, (state, action) => {// Gelen istegin dolduruyor state
                    state.status = 'succeeded'
                    state.characters = action.payload
               })
               .addCase(getCharacters.rejected, (state, action) => { // Eger ki gelemzse 
                    state.status = 'failed'
                    state.error = action.error.message
               })
     },
})

export default characterSlice.reducer
