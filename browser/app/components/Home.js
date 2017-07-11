import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
  	<div>
  		<h1>WELCOME TO MARGARET HAMILTON INTERPLANETARY ACADEMY of JAVASCRIPT</h1>
  		<Link to='/campuses'>
  		<button>View Campuses</button>
  		</Link>
  		<Link to='/students'>
  		<button>View Students</button>
  		</Link>
  	</div>
  );
}

export default Home;
