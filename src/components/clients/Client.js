import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import loading from "./loading.gif";

class Client extends React.Component {
  state = {
    totalOwed: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      let sum = 0;
      clients.forEach((client) => {
        sum = sum + parseFloat(client.balance.toString());
      });
      return { totalOwed: sum };
    }
    return null;
  }

  render() {
    const { clients } = this.props;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-3 float-left">
              <h4>
                <i className="fas fa-users" />
                Clients
              </h4>
            </div>
            <div className="col-md-6">
              <h5 className="float-right">
                Balance Owed : <i className="fas fa-rupee-sign"></i>
                {parseFloat(this.state.totalOwed).toFixed(2)}
              </h5>
            </div>
            <table className="table ">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Balance</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => {
                  return (
                    <tr key={client.id}>
                      <td>{client.Name}</td>
                      <td>{client.email}</td>
                      <td>
                        <i className="fas fa-rupee-sign"></i>
                        {parseFloat(client.balance).toFixed(2)}
                      </td>
                      <td>
                        <Link
                          className="btn btn-secondary btn-sm"
                          to={`/client/${client.id}`}
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

const mapStateToProps = (state) => ({
  clients: state.firestore.ordered.clients,
});

export default compose(
  firestoreConnect(() => ["clients"]),
  connect(mapStateToProps)
)(Client);
