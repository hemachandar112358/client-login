import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <Link to="/client/add" className="btn btn-info btn-md">
        <i className="fas fa-plus"></i> Add Client
      </Link>
    </div>
  );
};

export default Sidebar;
