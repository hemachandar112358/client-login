import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase

      .login({
        email,
        password,
      })
      .catch((err) => {
        alert("wrong email or password");
      });
  };
  render() {
    return (
      <div>
        <div className="card my-5  ">
          <div className="card-header">
            <h3>Login</h3>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group my-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={this.state.passwword}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default firebaseConnect()(Login);
