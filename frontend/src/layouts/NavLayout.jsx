import { NavLink, Outlet } from "react-router-dom";
import { Link } from "@mui/material";

const NavLayout = () => {
    return ( 
        <div className="nav-layout-container">
            <nav>
                <div className="nav-section">
                    <Link component={NavLink} to="/"><h3>Home</h3></Link>
                </div>
                <div className="nav-section">
                    <Link component={NavLink} to="/products"><h3>Products</h3></Link>
                </div>
                <div className="nav-section">
                    <Link component={NavLink} to="/admin_dashboard"><h3>Dashboard</h3></Link>
                </div>
                <div className="nav-section">
                    <Link component={NavLink} to="/help"><h3>Help</h3></Link>
                </div>
            </nav>

            
            <Outlet />
            
        </div>
     );
}
 
export default NavLayout;