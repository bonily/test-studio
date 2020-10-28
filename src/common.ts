/* eslint-disable no-alert, no-console */
import {PersonType} from './types';
import {SORT_TYPES} from "./const";

export const extend = (a : any, b: any): any => {
  return Object.assign({}, a, b);
};

export const getPersonsBySortType = (persons : PersonType[], sortType : string, ascending : boolean): PersonType[] => {
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

export const getFilteredPersons = (persons : PersonType[], str = ``):PersonType[] => {
  return persons.filter((person) => person.name.toLowerCase().indexOf(str) > -1);
};

export const updateFavoriteStatus = (persons : PersonType[], id : number):PersonType[] => {
  const index = persons.findIndex((person) => person.id === id);
  persons[index].favourite = !persons[index].favourite;
  console.log(persons[index]);
  return persons;
};

export const getParamsFromUrl = (url: string):{sortType: string, isSortAscending: boolean, isTableView: boolean} => {
  const searchParams = new URLSearchParams(url);

  return {
    sortType: searchParams.get(`sort`) || SORT_TYPES.ID,
    isSortAscending: (searchParams.get(`asceding`)) === `true` ? true : false || true,
    isTableView: searchParams.get(`tableview`) === `true` ? true : false || true,
  };
};
