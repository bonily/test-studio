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
  videoPlayingId: number,
  sortType: string,
  isAscending: boolean,
  isLoaded: boolean,
  setVideoPlayingid: (id: number) => void,
  onFavoriteInputChange: (arg0: number) => void
}

const PersonList: React.FunctionComponent<Props> = (props: Props) => {
  const {persons, sortType, isAscending, videoPlayingId, isTableView, isLoaded, onFavoriteInputChange, setVideoPlayingid} = props;
  const [sortedPersons, setSortedPersons] = useState(persons);

  useEffect(() => {
    setSortedPersons([]);

    setTimeout(() => {
      setSortedPersons(persons);
    });
  }, [isAscending, sortType, isTableView, isLoaded]);


  return (
    <Ul>
      {sortedPersons.map((person, i) => {
        return (
          <Person
            person = {person}
            i = {i}
            key = {i}
            isTableView = {isTableView}
            videoPlayingId = {videoPlayingId}
            onFavoriteInputChange = {onFavoriteInputChange}
            setVideoPlayingid = {setVideoPlayingid}
          />

        );
      })}
    </Ul>
  );
};

export default PersonList;
