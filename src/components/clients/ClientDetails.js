import { compose } from "redux";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import loading from "./loading.gif";

class ClientDetails extends React.Component {
  state = {
    balanceEditClick: false,
    updatedBalanceAmount: "",
  };

  // Delete Client
  onDeleteClick = () => {
    const { firestore, client, history } = this.props;

    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-3 my-3">
              <Link to="/">
                <button className="btn btn-primary">
                  <i className="fas fa-arrow-circle-left"></i>Go to Dashboard
                </button>
              </Link>
            </div>
            <div className="col-md-9 my-3">
              <Link to={`/client/edit/${client.id}`}>
                <button className="btn btn-info pull-right">Edit</button>
              </Link>

              <button
                className="btn btn-danger mx-2 pull-right"
                onClick={this.onDeleteClick}
              >
                Delete
              </button>
            </div>
            <div className="col-md-6"></div>
          </div>

          <div className="col-md-8">
            <div className="card ">
              <div className="card-header ">
                <h3 className="float-left">{client.Name}</h3>
                <span className="float-right">
                  <h5>
                    Balance: {client.balance}{" "}
                    {/* <i
                      className="fas fa-edit"
                      onClick={() => {
                        this.setState({
                          balanceEditClick: !this.state.balanceEditClick,
                        });
                      }}
                    ></i> */}
                  </h5>
                </span>
              </div>
              <div className="card-body">
                <span className="pull-right">
                  <h5>
                    Client ID:{"    "}
                    {client.id}
                  </h5>
                </span>
                <ul className="list-group list-group-flush ">
                  <li className="list-group-item pull-left">
                    Email: {client.email}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <img src={loading} alt="Loading..."></img>
        </div>
      );
    }
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
)(ClientDetails);
