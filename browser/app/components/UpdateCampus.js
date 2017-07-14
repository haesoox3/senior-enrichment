import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UpdateCampus extends Component {
  constructor(props){
    super(props);
    this.state = {
      campusId: '',
      name : '',
      imgUrl:'',
      studentsToRemove : [],
      studentsToAdd : [],
      edited : false
    }
    this.handleCampusInformationChange = this.handleCampusInformationChange.bind(this);
    this.handleCampusSelectChange = this.handleCampusSelectChange.bind(this);
    this.handleCampusInformationSubmit = this.handleCampusInformationSubmit.bind(this);
    this.handleStudentChange = this.handleStudentChange.bind(this);
    this.handleStudentChangeAdd = this.handleStudentChangeAdd.bind(this);
    this.handleStudentSubmit = this.handleStudentSubmit.bind(this);
    this.handleStudentSubmitAdd = this.handleStudentSubmitAdd.bind(this);
  }

  handleCampusSelectChange(event){
    const campusId = event.target.value;
    axios.get(`/api/campus/${campusId}`)
    .then(res => res.data)
    .then(campus => {
      this.setState({ campusId: campus.id, name: campus.name, imgUrl: campus.imgUrl})
      return axios.get(`/api/student/${campusId}/students`)
    })
    .then(res=> res.data)
    .then(students => this.setState({students:students}));
  }

  handleCampusInformationChange (event) {
    this.setState({
      [event.target.name] : event.target.value,
      edited : true
    });
  }

  handleStudentChange(event){
    this.setState({
      studentsToRemove:[...this.state.studentsToRemove, event.target.value]
    });
  }

  handleStudentChangeAdd(event){
    this.setState({
      studentsToAdd:[...this.state.studentsToAdd, event.target.value]
    });
  }


  handleStudentSubmit(event){
    event.preventDefault();
    const studentsBeingRemoved = [];
    const mySet = new Set(this.state.studentsToRemove);
    for (let id of mySet){
      let count = 0;
      for (let arrId of this.state.studentsToRemove){
        if (arrId === id){
          count ++;
        }
      }
      if (count%2 === 1){
        studentsBeingRemoved.push(id);
      }
    }
    this.props.editStudentList(studentsBeingRemoved, {campusId: null});
  }

  handleStudentSubmitAdd(event){
    event.preventDefault();
    const studentsBeingAdded = [];
    const mySet = new Set(this.state.studentsToAdd);
    for (let id of mySet){
      let count = 0;
      for (let arrId of this.state.studentsToAdd){
        if (arrId === id){
          count ++;
        }
      }
      if (count%2 === 1){
        studentsBeingAdded.push(id);
      }
    }
    this.props.editStudentList(studentsBeingAdded, {campusId: this.state.campusId});
  }

  handleCampusInformationSubmit (evt) {
    evt.preventDefault();
    this.props.editCampus(this.state.campusId, this.state.name, this.state.imgUrl, this.state.students); // pass the input value to the method from Main!
    this.setState({
      name:'',
      imgUrl: '',
      students: [],
      edited:false
    });
  }

  render(){
    const campusList = this.props.campuses;
    const studentList = this.props.students;
    return (
      <div className='well'>
        <h1>Update Campus Information</h1>
        <fieldset>
          <legend>Choose a Campus</legend>
          <div className="form-group">
            <label htmlFor="campus" className="col-xs-2 control-label">Campuses</label>
            <div className="col-xs-10">
              <select className="form-control" name="campus" onChange={this.handleCampusSelectChange}>
                <option>-</option>
                {campusList.map((campus, idx) => (<option value={campus.id} key={`${idx}`}>{campus.name}</option>))}
              </select>
            </div>
          </div>
        </fieldset>
        <form className="form-horizontal" onSubmit={this.handleCampusInformationSubmit}>
          <fieldset>
            <legend>Campus Information</legend>
            <div className="form-group">
                <label className="col-xs-2 control-label">Name</label>
                <div className="col-xs-10">
                  <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleCampusInformationChange}/>
                </div>
                <label className="col-xs-2 control-label">Image</label>
                <div className="col-xs-10">
                  <input className="form-control" type="text" name="imgUrl" value={this.state.imgUrl} onChange={this.handleCampusInformationChange}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-10 col-xs-offset-2">
                  <button type="submit" className="btn btn-success">Edit Campus</button>
                </div>
              </div>
          </fieldset>
        </form>
        <form className="form-horizontal" onSubmit={this.handleStudentSubmit}>
          <fieldset>
            <legend>Current Students</legend>
            <div>
              {studentList.filter((student) => student.campusId === this.state.campusId).map((student, idx)=> <div key={idx}><input key={student.id} type="checkbox" id={student.name} value={student.id} onChange={this.handleStudentChange}/><label>{student.name}</label></div>)}
            </div>
            <div>
              <button>Remove Selected Students</button>
            </div>
          </fieldset>
        </form>
        <form className="form-horizontal" onSubmit={this.handleStudentSubmitAdd}>
          <fieldset>
            <legend>Add New Students</legend>
            <div>
              {studentList.filter((student) => student.campusId !== this.state.campusId).map((student, idx)=> <div key={idx}><input key={student.id} type="checkbox" id={student.name} value={student.id} onChange={this.handleStudentChangeAdd}/><label>{student.name}</label></div>)}
            </div>
            <div>
              <button>Add Selected Students</button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
};