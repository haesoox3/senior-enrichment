import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

class Student extends React.Component {

  constructor () {
    super();
    this.state = {
      student: {},
      campus : {}
    };
    this.fetchStudentById = this.fetchStudentById.bind(this);
  }

  componentDidMount () {
    const studentId = this.props.match.params.studentId;
    this.fetchStudentById(studentId);
  }

  fetchStudentById (studentId) {
    axios.get(`/api/student/${studentId}`)
    .then(res => res.data)
    .then(student => {
      this.setState({
        student:student
      });
      const campusId = this.state.student.campusId;
      return axios.get(`/api/campus/${campusId}`)
    })
    .then(res => res.data)
    .then(campus => this.setState({campus:campus}));
  }
  
  render () {
    const student = this.state.student;
    return (
      <div className="student">
          <h1>{ student.name }</h1>      
          <h3>Student Email: {student.email}</h3>
          <h3>Campus: <Link to={`/campuses/${student.campusId}`}>{this.state.campus.name}</Link></h3>
          <button>Contact {student.name}</button>
      </div>
    );
  }
}

export default Student;