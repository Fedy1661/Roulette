import React from 'react';

const withItem = Wrapped => props => {
  if(props.winner === true){
    console.log('WINNER')
  }
  return <Wrapped {...props} />;
};

export default withItem;
