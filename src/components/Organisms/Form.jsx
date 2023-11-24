import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../Atoms/Store';
import { nanoid } from 'nanoid';

import './form.css';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', number: '' });
  const nameId = nanoid();
  const numberId = nanoid();
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, number } = formData;

    if (!name || !number) {
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));

    reset();
  };

  const reset = () => {
    setFormData({ name: '', number: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { name, number } = formData;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor={nameId}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
          placeholder="Name"
          id={nameId}
          autoComplete="off"
        />
      </label>
      <label className="label" htmlFor={numberId}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Number"
          id={numberId}
          autoComplete="off"
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default Form;