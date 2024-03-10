import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '@env';



export const LoginRider = createAsyncThunk(
  'post/postRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}riders/login`, data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error or other non-HTTP error occurred
        throw error;
      }
      
      // Handle HTTP errors (e.g., 4xx, 5xx)
      return rejectWithValue(error.response.data);
    }
  }
);
export const RiderInformation = createAsyncThunk(
  'post/RiderInformation',
  async ({ rejectWithValue, token }) => {
    try {
      const response = await axios.post(`${BASE_URL}riders/information`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error or other non-HTTP error occurred
        throw error;
      }
      
      // Handle HTTP errors (e.g., 4xx, 5xx)
      return rejectWithValue(error.response.data);
    }
  }
);


export const APISlice = createSlice({
  name: 'API',
  initialState: { data: [], error: null, status: 'idle', verifiedStatus: null }, // Fixed typo in "verfiedStatus" to "verifiedStatus"
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginRider.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginRider.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(LoginRider.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      builder
      .addCase(RiderInformation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(RiderInformation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(RiderInformation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default APISlice.reducer;
