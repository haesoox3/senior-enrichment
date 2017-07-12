import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class DeleteStudent extends Component {
  constructor(){
    super();
    this.state = {
    	inputValue : {},
    	edited : false,
    	students : []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentDidMount(){
    axios.get('/api/student')
    .then(res => res.data)
    .then(students => this.setState({ students: students }));
  }

  deleteStudent(studentId){
    axios.delete(`/api/student/${studentId}`)
    .then(res=>res.data);
  }

  handleChange (event) {
    this.setState({
    	edited: true,
    	inputValue: event.target.value
    });
  }

  handleSubmit (evt) {
    evt.preventDefault(); // prevent the page from refreshing
    this.deleteStudent(this.state.inputValue); // pass the input value to the method from Main!
    this.setState({inputValue: {}}); // reset the input value to be empty
  }

  render () {
    const studentList = this.state.students;
    return (
      <div className="well">
        <form className="form-horizontal" noValidate name="studentSelect" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Delete Student</legend>
            <div className="form-group">
              <label htmlFor="campus" className="col-xs-2 control-label">Student</label>
              <div className="col-xs-10">
                <select className="form-control" name="student" value={this.state.inputValue} onChange={this.handleChange}>
                  <option>-</option>
                  {studentList.map((student, idx) => (<option value={student.id} key={`${idx}`}>{student.name}</option>))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Delete Student</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
};