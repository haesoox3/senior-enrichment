import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

class Student extends React.Component {

  constructor () {
    super();
    this.state = {
      student: {},
      campus : {},
      contactStudent : false
    };
    this.fetchStudentById = this.fetchStudentById.bind(this);
    this.emailStudent = this.emailStudent.bind(this);
  }

  componentDidMount () {
    const studentId = this.props.match.params.studentId;
    this.fetchStudentById(studentId);
  }

  fetchStudentById (studentId) {
    axios.get(`/api/student/${studentId}`)
    .then(res => res.data)
    .then(student => {
      this.setState({
        student:student
      });
      const campusId = this.state.student.campusId;
      return axios.get(`/api/campus/${campusId}`)
    })
    .then(res => res.data)
    .then(campus => this.setState({campus:campus}));
  }

  emailStudent(){
    this.setState({contactStudent: true});
  }
  
  render () {
    const student = this.state.student;
    return (
      <div>
      <div className="student">
          <h1>{ student.name }</h1>      
          <h3>Student Email: {student.email}</h3>
          <h3>Campus: <Link to={`/campuses/${student.campusId}`}>{this.state.campus.name}</Link></h3>
          <button onClick={this.emailStudent}>Contact {student.name}</button>
          </div>
          {(this.state.contactStudent) ? (
            <div className='well'>
              <fieldset>
                <legend>Contact {student.name}</legend>
                <form>
                  <div className="form-group">
                    <label className="col-xs-2 control-label">Name</label>
                    <div className="col-xs-10">
                      <input className="form-control" type="text" name="name" />
                    </div>
                    <label className="col-xs-2 control-label">Email</label>
                    <div className="col-xs-10">
                      <input className="form-control" type="text" name="email" />
                    </div>
                    <label className="col-xs-2 control-label">Comment</label>
                    <div className="col-xs-10">
                      <textarea type="text" name="content" rows="4" cols="50"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Send"/>
                    <input type="reset" value="Reset"/>
                  </div>
                </form>
              </fieldset>
            </div>) : <div></div>}
      </div>
    );
  }
}

export default Student;