import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewStudent extends Component {
  constructor(){
    super();
    this.state = {
      name : '',
      email : '',
      campus : '',
      edited : false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({
      [event.target.name] : event.target.value,
      edited : true
    });
  }

  handleSubmit (evt) {
    evt.preventDefault(); // prevent the page from refreshing
    this.props.addStudent(this.state.name, this.state.email, this.state.campus); // pass the input value to the method from Main!
    this.setState({
      name:'',
      email: '',
      campus: '',
      edited:false
    });
  }

  render(){
    const campusList = this.props.campuses;
    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Student</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                {(this.state.edited && (this.state.name.length > 16 || this.state.name.length < 1)) ? <div className="alert alert-warning">Please enter a name</div> : <div/>}              
              </div>
              <label className="col-xs-2 control-label">Email</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                {(this.state.edited && (this.state.email.length > 16 || this.state.email.length < 1)) ? <div className="alert alert-warning">Please enter a valid email address</div> : <div/>}              
              </div>
              <label className="col-xs-2 control-label">Campus</label>
              <div className="col-xs-10">
                <select className="form-control" name="campus" value={this.state.campus} onChange={this.handleChange}>
                  <option>-</option>
                  {campusList.map((campus, idx) => (<option value={campus.id} key={`${idx}`}>{campus.name}</option>))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={this.state.email.length > 16 || this.state.email.length < 1}>Create Student</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
};