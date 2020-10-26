/* eslint-disable no-alert, no-console */
import {createSelector} from 'reselect';
import {getPersonsBySortType} from './common';


export const getPersons = (state) => {
  console.log(`тут`);
  return state.persons;
};

export const getSortType = (state) => {
  return state.sortType;
};


export const getSortedPerson = createSelector(
    getPersons,
    getSortType,
    (persons, sortType) => {
      return getPersonsBySortType(persons, sortType);
    }
);
