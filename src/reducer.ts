/* eslint-disable no-alert, no-console */
import {extend, getFilteredPersons, updateFavoriteStatus} from './common';
import {LANGUAGE} from './const';
import {PersonType} from './types';

export interface AppStateType {
  persons: PersonType[] | [],
  filteredPersons: PersonType[],
  sortType: string,
  isSortAscending: boolean,
  language: string,
  isTableView: boolean
}

const initialState = {
  persons: [],
  filteredPersons: [],
  sortType: ``,
  isSortAscending: false,
  language: LANGUAGE.RU,
  isTableView: false,
  url: ``

};

const ActionType = {
  LOAD_PERSONS: `LOAD_PERSONS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_ASCENDING_STATUS: `CHANGE_ASCENDING_STATUS`,
  CHANGE_LANGUAGE: `CHAGELANGUAGE`,
  CHANGE_VIEW: `CHANGE_VIEW`,
  CHANGE_FAVORITE_STATUS: `CHANGE_FAVORITE_STATUS`,
  FILTER_PERSONS: `FILTER_PERSON`,
  GET_URL: `GET_URL`,
  UPDATE_URL: `UPDATE_URL`
};


const ActionCreator = {
  loadPersons: (persons: PersonType[]) => {
    return {
      type: ActionType.LOAD_PERSONS,
      payload: persons
    };
  },
  changeSortType: (sortType: string) => {
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
  changeLanguage: (language: string) => {
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
  updateURL: () => {
    return {
      type: ActionType.UPDATE_URL
    };
  },
  changeFavoriteStatus: (id : number) => {
    return {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: id
    };
  },
  filterPersons: (str: string) => {
    return {
      type: ActionType.FILTER_PERSONS,
      payload: str
    };
  },
  getUrl: (url: any) => {
    return {
      type: ActionType.GET_URL,
      payload: url
    };
  }
};

const Operation = {
  loadPersons: () => (dispatch: (arg0: { type: string; payload?: PersonType[]; }) => void, getState: any, api: { get: (arg0: string) => Promise<any>; }) => {
    console.log(api);
    return api.get(`/data.json`)
    .then((response : any) => {
      dispatch(ActionCreator.loadPersons((response.data)));
    });
  },
  changeAscendingStatus: () => (dispatch: any) => {
    dispatch(ActionCreator.changeAscendingStatus());
    dispatch(ActionCreator.updateURL());
  },
  changeView: () => (dispatch: any) => {
    dispatch(ActionCreator.changeView());
    dispatch(ActionCreator.updateURL());
  },
  changeSortType: (sortType: string) => (dispatch: any) => {
    dispatch(ActionCreator.changeSortType(sortType));
    dispatch(ActionCreator.updateURL());
  },
  getUrl: (params : any) => (dispatch: any) => {
    console.log(params);
    dispatch(ActionCreator.getUrl(params));
    dispatch(ActionCreator.changeView());
  }
};

const reducer = (state: AppStateType = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case ActionType.LOAD_PERSONS:
      return extend(state, {
        persons: action.payload,
        filteredPersons: action.payload,
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
    case ActionType.CHANGE_FAVORITE_STATUS:
      return extend(state, {
        persons: updateFavoriteStatus(state.persons, action.payload),
        // filteredPersons: updateFavoriteStatus(state.filteredPersons, action.payload),
      });
    case ActionType.GET_URL:
      console.log(action.payload);
      return extend(state, action.payload);
    case ActionType.UPDATE_URL:
      const title = ``;
      const url = `searchParams&sort=${state.sortType}&asceding=${state.isSortAscending}&tableview=${state.isTableView}`;

      window.history.pushState({sortType: action.payload}, title, url);
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
