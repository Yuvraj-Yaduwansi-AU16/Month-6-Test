import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [state, setState] = useState({
    time: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    setInterval(() => {
      setState((prevstate) => ({
        ...prevstate,
        time: new Date().toLocaleTimeString(),
      }));
    }, 1000);
  }, []);

  return (
    <div className='d-flex justify-content-center'>
      <div className='bg-secondary p-5 w-100'>
        <h1 className='text-info text-center'>{state.time}</h1>
      </div>
    </div>
  );
};

export default Clock;
