import React, {useEffect, useState} from 'react';
import {useCallback, useRef} from 'react';
import {PersonType} from '../../types';
import styled from 'styled-components';
import {Transition} from 'react-transition-group';
import {useInView} from 'react-intersection-observer';


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

// eslint-disable-next-line
const Li = styled.li<{big: boolean}>`
  position: relative;
  display: flex;
  flex-wrap: wrap;

  width: ${({big}) => big ? `100%` : `49%`};

  margin-bottom: 15px;

  border: 1px solid grey;

  box-shadow: 0 10px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const H2 = styled.h2`
  display: inline-block;

  margin-left: 15px;
  margin-top: 0;
  margin-bottom: 0;
`;

const P = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  position: absolute;

  top: 15px;
  right: 15px;

  cursor: pointer;
`;

// eslint-disable-next-line
const PlayerDiv = styled.div<{isTableView: boolean}>`
  display: ${({isTableView}) => isTableView ? `block` : `none`};

  max-width: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// eslint-disable-next-line
const InfoDiv = styled.div<{video: boolean}>`
  position: relative;

  width: ${({video}) => video ? `50%` : `100%`};

  padding-left: 25px;
  padding-top: 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

interface Props {
  person: PersonType,
  i: number,
  isTableView: boolean,
  videoPlayingId: number,
  onFavoriteInputChange: (arg0: number) => void,
  setVideoPlayingid: (id: number) => void,
}

const Person: React.FunctionComponent<Props> = (props: Props) => {
  const {person, i, isTableView, videoPlayingId, onFavoriteInputChange, setVideoPlayingid} = props;
  const [favoriteStatus, setFavoriteStatus] = useState(person.favourite);
  const [inProp, setInProp] = useState(false);

  const autoPlay = true;

  const {ref, inView} = useInView({
    /* Optional options */
    threshold: 1,
    trackVisibility: true,
    delay: 100,
    rootMargin: `-20% 0px -20% 0px`,
  });


  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = useCallback(() => {
    videoRef.current?.play();
  }, []);


  const pauseVideo = useCallback(() => {
    videoRef.current?.pause();

  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setInProp(true);
    }, 10);
    return () => {
      setInProp(false);
      window.clearInterval(timer);
    };
  }, [person]);

  useEffect(() => {
    if (videoPlayingId !== person.id) {
      pauseVideo();
    }
    if (inView && autoPlay) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [videoPlayingId, inView]);


  return (
    <Transition in={inProp} timeout={duration} key={person.id} >
      {(state) => (

        <Li style={{
          ...defaultStyle,
          ...transitionStyles[state],
          transitionDelay: `${i * 150}ms`
        } }
        big = {person.video || !isTableView ? true : false}
        >
          <InfoDiv video = {person.video && isTableView ? true : false}>
            <img src={`./images/${person.image}.svg`} width='45px' height='45px' alt='Фотогпфия пользователя'/>
            <H2>{person.name}</H2>
            <input type="checkbox" id={`event-${person.id}`} className="visually-hidden" checked={favoriteStatus} onChange = {() => {
              setFavoriteStatus(!favoriteStatus);
              onFavoriteInputChange(person.id);
            }}/>
            <Label htmlFor={`event-${person.id}`} style={{display: `inlone-block`}}>
              <span className="visually-hidden">Add to favorite</span>
              <svg width="28" height="28" viewBox="0 0 28 28" fill={favoriteStatus ? `#1053b8` : `#e8eef7`}>
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </Label>
            <P>{person.age}</P>
            <P>{person.phone}</P>
            <P>{person.phrase}</P>
          </InfoDiv>
          {person.video ?
            <PlayerDiv isTableView = {isTableView} ref={ref}>
              <video
                src = {`./videos/${person.video}.mp4`}
                controls = {true}
                autoPlay = {false}
                muted = {true}
                ref = {videoRef}
                style = {{
                  width: `100%`,
                  boxShadow: `0 10px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`
                }}
                onPlaying = {() => {
                  setVideoPlayingid(person.id);
                }}
              />
            </PlayerDiv>

            : `` }
        </Li>

      )}
    </Transition>
  );
};

export default Person;
