/* eslint-disable no-alert, no-console */
// import {SORT_TYPES} from './const';

import {SORT_TYPES} from "./const";

export const extend = (a, b) => {
  console.log(`hhhhhh`);
  console.log(a, b);
  return Object.assign({}, a, b);
};

export const getPersonsBySortType = (persons, sortType) => {
  console.log(`пришло`);
  if (sortType === SORT_TYPES.NAME) {
    return persons.sort((a, b) => a.age - b.age).slice();
  }
  return persons.slice();
};
