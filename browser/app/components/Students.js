import React from 'react';
import { Link } from 'react-router-dom';
import Student from './Student';

const Students = (props) => {
	const students = props.students;
  const campuses = props.campuses;
  return (
    <div>
      <h1>STUDENTS</h1>
      {students.map((student) => {return (
        <div key={student.id} className="col-xs-4">
          <h2>
            <Link to={`/students/${student.id}`}>{student.name}</Link>
          </h2>
          <h4>{student.email}</h4>
          <h4>{student.campusId ? (campuses ? "Campus: " + campuses.filter((campus)=> Number(campus.id)===Number(student.campusId))[0].name : '') : 'Campus: None'} </h4>
        </div>);}
      )}
    </div>
  );
};

export default Students;

          // {student.campusId ? campuses.filter((campus)=> Number(campus.id)===Number(student.campusId))[0].name : 'None'}</h4>
          // {campuses ? (student.campusId ? campuses.filter((campus)=> Number(campus.id)===Number(student.campusId))[0].name : 'None' }