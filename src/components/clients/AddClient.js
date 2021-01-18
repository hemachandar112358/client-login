import React from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends React.Component {
  constructor() {
    super();

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeBalance = this.onChangeBalance.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    Name: "",
    balance: "",
    email: "",
  };

  onChangeName = (e) => this.setState({ Name: e.target.value });

  onChangeBalance = (e) => this.setState({ balance: e.target.value });

  onChangeEmail = (e) => this.setState({ email: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const { firestore, history } = this.props;

    const newClient = this.state;

    if (this.state.balance === "") {
      this.setState({
        balance: "0",
      });
    }

    firestore.add({ collection: "clients" }, newClient).then(history.push("/"));
  };
  render() {
    return (
      <div>
        <div className="row my-3">
          <div className="col-md-3 ">
            <Link to="/">
              <button className="btn btn-primary">
                <i className="fas fa-arrow-circle-left"></i>Go to Dashboard
              </button>
            </Link>
          </div>
        </div>

        <div className="card">
          <h5 className="card-header  ">Add Client</h5>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group row">
                <label htmlFor="name">
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  minLength="1"
                  placeholder="Enter Name"
                  required
                  onChange={this.onChangeName}
                  value={this.state.name}
                />
              </div>
              <div className="form-group row">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  required
                  onChange={this.onChangeEmail}
                  value={this.state.email}
                />
              </div>
              <div className="form-group row">
                <label htmlFor="balance">
                  <strong>Balance</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="balance"
                  placeholder="Enter Balance"
                  required
                  onChange={this.onChangeBalance}
                  value={this.state.balance}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(AddClient);
