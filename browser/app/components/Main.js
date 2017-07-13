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
import UpdateStudent from './UpdateStudent';
import UpdateCampus from './UpdateCampus';
const _ = require('lodash');

export default class Main extends Component {

  constructor () {
    super();
    this.state = {
      campuses : [],
      students: []
    }
    this.addCampus = this.addCampus.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
    this.editStudentList = this.editStudentList.bind(this);
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
    const imgPaths = ['earth.jpg', 'mars.jpg', 'mercury.jpg'];
    axios.post('/api/campus', { name: campusName, imgUrl : _.sample(imgPaths)})
    .then(res => res.data)
    .then(campus => {
      this.setState({
        campuses: [...this.state.campuses, campus]
      });
    });
  }

  addStudent (studentName, studentEmail, campusId) {
    campusId = (campusId === '') ? null : campusId;
    axios.post('/api/student', { name: studentName, email: studentEmail, campusId: campusId })
    .then(res => res.data)
    .then(student => {
      this.setState({
        students: [...this.state.students, student]
      });
    });
  }

  editStudent(studentId, studentName, studentEmail, campusId){
    console.log('campusId recieved', campusId);
    axios.put(`/api/student/${studentId}`, {name: studentName, email: studentEmail, campusId: campusId })
    .then(res => res.data)
    .then(student => {
      this.setState({
        students: [...this.state.students, student]
      });
    });
  }

  editCampus(campusId, campusName, campusImgUrl, students){
    axios.put(`/api/campus/${campusId}`, {name: campusName, imgUrl: campusImgUrl })
    .then(res => res.data)
    .then(campus => {
      this.setState({
        campuses: [...this.state.campuses, campus[1][0]]
      });
    });
  }

  deleteStudent(studentId){
    axios.delete(`/api/student/${studentId}`)
    .then(res=>res.data);
  }

  editStudentList(studentIds, newCampus){
    for (let studentId of studentIds){
      axios.put(`/api/student/${studentId}`, newCampus)
      .then(res=> res.data)
      .then(student => {
        this.setState({
          students: [...this.state.students, student[1][0]]
        })
      })
    }
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
              <Route exact path='/students' render={() => <Students students={this.state.students} deleteStudent={this.deleteStudent}/>} />
              <Route path='/delete-campus' component={DeleteCampus} />
              <Route path='/delete-student' component={DeleteStudent} />
              <Route path='/update-student' render={()=> <UpdateStudent students={this.state.students} campuses={this.state.campuses} editStudent={this.editStudent}/>} />
              <Route path='/update-campus' render={()=> <UpdateCampus campuses={this.state.campuses} students={this.state.students} editCampus={this.editCampus} editStudentList={this.editStudentList}/>} />
              <Route path='/students/:studentId' component={Student} />
              <Route path='/campuses/:campusId' component={Campus} />
              <Route exact path='/new-campus' render={() => <NewCampus addCampus={this.addCampus}/>}  />
              <Route exact path='/new-student' render={() => <NewStudent addStudent={this.addStudent} campuses={this.state.campuses}/>} />
              <Route component={Home} />
            </Switch>
          </div>
        </div>
    </HashRouter>
    );
  }
}
