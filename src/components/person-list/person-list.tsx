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
  const [videoPlayingId, setVideoPlayingid] = useState(-1);
  const [autoPlayingCount, setAutoPlayingCount] = useState(0);
  const [allPlayingCount, setAllPlayingCount] = useState(0);
  const [autoPlay, setAutoplay] = useState(true);


  useEffect(() => {
    setSortedPersons([]);

    setTimeout(() => {
      setSortedPersons(persons);
    });
  }, [persons, isTableView]);

  const checkAutoPlayStatus = () => {
    if (autoPlayingCount < allPlayingCount) {
      setAutoplay(false);
    }
  };

  console.log(autoPlayingCount);
  console.log(allPlayingCount);

  const updateAllPlayingCount = () => {
    setAllPlayingCount(allPlayingCount + 1);
  };

  const updateAutoPlayingCount = () => {
    setAutoPlayingCount(autoPlayingCount + 1);
  };

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
            autoPlay = {autoPlay}
            onFavoriteInputChange = {onFavoriteInputChange}
            setAutoPlayingCount = {updateAutoPlayingCount}
            setAllPlayingCount = {updateAllPlayingCount}
            setVideoPlayingid = {setVideoPlayingid}
            checkAutoPlayStatus = {checkAutoPlayStatus}
          />

        );
      })}
    </Ul>
  );
};

export default PersonList;
