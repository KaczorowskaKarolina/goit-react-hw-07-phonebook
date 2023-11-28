import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await fetch('https://655bc2e8ab37729791a98fce.mockapi.io');
  return response.json();
});

export const addContact = createAsyncThunk('contacts/addContact', async (contactData) => {
  const response = await fetch('https://655bc2e8ab37729791a98fce.mockapi.io', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });
  return response.json();
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  await fetch(`https://655bc2e8ab37729791a98fce.mockapi.io/${contactId}`, {
    method: 'DELETE',
  });
  return contactId;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;

const rootReducer = {
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;