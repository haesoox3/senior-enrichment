import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';

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
  }

  fetchByCampusId (campusId) {
    axios.get(`/api/campus/${campusId}`)
    .then(res => res.data)
    .then(campus => this.setState({
      campus
    }));
  }

  fetchStudentsByCampusId(campusId){
    axios.get(`/api/campus/${campusId}/students`)
    .then(res => res.data)
    .then(students => this.setState({
      students : students
    }))
  }
  
  render () {
    const campus = this.state.campus;
    return (
      <div className="campus">
          <h3>{ campus.name }</h3>
          <Link to={`/campuses/${campus.id}/students`}>Students</Link>
      </div>
    );
  }
}

export default Campus;

