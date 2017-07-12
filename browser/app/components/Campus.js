import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';
import Students from './Students';

class Campus extends React.Component {

  constructor () {
    super();
    this.state = {
      campus: {},
      students : []
    };
    this.fetchByCampusId = this.fetchByCampusId.bind(this);
    this.fetchStudentsByCampusId = this.fetchStudentsByCampusId.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentDidMount () {
    console.log('campus props', this.props)
    console.log('campus match??', this.match)
    const campusId = this.props.match.params.campusId;
    this.fetchByCampusId(campusId);
    this.fetchStudentsByCampusId(campusId);
  }

  fetchByCampusId (campusId) {
    axios.get(`/api/campus/${campusId}`)
    .then(res => res.data)
    .then(campus => this.setState({
      campus
    }));
  }

  fetchStudentsByCampusId(campusId){
    axios.get(`/api/student/${campusId}/students`)
    .then(res => res.data)
    .then(students => this.setState({
      students : students
    }))
  }

  deleteStudent(studentId){
    axios.delete(`/api/student/${studentId}`)
    .then(res=>res.data);
  }
  
  render () {
    const campus = this.state.campus;
    const students = this.state.students;
    console.log('students??', students);
    return (
      <div className="campus">
          <h1>{ campus.name }</h1>
          <Students students={this.state.students} deleteStudent={this.deleteStudent}/>
      </div>
    );
  }
}

export default Campus;

