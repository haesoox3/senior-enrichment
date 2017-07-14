import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import Students from './Students';
const _=require('lodash');

class Campus extends React.Component {

  constructor () {
    super();
    this.state = {
      campus: {},
      students : []
    };
    this.fetchByCampusId = this.fetchByCampusId.bind(this);
    this.fetchStudentsByCampusId = this.fetchStudentsByCampusId.bind(this);
    this.directionsClick = this.directionsClick.bind(this);
    this.calendar = this.calendar.bind(this);
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

  directionsClick(){
    const directions = ['Turn left on the intersection of KEEP and DREAMING', "Try Russia's Space Program?"];
    alert(_.sample(directions));
  }

  calendar(){
    var call = new CalendarPopup();
  }
  
  render () {
    const campus = this.state.campus;
    const students = this.state.students;
    return (
      <div className="campus">
        <h1>{ campus.name }</h1>
        <div className='center'>
          <button onClick={this.directionsClick}>Directions</button>
        </div>
        <hr />
        <Students students={this.state.students}/>
      </div>
    );
  }
}

export default Campus;