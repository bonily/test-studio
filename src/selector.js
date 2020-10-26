/* eslint-disable no-alert, no-console */
import {createSelector} from 'reselect';
import {getPersonsBySortType} from './common';


export const getPersons = (state) => {
  return state.filteredPersons;
};

export const getSortType = (state) => {
  console.log(state.sortType);
  return state.sortType;
};

export const getAscendingStatus = (state) => {
  return state.isSortAscending;
};

export const getViewStatus = (state) => {
  return state.isTableView;
};

export const getLanguage = (state) => {
  return state.language;
};

export const getSortedPerson = createSelector(
    getPersons,
    getSortType,
    getAscendingStatus,
    (persons, sortType, ascendingStatus) => {
      return getPersonsBySortType(persons, sortType, ascendingStatus);
    }
);
