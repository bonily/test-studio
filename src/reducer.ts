import {extend, updateFavoriteStatus} from './common';
import {LANGUAGE} from './const';
import {PersonType} from './types';
import {getParamsFromUrl} from './common';
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

export interface AppStateType {
  persons: PersonType[] | [],
  inputValue: string,
  sortType: string,
  isSortAscending: boolean,
  language: string,
  isTableView: boolean,
  videoPlayingId: number,
  isLoaded: boolean
}

const initialState = {
  persons: [],
  inputValue: ``,
  sortType: ``,
  isSortAscending: false,
  language: LANGUAGE.RU,
  isTableView: false,
  url: ``,
  videoPlayingId: -1,
  isLoaded: false


};

const ActionType = {
  LOAD_PERSONS: `LOAD_PERSONS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_ASCENDING_STATUS: `CHANGE_ASCENDING_STATUS`,
  CHANGE_LANGUAGE: `CHAGELANGUAGE`,
  CHANGE_VIEW: `CHANGE_VIEW`,
  CHANGE_FAVORITE_STATUS: `CHANGE_FAVORITE_STATUS`,
  FILTER_PERSONS: `FILTER_PERSON`,
  GET_VALUE_FROM_URL: `GET_VALUE_FROM_URL`,
  UPDATE_URL: `UPDATE_URL`,
  CHANGE_VIDEO_ID: `CHANGE_VIDEO_ID`
};


const ActionCreator = {
  loadPersons: (persons: PersonType[]):{type: string, payload: PersonType[]} => {
    return {
      type: ActionType.LOAD_PERSONS,
      payload: persons
    };
  },
  changeSortType: (sortType: string): {type: string, payload: string}=> {
    return {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: sortType
    };
  },
  changeAscendingStatus: (): {type: string} => {
    return {
      type: ActionType.CHANGE_ASCENDING_STATUS
    };
  },
  changeLanguage: (language: string): {type: string, payload: string} => {
    return {
      type: ActionType.CHANGE_LANGUAGE,
      payload: language
    };
  },
  changeView: (): {type: string} => {
    return {
      type: ActionType.CHANGE_VIEW
    };
  },
  updateURL: (): {type: string} => {
    return {
      type: ActionType.UPDATE_URL
    };
  },
  changeFavoriteStatus: (id : number): {type: string, payload: number } => {
    return {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: id
    };
  },
  filterPersons: (filter: string): {type: string, payload: string} => {
    return {
      type: ActionType.FILTER_PERSONS,
      payload: filter
    };
  },
  getValueFromUrl: (url: {sortType: string, isSortAscending: boolean, isTableView: boolean}): {type: string, payload: {sortType: string, isSortAscending: boolean, isTableView: boolean}} => {
    return {
      type: ActionType.GET_VALUE_FROM_URL,
      payload: url
    };
  },
  changeVideoId: (id : number): {type: string, payload: number} => {
    return {
      type: ActionType.CHANGE_VIDEO_ID,
      payload: id
    };
  },
};

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, any, Action<string>>

const Operation = {
  loadPersons: () => (dispatch: (arg0: { type: string; payload?: PersonType[]; }) => void, _getState: () => void, api: { get: (arg0: string) => Promise<PersonType[]>; }) => {
    return api.get(`/data.json`)
    .then((response : any) => {
      dispatch(ActionCreator.loadPersons((response.data)));
    });
  },
  changeAscendingStatus: () : AppThunk=> (dispatch: (arg0: { type: string; }) => void) => {
    dispatch(ActionCreator.changeAscendingStatus());
    dispatch(ActionCreator.updateURL());
  },
  changeView: () : AppThunk => (dispatch: (arg0: { type: string; }) => void) => {
    dispatch(ActionCreator.changeView());
    dispatch(ActionCreator.updateURL());
  },
  changeSortType: (sortType: string) : AppThunk => (dispatch: (arg0: { type: string; payload?: string; }) => void) => {
    dispatch(ActionCreator.changeSortType(sortType));
    dispatch(ActionCreator.updateURL());
  },
  getValueFromUrl: (url: string) => (dispatch: (arg0: { type: string; payload: { sortType: string; isSortAscending: boolean; isTableView: boolean; }; }) => void) => {
    const params = getParamsFromUrl(url);
    dispatch(ActionCreator.getValueFromUrl(params));
  }
};


const reducer = (state: AppStateType = initialState, action: { type: string; payload: any}): AppStateType => {
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
        inputValue: action.payload
      });
    case ActionType.CHANGE_FAVORITE_STATUS:
      state.persons = updateFavoriteStatus(state.persons, action.payload);
      return state;
    case ActionType.GET_VALUE_FROM_URL:
      return extend(state, action.payload);
    case ActionType.CHANGE_VIDEO_ID:
      return extend(state, {
        videoPlayingId: action.payload
      });
    case ActionType.UPDATE_URL:
      const title = ``;
      const url = `sort=${state.sortType}&asceding=${state.isSortAscending}&tableview=${(state.isTableView) ? `table` : `preview`}`;

      window.history.pushState({sortType: action.payload}, title, url);
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
