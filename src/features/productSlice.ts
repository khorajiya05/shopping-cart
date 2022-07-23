import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

type StoreItem = {
    id: number;
    title: string;
    price: number;
    off: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
  };
  
type InitialState = {
  loading: boolean
  products: StoreItem[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  products: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios
    .get('./data/items.json');
  return response.data;
})



const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<StoreItem[]>) => {
        state.loading = false
        state.products = action.payload
        state.error = ''
      }
    )
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false
      state.products = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default productSlice.reducer