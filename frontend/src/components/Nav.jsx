import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

const Nav = () => {
    return ( 
        <div className="nav-container">
            <div className="nav-section">
                <Link component={NavLink} to="/"><h3>Home</h3></Link>
            </div>
            <div className="nav-section">
                <Link component={NavLink} to="/products"><h3>Products</h3></Link>
            </div>
            <div className="nav-section">
                <Link component={NavLink} to="/admin_dashboard"><h3>Dashboard</h3></Link>
            </div>
        </div>
     );

}
 
export default Nav;