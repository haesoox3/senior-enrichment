import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';

class Student extends React.Component {

  constructor () {
    super();
    this.state = {
      student: {},
      campus : {}
    };
    this.fetchStudentById = this.fetchStudentById.bind(this);
    // this.fetchStudentCampus = this.fetchStudentCampus.bind(this);
  }

  componentDidMount () {
    const studentId = this.props.match.params.studentId;
    this.fetchStudentById(studentId);
    // const campusId = this.state.student.campusId;
    // console.log('student campus id', this.state.student);
    // this.fetchStudentCampus(campusId);
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

  // fetchStudentCampus (campusId) {
  //   axios.get(`/api/campus/${campusId}`)
  //   .then(res => res.data)
  //   .then(campus => {
  //     this.setState({
  //       campus
  //     });
  //     return 
  //   }
  //   );
  // }
  
  render () {
    const student = this.state.student;
    console.log('student info', student);
    return (
      <div className="student">
          <h3>{ student.name }</h3>
          <h5>{student.email}</h5>
          <h5>Campus: <Link to={`/campuses/${student.campusId}`}>{this.state.campus.name}</Link></h5>
      </div>
    );
  }
}

export default Student;

