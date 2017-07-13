import React from 'react';
import { Link } from 'react-router-dom';

const Students = (props) => {
	const students = props.students;
	console.log('peops,', students);
  return (
    <div>
      <h1>Students</h1>
      {students.map((student) => {return (
      	<div key={student.id} className="col-xs-4">
      		<Link to={`/students/${student.id}`}>
      			<h3>{student.name}</h3>
      		</Link>
      		<h5>{student.email}</h5>
      		<h6>Campus: {student.campusId ? student.campusId : 'None'}</h6>
      	</div>);}
      )}
    </div>
  );
};

export default Students;