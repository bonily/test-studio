/* eslint-disable no-alert, no-console */
import {extend, getFilteredPersons} from './common';
import {SORT_TYPES, LANGUAGE} from './const';


const initialState = {
  persons: [],
  filteredPersons: [],
  isLoaded: false,
  sortType: SORT_TYPES.ID,
  isSortAscending: true,
  language: LANGUAGE.RU,
  isTableView: true

};

const ActionType = {
  LOAD_PERSONS: `LOAD_PERSONS`,
  CHANGE_STATUS: `CHANGE_STATUS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_ASCENDING_STATUS: `CHANGE_ASCENDING_STATUS`,
  CHANGE_LANGUAGE: `CHAGELANGUAGE`,
  CHANGE_VIEW: `CHANGE_VIEW`,
  FILTER_PERSONS: `FILTER_PERSON`
};

const ActionCreator = {
  loadPersons: (persons) => {
    return {
      type: ActionType.LOAD_PERSONS,
      payload: persons
    };
  },
  changeStatus: () => {
    return {
      type: ActionType.CHANGE_STATUS,
    };
  },
  changeSortType: (sortType) => {
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: sortType
    };
  },
  changeAscendingStatus: () => {
    return {
      type: ActionType.CHANGE_ASCENDING_STATUS
    };
  },
  changeLanguage: (language) => {
    return {
      type: ActionType.CHANGE_LANGUAGE,
      payload: language
    };
  },
  changeView: () => {
    return {
      type: ActionType.CHANGE_VIEW
    };
  },
  filterPersons: (str) => {
    return {
      type: ActionType.FILTER_PERSONS,
      payload: str
    };
  }
};

const Operation = {
  loadPersons: () => (dispatch, getState, api) => {
    return api.get(`/data.json`)
    .then((response) => {
      dispatch(ActionCreator.loadPersons((response.data)));
      dispatch(ActionCreator.changeStatus());
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_PERSONS:
      return extend(state, {
        persons: action.payload,
        filteredPersons: action.payload,
        isLoaded: true
      });
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload
      });
    case ActionType.CHANGE_ASCENDING_STATUS:
      return extend(state, {
        isSortAscending: !state.isSortAscending
      });
    case ActionType.CHANGE_LANGUAGE:
      return extend(state, {
        language: action.payload
      });
    case ActionType.CHANGE_VIEW:
      return extend(state, {
        isTableView: !state.isTableView
      });
    case ActionType.FILTER_PERSONS:
      return extend(state, {
        filteredPersons: getFilteredPersons(state.persons, action.payload)
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
