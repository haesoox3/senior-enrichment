import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UpdateCampus extends Component {
  constructor(){
    super();
    this.state = {
      name : '',
      imgUrl: '',
      students:[],
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
      imgUrl: '',
      students: [],
      edited:false
    }); // reset the input value to be empty
  }

  render(){
    const campusList = this.props.campuses;
    return (
      <div>
        <fieldset>
          <legend>Choose a Campus</legend>
          <div className="form-group">
            <label htmlFor="campus" className="col-xs-2 control-label">Student</label>
            <div className="col-xs-10">
              <select className="form-control" name="campus">
                <option>-</option>
                {campusList.map((campus, idx) => (<option value={campus.id} key={`${idx}`}>{campus.name}</option>))}
              </select>
            </div>
          </div>
        </fieldset>
        <form className="form-horizontal">
        <fieldset>
          <legend>Campus Information</legend>
          <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" name="name" value={this.state.name}/>
              </div>
              <label className="col-xs-2 control-label">Image</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" name="image" value={this.state.imgUrl}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Edit Campus</button>
              </div>
            </div>
        </fieldset>
        </form>
      </div>
    );
  }
};