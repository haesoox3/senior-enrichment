import React from 'react';
import { Link } from 'react-router-dom';
import Student from './Student';

const Students = (props) => {
	const students = props.students;
  return (
    <div>
      <h1>STUDENTS</h1>
      {students.map((student) => {return (
        <div key={student.id} className="col-xs-4">
          <h2>
            <Link to={`/students/${student.id}`}>{student.name}</Link>
          </h2>
          <h4>{student.email}</h4>
          <h4>Campus: {student.campusId ? student.campusId : 'None'}</h4>
        </div>);}
      )}
    </div>
  );
};

export default Students;