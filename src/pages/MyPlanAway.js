import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const MyPlanAway = () => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div>
      {isLogged ? <h1>Hello it is the MyPlanAway page</h1> : <Redirect to='/account/login' />}
    </div>
  )
};

export default MyPlanAway;
