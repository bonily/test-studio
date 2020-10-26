/* eslint-disable no-alert, no-console */
import React from 'react';
import {connect} from 'react-redux';
import PersonList from '../person-list/person-list';
import {PersonType} from '../../types';
import {getSortedPerson, getSortType} from '../../selector';
import {ActionCreator} from '../../reducer';
import Header from '../Header/Header';


interface MapStatePropsType {
  persons: PersonType[],
  sortType: string
}

interface MapDispatchToPropsType {
  onSortTitleClick: (arg0: string) => void;
}

const App: React.FunctionComponent<MapStatePropsType & MapDispatchToPropsType> = (props: MapStatePropsType & MapDispatchToPropsType) => {
  const {persons, onSortTitleClick} = props;

  return (
    <div className="App">
      <Header
        onSortTitleClick = {onSortTitleClick}
      />
      <PersonList
        persons = {persons}
      ></PersonList>
    </div>
  );
};

const mapStateToProps = (state: any): MapStatePropsType => ({
  persons: getSortedPerson(state),
  sortType: getSortType(state)
});

const mapDispatchToProps = (dispath: any): MapDispatchToPropsType => ({
  onSortTitleClick(sortType) {
    dispath(ActionCreator.changeSortType(sortType));
  }
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
