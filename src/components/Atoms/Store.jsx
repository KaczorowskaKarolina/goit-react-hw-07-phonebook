import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

// Actions
export const addContact = createAction('contacts/addContact');
export const deleteContact = createAction('contacts/deleteContact');
export const setFilter = createAction('filter/setFilter');

// Reducers
const contactsReducer = createReducer([], {
  [addContact]: (state, action) => [...state, action.payload],
  [deleteContact]: (state, action) => state.filter(contact => contact.id !== action.payload),
});

const filterReducer = createReducer('', {
  [setFilter]: (_, action) => action.payload,
});

const rootReducer = {
  contacts: contactsReducer,
  filter: filterReducer,
};

// Store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
