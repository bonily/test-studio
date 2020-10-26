/* eslint-disable no-alert, no-console */
import React, {useEffect, useState} from "react";
import {PersonType} from '../../types';
import styled from 'styled-components';
import {Transition} from 'react-transition-group';
import ReactPlayer from 'react-player';


const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms 500ms`,
  opacity: 0,
};

const transitionStyles = {
  entering: {opacity: 0},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0},
  unmounted: {opacity: 0}
};

const StarButton = styled.button`
  border: none;

  background: url('./star.svg');
`;


// eslint-disable-next-line
const Li = styled.li<{big: boolean}>`
  width: ${({big}) => big ? `100%` : `45%`};

  margin-right: 20px;

  border: 1px solid grey;
`;


interface Props {
  person: PersonType,
  i: number
}

const Person: React.FunctionComponent<Props> = (props: Props) => {
  const {person, i} = props;
  const playerRef = React.useRef(null);
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setInProp(true);
    }, 100);
    return () => {
      setInProp(false);
      window.clearInterval(timer);
    };
  }, []);
  console.log(inProp);

  return (
    <Transition in={inProp} timeout={duration} key={i}>
      {(state) => (

        <Li style={{
          ...defaultStyle,
          ...transitionStyles[state],
          transitionDelay: `${i * 1000}ms`
        }}
        big = {person.video ? true : false}
        >
          <img src={`./images/${person.image}.svg`} width='45px' height='45px' alt='Фотогпфия пользователя'/>
          <h2>{person.name}</h2>
          <StarButton></StarButton>
          <p>{person.age}</p>
          <p>{person.phone}</p>
          <p>{person.phrase}</p>
          {person.video ?
            <div ref={playerRef}>
              <ReactPlayer
                url = {`./videos/${person.video}.mp4`}
                controls = {true}
                playing = {true}

              />
            </div>
            : `` }
        </Li>

      )}
    </Transition>
  );
};

export default Person;
