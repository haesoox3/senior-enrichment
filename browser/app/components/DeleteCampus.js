import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Campuses from './Campuses';

export default class DeleteCampus extends Component {
  constructor(){
    super();
    this.state = {
    	inputValue : {},
    	edited : false,
    	campuses : []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteCampus = this.deleteCampus.bind(this);
  }

  componentDidMount(){
    axios.get('/api/campus')
    .then(res => res.data)
    .then(campuses => this.setState({ campuses: campuses }));
  }

  deleteCampus(campusId){
    axios.delete(`/api/campus/${campusId}`)
    .then(res=>res.data)
  }

  handleChange (event) {
    this.setState({
    	edited: true,
    	inputValue: event.target.value
    });
  }

  handleSubmit (evt) {
    evt.preventDefault(); // prevent the page from refreshing
    this.deleteCampus(this.state.inputValue); // pass the input value to the method from Main!
    this.setState({inputValue: {}}); // reset the input value to be empty
  }

  render () {
    const campusList = this.state.campuses;
    return (
      <div>
        <div className="well">
          <form className="form-horizontal" noValidate name="campusSelect" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Delete Campus</legend>
              <div className="form-group">
                <label htmlFor="campus" className="col-xs-2 control-label">Campus</label>
                <div className="col-xs-10">
                  <select className="form-control" name="campus" value={this.state.inputValue} onChange={this.handleChange}>
                    <option>-</option>
                    {campusList.map((campus, idx) => (<option value={campus.id} key={`${idx}`}>{campus.name}</option>))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-10 col-xs-offset-2">
                  <button type="submit" className="btn btn-success">Delete Campus</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <Campuses campuses={campusList}/>
      </div>
    );
  }
};