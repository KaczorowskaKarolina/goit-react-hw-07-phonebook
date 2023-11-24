import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, deleteContact, setFilter } from '../Atoms/Store';
import Form from '../Organisms/Form';
import Filter from '../Molecules/Filter';
import List from '../Organisms/List';
import { nanoid } from 'nanoid';

import css from './app.css';

const AppContainer = () => {
  const contacts = useSelector(state => state.contacts.data);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const addContactOnSubmit = ({ name, number }) => {
    const contactOnList = contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (contactOnList) {
      alert('This contact is already on Your list');
    } else {
      dispatch(addContact({ id: nanoid(), name, number }));
    }
  };

  const deleteContactHandler = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const onFilterChange = (event) => {
    event.preventDefault();
    dispatch(setFilter(event.target.value.toLowerCase()));
  };

  const showFilteredContact = () => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filter);
    });
  };

 return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Form onSubmit={addContactOnSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onFilterChange} />
      <List contacts={showFilteredContact()} onDelete={deleteContactHandler} />
    </div>
  );
};

export default AppContainer;