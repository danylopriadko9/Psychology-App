import { IData } from '@/app/types/data';
import {
  IInitialState,
  ISendContactForm,
} from '@/app/types/reduxTypes/contact';
import { axiosInstance } from '@/app/utilities/axiosInstance';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const sendContactForm = createAsyncThunk(
  'contact/send-contact-form',
  async ({ email, userName, message }: ISendContactForm, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/api/contact/', {
        name: userName,
        message,
        email,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace('Error: ', ''));
      }
      throw error;
    }
  }
);

const initialState = {
  isLoading: false,
  errorMessage: null,
} satisfies IInitialState as IInitialState;

const contactFormSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //###############################################################
    //                    CONTACT FORM CASES                       //
    //###############################################################
    builder.addCase(sendContactForm.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(sendContactForm.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(sendContactForm.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage =
        (action.payload as string) || 'Unknown error occupied';
    });
  },
});

export default contactFormSlice.reducer;
