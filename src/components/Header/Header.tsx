/* eslint-disable no-alert, no-console */
import React, {useState} from 'react';
import styled from 'styled-components';
import {LANGUAGE} from '../../const';


const HeaderStyle = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 85%;

  margin-left: auto;
  margin-right: auto;
`;

// eslint-disable-next-line
const Button = styled.button<{isActive: boolean}>`
  display: block;
  width: 33.3%;
  height: 30px;

  font-weight: bold;
  margin-bottom: 15px;

  background: ${({isActive}) => isActive ? `#e6e6e6` : `#ffffff`};
  border: 1px solid grey;

  cursor: pointer;

  &:hover {
    color: #ffffff;

    background: #9f9d9d
  }
`;

const RangingButton = styled(Button)`
  width: 50%;
`;

const ViewButton = styled(Button)`
  width: 50%;
  height: 75px;

  @media (max-width: 640px) {
    width: 100%;

    height: 30px;
  }
`;

// eslint-disable-next-line
const LanguageButton = styled.button<{isActive: boolean}>`
  width: 30px;
  height: 25px;

  color: ${({isActive}) => isActive ? ` #000000` : `#9f9d9d`};

  border: none;
  background: #ffffff;

  &:hover {
    color: #000000;
  }
`;

const SortDiv = styled.div`
  display: flex;
  flex-wrap: wrap;

  & ~ div {
    margin-left: 10px;
  }
`;

const H2 = styled.h2`
  width: 100%;

  font-size: 18px;
`;

const Input = styled.input`
  width: 100%;
`;

const sortTypes = [{type: `ID`, russian: `ID`, english: `ID`}, {type: `NAME`, russian: `Имя`, english: `Name`}, {type: `AGE`, russian: `Возраcт`, english: `Age`}];


interface Props {
  sortType: string,
  language: string,
  isAscending: boolean,
  isTableView: boolean,
  onRangingTitleClick: () => void,
  onSortTitleClick: (arg0: string) => void,
  onLanguageTitleClick: (arg0: string) => void,
  onViewTitleClick: () => void,
  onInputChange: (arg0: string) => void,
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {isAscending, isTableView, language, sortType, onLanguageTitleClick, onRangingTitleClick, onSortTitleClick, onViewTitleClick, onInputChange} = props;
  const [inputText, setInputText] = useState(``);

  const isLanguageRu = language === LANGUAGE.RU;

  return (
    <HeaderStyle>
      <div style={{width: `100%`}}>
        <LanguageButton onClick = {() => onLanguageTitleClick(LANGUAGE.RU)} isActive = {isLanguageRu ? true : false}>RU</LanguageButton>
        <LanguageButton onClick = {() => onLanguageTitleClick(LANGUAGE.EN)} isActive = {language === LANGUAGE.EN ? true : false}>EN</LanguageButton>
      </div>
      <SortDiv style = {{width: `70%`}}>
        <H2>{isLanguageRu ? `Сортировка` : `Sort by`}</H2>
        {sortTypes.map((type) => {
          return (
            <Button
              onClick = {() => onSortTitleClick(type.type)}
              key = {type.type}
              isActive = {sortType === type.type ? true : false}
            >{isLanguageRu ? type.russian : type.english}</Button>
          );
        })}
        <RangingButton onClick = {() => onRangingTitleClick()} isActive = {isAscending ? true : false}>{isLanguageRu ? `По возрастанию` : `Ascending order`}</RangingButton>
        <RangingButton onClick = {() => onRangingTitleClick()} isActive = {!isAscending ? true : false}>{isLanguageRu ? `По убыванию` : `Descending order`}</RangingButton>
      </SortDiv>
      <SortDiv style = {{width: `25%`}}>
        <H2>{isLanguageRu ? `Вид` : `View`}</H2>
        <ViewButton onClick = {() => onViewTitleClick()} isActive = {isTableView ? true : false}>{isLanguageRu ? `Таблица` : `Table`}</ViewButton>
        <ViewButton onClick = {() => onViewTitleClick()} isActive = {!isTableView ? true : false}>{isLanguageRu ? `Превью` : `Preview`}</ViewButton>
      </SortDiv>
      <Input type='text' placeholder = {isLanguageRu ? `Поиск` : `Search`}
        onChange = {(evt) => {
          setInputText(evt.currentTarget.value);
          onInputChange(inputText);
        }}></Input>
    </HeaderStyle>
  );
};

export default Header;
