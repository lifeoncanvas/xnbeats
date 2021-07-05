import React from 'react';
import {Link} from 'react-router-dom';

const Footer = props => {
  return (
    <>
      <footer className="pt-4  pt-md-5 border-top">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md">
              XNB
                <small className="d-block mb-3 text-muted">© 2017-2020</small>
            </div>
            <div className="col-6 col-md">
              <h5>Navigate</h5>
              <ul className="list-unstyled text-small">
                <li><Link className="text-muted" to="#">Home</Link></li>
                <li><Link className="text-muted" to="#">Reviews</Link></li>
                <li><Link className="text-muted" to="#">Music</Link></li>
                <li><Link className="text-muted" to="#">Shop</Link></li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Free stuff</h5>
              <ul className="list-unstyled text-small">
                <li><Link className="text-muted" to="#">Templates</Link></li>
                <li><Link className="text-muted" to="#">Tracks</Link></li>
                <li><Link className="text-muted" to="#">Serum</Link></li>
                <li><Link className="text-muted" to="#">Sylenth</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md">
              <h5>About</h5>
              <ul className="list-unstyled text-small">
                <li><Link className="text-muted" to="#">Contact</Link></li>
                <li><Link className="text-muted" to="#">Privacy</Link></li>
                <li><Link className="text-muted" to="#">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
