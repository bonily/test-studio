import React from "react";
import {SORT_TYPES} from '../../const';

interface Props {
  onSortTitleClick: (arg0: string) => void;
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {onSortTitleClick} = props;

  return (
    <header>
      <button onClick={() => onSortTitleClick(SORT_TYPES.NAME)}>NAME</button>
    </header>
  );
};

export default Header;
