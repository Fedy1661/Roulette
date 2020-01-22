import React from 'react';
import { withItem } from '../HOC-helper';

const RedCat = () => {
  return (
    <img
      className="cat"
      src="http://obshe.net/upload/000/u10/9b/7c/2b2ede3a.jpg"
      alt="red cat"
    />
  );
};
export default withItem(RedCat);
