import React from 'react';
import { withItem } from '../HOC-helper';
const BlackCat = () => {
  return (
    <img
      className="cat"
      src="https://rtvi.com/upload/iblock/274/274c22021110d8574e0363128271716c.jpg"
      alt="black cat"
    />
  );
};

export default withItem(BlackCat);
