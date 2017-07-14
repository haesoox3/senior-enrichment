import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
  	<div className='body'>
  		<h1 className='welcome-tag'>WELCOME TO MARGARET HAMILTON INTERPLANETARY ACADEMY OF JAVASCRIPT</h1>
  		<div className='center'>
        <Link to='/campuses'>
  		    <button className='welcome-button'>View Campuses</button>
  		  </Link>
      </div>
      <div className='center'>
  		  <Link to='/students'>
  		    <button className='welcome-button'>View Students</button>
  		  </Link>
      </div>
  	</div>
  );
}

export default Home;