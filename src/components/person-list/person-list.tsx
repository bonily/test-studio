/* eslint-disable no-alert, no-console */
import React, {useEffect, useState} from "react";
import {PersonType} from '../../types';
import styled from 'styled-components';
import Person from '../person/person';


const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 85%;

  margin-left: auto;
  margin-right: auto;

  padding-left: 0;
  padding-right: 0;

  list-style: none;
`;


interface Props {
  persons: PersonType[],
  isTableView: boolean,
  onFavoriteInputChange: (arg0: number) => void
}

const PersonList: React.FunctionComponent<Props> = (props: Props) => {
  const {persons, isTableView, onFavoriteInputChange} = props;
  const [sortedPersons, setSortedPersons] = useState(persons);

  useEffect(() => {
    setSortedPersons([]);

    setTimeout(() => {
      setSortedPersons(persons);
    });
  }, [persons]);

  useEffect(() => {
    setSortedPersons([]);

    setTimeout(() => {
      setSortedPersons(persons);
    });
  }, [isTableView]);


  return (
    <Ul>
      {sortedPersons.map((person, i) => {
        return (
          <Person
            person = {person}
            i = {i}
            key = {i}
            isTableView = {isTableView}
            onFavoriteInputChange = {onFavoriteInputChange}
          />

        );
      })}
    </Ul>
  );
};

export default PersonList;
