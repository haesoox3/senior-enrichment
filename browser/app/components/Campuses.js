import React from 'react';
import { Link } from 'react-router-dom';

const Campuses = (props) => {
	const campuses = props.campuses
  return (
    <div>
      <h1>Campuses</h1>
      {campuses.map((campus) => <h1 key={campus.id}><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h1>)}
    </div>
  );
};

export default Campuses;