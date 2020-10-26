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
  isTableView: boolean
}

const PersonList: React.FunctionComponent<Props> = (props: Props) => {
  const {persons, isTableView} = props;
  const [sortedPersons, setSortedPersons] = useState(persons);
  console.log(persons);

  useEffect(() => {
    setSortedPersons([]);

    setTimeout(() => {
      setSortedPersons(persons);
    });
  }, [persons]);


  return (
    <Ul>
      {sortedPersons.map((person, i) => {
        return (
          <Person
            person = {person}
            i = {i}
            key = {i}
            isTableView = {isTableView}
          />

        );
      })}
    </Ul>
  );
};

export default PersonList;
