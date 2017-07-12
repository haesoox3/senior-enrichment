import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <sidebar>
      <img src='VIXX.png' className="logo" />
      <section>
        <h4 className="menu-item">
          <Link to="/home">HOME</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/campuses">CAMPUSES</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/students">STUDENTS</Link>
        </h4>
      </section>
      <hr />
        <section>
          <h4 className="text-muted">USER OPTIONS</h4>
          <h4>
            <Link className="btn btn-primary btn-block" to="/new-campus">
              <span className="glyphicon glyphicon-plus"></span> ADD NEW CAMPUS
            </Link>
          </h4>
            <Link className="btn btn-primary btn-block" to="/new-student">
              <span className="glyphicon glyphicon-plus"></span> ADD NEW STUDENT
            </Link>
            <Link className="btn btn-primary btn-block" to="/delete-student">
              <span className="glyphicon glyphicon-plus"></span> DELETE STUDENT
            </Link>
            <Link className="btn btn-primary btn-block" to="/delete-campus">
              <span className="glyphicon glyphicon-plus"></span> DELETE CAMPUS
            </Link>
            <Link className="btn btn-primary btn-block" to="/update-student">
              <span className="glyphicon glyphicon-plus"></span> UPDATE STUDENT
            </Link>
            <Link className="btn btn-primary btn-block" to="/update-campus">
              <span className="glyphicon glyphicon-plus"></span> UPDATE CAMPUS
            </Link>
        </section>
    </sidebar>
  );
}

export default Sidebar;
