import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
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
          <h4 className="text-muted">PLAYLISTS</h4>
          <h4>
            <Link className="btn btn-primary btn-block" to="/new-campus">
              <span className="glyphicon glyphicon-plus"></span> ADD NEW CAMPUS
            </Link>
            <Link className="btn btn-primary btn-block" to="/new-student">
              <span className="glyphicon glyphicon-plus"></span> ADD NEW STUDENT
            </Link>
          </h4>
        </section>
    </sidebar>
  );
}

export default Sidebar;
