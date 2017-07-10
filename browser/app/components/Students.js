import React from 'react';
import { Link } from 'react-router-dom';

const Students = (props) => {
	const students = props.students
  return (
    <div>
      <h1>Students</h1>
      {students.map((student) => <div key={student.id}><Link to={`/students/${student.id}`}><h3>{student.name}</h3></Link><h5>{student.email}</h5></div>)}
    </div>
  );
};

export default Students;