/* eslint-disable no-alert, no-console */
// import {SORT_TYPES} from './const';

import {SORT_TYPES} from "./const";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getPersonsBySortType = (persons, sortType, ascending) => {
  console.log(sortType);
  switch (sortType) {
    case SORT_TYPES.NAME:
      return persons.sort((a, b) => ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    case SORT_TYPES.AGE:
      return persons.sort((a, b) => ascending ? a.age - b.age : b.age - a.age).slice();
    case SORT_TYPES.ID:
      return persons.sort((a, b) => ascending ? a.id - b.id : b.id - a.id).slice();
  }
  return persons.slice();
};

export const getFilteredPersons = (persons, str = ``) => {
  return persons.filter((person) => person.name.toLowerCase().indexOf(str) > -1);
};


