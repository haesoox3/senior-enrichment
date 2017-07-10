import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewCampus extends Component {
  constructor(){
    super();
    this.state = {
      inputValue : '',
      edited : false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({
      inputValue : event.target.value,
      edited : true
    });
  }

  handleSubmit (evt) {
    evt.preventDefault(); // prevent the page from refreshing
    this.props.addCampus(this.state.inputValue); // pass the input value to the method from Main!
    this.setState({inputValue: ''}); // reset the input value to be empty
  }

  render(){
    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Campus</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" name="campus" value={this.state.inputValue} onChange={this.handleChange}/>
                {(this.state.edited && (this.state.inputValue.length > 16 || this.state.inputValue.length < 1)) ? <div className="alert alert-warning">Please enter a name</div> : <div/>}              
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={this.state.inputValue.length > 16 || this.state.inputValue.length < 1}>Create Campus</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
};