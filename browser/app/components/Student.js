import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';

class Student extends React.Component {

  constructor () {
    super();
    this.state = {
      student: {}
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
    .then(student => this.setState({
      student
    }));
  }
  
  render () {
    const student = this.state.student
    return (
      <div className="student">
          <h3>{ student.name }</h3>
          <h5>{student.email}</h5>
      </div>
    );
  }
}

export default Student;

