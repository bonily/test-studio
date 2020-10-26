/* eslint-disable no-alert, no-console */
import {extend} from './common';
import {SORT_TYPES} from './const';


const initialState = {
  persons: [],
  isLoaded: false,
  sortType: SORT_TYPES.ID
};

const ActionType = {
  LOAD_PERSONS: `LOAD_PERSONS`,
  CHANGE_STATUS: `CHANGE_STATUS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`
};

const ActionCreator = {
  loadPersons: (people) => {
    return {
      type: ActionType.LOAD_PERSONS,
      payload: people
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
};

const Operation = {
  loadPersons: () => (dispatch, getState, api) => {
    return api.get(`/data.json`)
    .then((response) => {
      console.log(response.data);
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
        isLoaded: true
      });
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
