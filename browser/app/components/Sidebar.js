import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <sidebar>
      <Link to='/home'>
        <img src='VIXX.png' className="logo" />
      </Link>
      <section>
        <h3 className="menu-item">
          <Link to="/home">HOME</Link>
        </h3>
      </section>
      <section>
        <h3 className="menu-item">
          <Link to="/campuses">CAMPUSES</Link>
        </h3>
      </section>
      <section>
        <h3 className="menu-item">
          <Link to="/students">STUDENTS</Link>
        </h3>
      </section>
      <hr />
        <section className='menu-item'>
          <h3>USER OPTIONS</h3>
            <h5>
              <Link className="btn btn-primary btn-block" to="/new-campus">ADD NEW CAMPUS</Link>
            </h5>
            <h5>
              <Link className="btn btn-primary btn-block" to="/new-student">ADD NEW STUDENT</Link>
            </h5>
            <h5>
              <Link className="btn btn-primary btn-block" to="/update-student">UPDATE STUDENT</Link>
            </h5>
            <h5>
              <Link className="btn btn-primary btn-block" to="/update-campus">UPDATE CAMPUS</Link>
            </h5>
            <h5>
              <Link className="btn btn-primary btn-block" to="/delete-student">DELETE STUDENT</Link>
            </h5>
            <h5>            
              <Link className="btn btn-primary btn-block" to="/delete-campus">DELETE CAMPUS</Link>
            </h5>
        </section>
    </sidebar>
  );
}

export default Sidebar;
