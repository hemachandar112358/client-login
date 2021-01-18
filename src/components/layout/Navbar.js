import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Bank from "./bank.png";

class Navbar extends React.Component {
  state = {
    isAuthenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    console.log(auth);

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = () => {
    const { firebase } = this.props;

    firebase.logout();
  };
  render() {
    const { isAuthenticated } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img
              src={Bank}
              alt="Bank"
              style={{ width: "20px", height: "20px" }}
            />
            Balance Check
          </Link>

          <div className="navbar-nav ml-auto">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard <span className="sr-only">(current)</span>
                  </Link>
                </li>
              ) : null}
            </ul>
            <ul className="navbar-nav ml-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <a className="nav-link" onClick={this.onLogoutClick}>
                    Logout <span className="sr-only">(current)</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
  }))
)(Navbar);
