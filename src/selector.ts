import {createSelector} from 'reselect';
import {getPersonsBySortType, getFilteredPersons} from './common';
import {AppStateType} from './reducer';


export const getPersons = (state : AppStateType) => {
  return getFilteredPersons(state.persons, state.inputValue);
};

export const getSortType = (state : AppStateType) => {
  return state.sortType;
};

export const getAscendingStatus = (state : AppStateType) => {
  return state.isSortAscending;
};

export const getViewStatus = (state : AppStateType) => {
  return state.isTableView;
};

export const getLanguage = (state : AppStateType) => {
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
