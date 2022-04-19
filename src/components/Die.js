import React from 'react';

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59e391' : 'white',
  };
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <span className="die-num">{props.value}</span>
    </div>
  );
}
