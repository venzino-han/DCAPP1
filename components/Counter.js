import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      let start = new Date().getTime()
      interval = setInterval(() => {
        const now = new Date().getTime()
        setSeconds(seconds => seconds + now - start );
        start = new Date().getTime()
      }, 800);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    [   seconds, setSeconds,
        isActive, setIsActive,
        reset,
    ]
  );
};

export default Counter;