import React, { Component } from 'react';
import { HashRouter , Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Campuses from './Campuses';
import Campus from './Campus'
import Sidebar from './Sidebar';
import Home from './Home';
import Students from './Students';
import Student from './Student';
import NewCampus from './NewCampus';
import NewStudent from './NewStudent';
import DeleteCampus from './DeleteCampus';
import DeleteStudent from './DeleteStudent';

export default class Main extends Component {

  constructor () {
    super();
    this.state = {
      campuses : [],
      students: []
    }
    this.addCampus = this.addCampus.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount(){
    axios.get('/api/student')
    .then(res => res.data)
    .then(students => this.setState({ 
      students : students
    }));
    axios.get('/api/campus')
    .then(res => res.data)
    .then(campuses => this.setState({ 
      campuses : campuses
    }));
  }

  addCampus (campusName) {
    axios.post('/api/campus', { name: campusName })
    .then(res => res.data)
    .then(campus => {
      this.setState({
        campuses: [...this.state.campuses, campus]
      });
    });
  }

  addStudent (studentName, studentEmail) {
    axios.post('/api/student', { name: studentName, email: studentEmail })
    .then(res => res.data)
    .then(student => {
      this.setState({
        students: [...this.state.students, student]
      });
    });
  }

  render () {
    return (
      <HashRouter>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path="/campuses" render={() => <Campuses campuses={this.state.campuses}/>}  />
              <Route exact path='/students' render={() => <Students students={this.state.students}/>} />
              <Route path='/delete-campus' component={DeleteCampus} />
              <Route path='/delete-student' component={DeleteStudent} />
              <Route path='/students/:studentId' component={Student} />
              <Route path='/campuses/:campusId' component={Campus} />
              <Route exact path='/new-campus' render={() => <NewCampus addCampus={this.addCampus}/>}  />
              <Route exact path='/new-student' render={() => <NewStudent addStudent={this.addStudent}/>} />
              <Route component={Home} />
            </Switch>
          </div>
        </div>
    </HashRouter>
    );
  }
}
