/* eslint-disable no-alert, no-console */
import React from "react";
import {PersonType} from '../../types';
import styled from 'styled-components';
import Person from '../person/person';


const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 90%;

  margin-left: auto;
  margin-right: auto;

  padding-left: auto;
  padding-right: auto;

  list-style: none;
`;

// eslint-disable-next-line
const Li = styled.li<{big: boolean}>`
  width: ${({big}) => big ? `100%` : `45%`};

  margin-right: 20px;

  border: 1px solid grey;
`;


interface Props {
  persons: PersonType[],
}

const PersonList: React.FunctionComponent<Props> = (props: Props) => {
  const {persons} = props;


  return (
    <Ul>
      {persons.map((person, i) => {
        return (
          <Person
            person = {person}
            i = {i}
            key = {i}
          />

        );
      })}
    </Ul>
  );
};

export default PersonList;
