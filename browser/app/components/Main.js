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
    this.editStudent = this.editStudent.bind(this);
    this.editCampus = this.editCampus.bind(this);
    this.editStudentList = this.editStudentList.bind(this);
    this.deleteCampus = this.deleteCampus.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
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
    axios.put(`/api/student/${studentId}`, {name: studentName, email: studentEmail, campusId: campusId })
    .then(res => res.data)
    .then(student => {
      this.setState({
        students: this.state.students.filter(student=> Number(student.id)!== Number(studentId)).concat(student[1][0])
      });
    });
  }

  editCampus(campusId, campusName, campusImgUrl, students){
    axios.put(`/api/campus/${campusId}`, {name: campusName, imgUrl: campusImgUrl })
    .then(res => res.data)
    .then(campus => {
      this.setState({
        campuses: this.state.campuses.filter(campus=> Number(campus.id)!== Number(campusId)).concat(campus[1][0])
      });
    });
  }

  editStudentList(studentIds, newCampus){
    for (let studentId of studentIds){
      axios.put(`/api/student/${studentId}`, newCampus)
      .then(res=> res.data)
      .then(student => {
        this.setState({
          students: this.state.students.filter((student) => Number(student.id)!== Number(studentId)).concat(student[1][0])
        });
      });
    }
  }

  deleteCampus(campusId){
    axios.delete(`/api/campus/${campusId}`)
    .then(()=>{
      return axios.get('/api/student')
    })
    .then(res=>res.data)
    .then(students => {
      this.setState({
        students: students
      })
    })
    .then(()=>{
      this.setState({
        campuses: this.state.campuses.filter((campus) => Number(campus.id) !== Number(campusId))
      });
    });
  }

  deleteStudent(studentId){
    axios.delete(`/api/student/${studentId}`)
    .then(res=>res.data)
    .then(()=>{
      this.setState({
        students: this.state.students.filter((student) => Number(student.id) !== Number(studentId))
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
              <Route exact path="/campuses" render={() => <Campuses campuses={this.state.campuses}/>}  />
              <Route exact path='/students' render={() => <Students students={this.state.students} campuses={this.state.campuses}/>} />
              <Route path='/delete-campus' render={() => <DeleteCampus campuses={this.state.campuses} deleteCampus={this.deleteCampus}/>} />
              <Route path='/delete-student' render={() => <DeleteStudent students={this.state.students} campuses={this.state.campuses} deleteStudent={this.deleteStudent}/>} />
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
