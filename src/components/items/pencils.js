import React from 'react';
import PencilsSvg from '../../images/pencils.svg';
import { withItem } from '../HOC-helper';

const Pencils = () => {
  return <img className="cat" src={PencilsSvg} alt='Pencils'></img>;
};

export default withItem(Pencils);
