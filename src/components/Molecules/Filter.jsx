import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../Atoms/Store';

import './filter.css';

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onFilterChange = (event) => {
    event.preventDefault();
    dispatch(setFilter(event.target.value.toLowerCase()));
  };

  return (
    <div className="filterContainer">
      <p>Find contacts by name</p>
      <input type="text" value={filter} onChange={onFilterChange} placeholder="search" />
    </div>
  );
};

export default Filter;