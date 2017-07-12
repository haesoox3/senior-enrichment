import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UpdateCampus extends Component {
  constructor(){
    super();
    this.state = {
      campusId: '',
      name : '',
      imgUrl:'',
      students:[],
      edited : false
    }
    this.handleCampusInformationChange = this.handleCampusInformationChange.bind(this);
    this.handleCampusSelectChange = this.handleCampusSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStudentChange = this.handleStudentChange.bind(this);
    this.handleStudentSubmit = this.handleStudentSubmit.bind(this);
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
    //event.target.value is STUDENT ID
    console.log('selected student', event.target.value);
  }

  handleStudentSubmit(event){

  }

  handleSubmit (evt) {
    evt.preventDefault(); // prevent the page from refreshing
    this.props.editCampus(this.state.campusId, this.state.name, this.state.imgUrl, this.state.students); // pass the input value to the method from Main!
    this.setState({
      name:'',
      imgUrl: '',
      students: [],
      edited:false
    }); // reset the input value to be empty
  }

  render(){
    const campusList = this.props.campuses;
    const studentList = this.state.students;
    console.log('my students list', this.state.students);
    return (
      <div>
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
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
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
            <legend>Students</legend>
            <div>
              {studentList.map((student, idx)=> <div key={idx}><input type="checkbox" id={student.name} value={student.id} onChange={this.handleStudentChange}/><label>{student.name}</label></div>)}
            </div>
            <div>
              <button>Remove Selected Students</button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
};