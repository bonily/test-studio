
/* eslint-disable no-alert, no-console */
import {getParamsFromUrl} from './common';
export const getUrl = () => {
  const url = window.location.href;

  return getParamsFromUrl(url);
};
