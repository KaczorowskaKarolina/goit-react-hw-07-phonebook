import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../Atoms/Store';
import PropTypes from 'prop-types';

import './list.css';

const List = ({ contacts }) => {
  const dispatch = useDispatch();

  const deleteContactHandler = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul>
      {contacts.map((contact) => (
        <li className="contact" key={contact.id}>
          {contact.name}: {contact.number}
          <button className="delButton" onClick={() => deleteContactHandler(contact.id)}>
            Delete contact
          </button>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
};

export default List;