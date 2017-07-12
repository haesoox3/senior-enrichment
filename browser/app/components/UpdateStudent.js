import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UpdateStudent extends Component {
  constructor(){
    super();
    this.state = {
      studentId : '',
      name: '',
      email: '',
      campus: '',
      edited: false
    }
    this.handleStudentSelectChange = this.handleStudentSelectChange.bind(this);
    this.handleStudentInfoChange = this.handleStudentInfoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStudentSelectChange (event) {
    const studentId = event.target.value;
    axios.get(`/api/student/${studentId}`)
    .then(res => res.data)
    .then(student => this.setState({ studentId: student.id, name: student.name, email: student.email }));
  }

  handleStudentInfoChange (event) {
    this.setState({
      [event.target.name] : event.target.value,
      edited : true
    });
  }

  handleSubmit (evt) {
    evt.preventDefault(); // prevent the page from refreshing
    this.props.editStudent(this.state.studentId, this.state.name, this.state.email, this.state.campus); // pass the input value to the method from Main!
    this.setState({
      name: '',
      email: '',
      campus: '',
      edited: false
    });
  }

  render(){
    const students = this.props.students;
    const campusList = this.props.campuses;
    return (
      <div>
        <fieldset>
          <legend>Choose a Student</legend>
          <div className="form-group">
            <label htmlFor="campus" className="col-xs-2 control-label">Student</label>
            <div className="col-xs-10">
              <select className="form-control" name="student" onChange={this.handleStudentSelectChange}>
                <option>-</option>
                {students.map((student, idx) => (<option value={student.id} key={`${idx}`}>{student.name}</option>))}
              </select>
            </div>
          </div>
        </fieldset>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Student Information</legend>
          <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleStudentInfoChange}/>
              </div>
              <label className="col-xs-2 control-label">Email</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleStudentInfoChange}/>
              </div>
              <label className="col-xs-2 control-label">Campus</label>
              <div className="col-xs-10">
                <select className="form-control" name="campus" value={this.state.campus} onChange={this.handleStudentInfoChange}>
                  <option>-</option>
                    {campusList.map((campus, idx) => (<option value={campus.id} key={`${idx}`}>{campus.name}</option>))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Edit Student</button>
              </div>
            </div>
        </fieldset>
        </form>
      </div>
    );
  }
};