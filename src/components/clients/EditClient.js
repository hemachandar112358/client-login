import React, { createRef } from "react";
import { compose } from "redux";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class EditClient extends React.Component {
  constructor(props) {
    super(props);
    this.balanceInput = createRef();
    this.nameInput = createRef();
    this.emailInput = createRef();
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { client, firestore, history } = this.props;
    const updatedClient = {
      Name: this.nameInput.current.value,
      balance:
        this.nameInput.current.value === ""
          ? 0
          : this.balanceInput.current.value,
      email: this.emailInput.current.value,
    };

    firestore
      .update({ collection: "clients", doc: client.id }, updatedClient)
      .then(history.push("/"));
  };
  render() {
    const { client } = this.props;

    return (
      <div>
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
              ref={this.nameInput}
              defaultValue={client.Name}
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
              ref={this.emailInput}
              defaultValue={client.email}
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
              ref={this.balanceInput}
              defaultValue={client.balance}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Update
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  client: state.firestore.ordered.client && state.firestore.ordered.client[0],
});

export default compose(
  firestoreConnect((props) => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id },
  ]),
  connect(mapStateToProps)
)(EditClient);
