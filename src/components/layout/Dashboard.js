import Sidebar from "./Sidebar";
import Client from "../clients/Client";

const Dashboard = () => {
  return (
    <div className="row my-2">
      <div className="col-md-10">
        <Client />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
