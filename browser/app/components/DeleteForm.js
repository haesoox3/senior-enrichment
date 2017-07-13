import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DeleteForm = (props) => {
	const type = props.type;
  return (
      <div>
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
        <Students students={studentList} />
      </div>
    );
};

export default DeleteForm;