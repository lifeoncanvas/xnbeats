import React from 'react';
import {Link} from 'react-router-dom';

const DashLayout = (props) => {

	const {user} = props.auth;


	return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard/profile">
                  My profile
                </Link>
              </li>
            </ul>

            { user.role === 2 ? 
          <>
            <hr/>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard/reviews">
                  Reviews
                </Link>
              </li>
            </ul>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard/messages">
                  Messages
                </Link>
              </li>
            </ul>
          </>
          :
          null}
          </div>
        </nav>

        <main role="main" className="col-md-10 col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">{props.title}</h1>
            <div className="btn-toolbar mb-2 mb-md-0 admin_name_btn">
              Hello {user.name} {user.lastname}
            </div>
          </div>
          {props.children}
        </main>
      </div>
    </div>
  );
}
export default DashLayout;