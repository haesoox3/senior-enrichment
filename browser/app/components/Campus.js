import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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
  }

  componentDidMount () {
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
  
  render () {
    const campus = this.state.campus;
    const students = this.state.students;
    return (
      <div className="campus">
          <h1>{ campus.name }</h1>
          <div className='center'>
          <button>Directions</button>
          </div>
          <hr />
          <Students students={this.state.students}/>
      </div>
    );
  }
}

export default Campus;