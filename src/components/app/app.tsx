/* eslint-disable no-alert, no-console */
import React from 'react';
import {connect} from 'react-redux';
import PersonList from '../person-list/person-list';
import {PersonType} from '../../types';
import {getSortedPerson, getSortType, getAscendingStatus, getLanguage, getViewStatus} from '../../selector';
import {ActionCreator} from '../../reducer';
import Header from '../Header/Header';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
  }

  .visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    border: 0; }
`;


interface MapStatePropsType {
  persons: PersonType[],
  sortType: string,
  language: string,
  isAscending: boolean,
  isTableView: boolean,
}

interface MapDispatchToPropsType {
  onRangingTitleClick: () => void,
  onSortTitleClick: (arg0: string) => void,
  onLanguageTitleClick: (arg0: string) => void,
  onViewTitleClick: () => void,
  onInputChange: (arg0: string) => void,
}

const App: React.FunctionComponent<MapStatePropsType & MapDispatchToPropsType> = (props: MapStatePropsType & MapDispatchToPropsType) => {
  const {language, persons, sortType, isAscending, isTableView, onLanguageTitleClick, onRangingTitleClick, onSortTitleClick, onViewTitleClick, onInputChange} = props;

  return (
    <div className="App">
      <GlobalStyle />
      <Header
        isAscending = {isAscending}
        isTableView = {isTableView}
        language = {language}
        sortType = {sortType}
        onLanguageTitleClick = {onLanguageTitleClick}
        onRangingTitleClick = {onRangingTitleClick}
        onSortTitleClick = {onSortTitleClick}
        onViewTitleClick = {onViewTitleClick}
        onInputChange = {onInputChange}
      />
      <section>
        <PersonList
          persons = {persons}
          isTableView = {isTableView}
        ></PersonList>
      </section>
    </div>
  );
};

const mapStateToProps = (state: any): MapStatePropsType => ({
  persons: getSortedPerson(state),
  sortType: getSortType(state),
  language: getLanguage(state),
  isAscending: getAscendingStatus(state),
  isTableView: getViewStatus(state)
});

const mapDispatchToProps = (dispath: any): MapDispatchToPropsType => ({
  onSortTitleClick(sortType) {
    dispath(ActionCreator.changeSortType(sortType));
  },
  onRangingTitleClick() {
    dispath(ActionCreator.changeAscendingStatus());
  },
  onLanguageTitleClick(language) {
    console.log(language);
    dispath(ActionCreator.changeLanguage(language));
  },
  onViewTitleClick() {
    dispath(ActionCreator.changeView());
  },
  onInputChange(str) {
    dispath(ActionCreator.filterPersons(str));
  }
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
