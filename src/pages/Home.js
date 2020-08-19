import React from 'react';
import Search from '../components/Search';
import './Home.css';

export default function Home() {
  return (
    <div>
      <div className="Home-wrapper">
        <h3>Welcome to </h3>
        <h1 className="logo">PlanAway!</h1>
        <p>search flights and plan your vacations without stress</p>
      </div>
      <Search />
    </div>
  );
}
