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

            <div>
            <Link className="btn btn-primary btn-block" to="/new-campus">
              <span className="glyphicon glyphicon-plus"></span> ADD NEW CAMPUS
            </Link>
            </div>
            <div>
            <Link className="btn btn-primary btn-block" to="/new-student">
              <span className="glyphicon glyphicon-plus"></span> ADD NEW STUDENT
            </Link>
            </div>

        </section>
    </sidebar>
  );
}

export default Sidebar;
