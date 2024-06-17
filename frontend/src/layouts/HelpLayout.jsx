import { Link } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";

const HelpLayout = () => {
    return ( 
        <div className="help-layout-container">
            <nav>
                <div className="nav-section">
                    <Link component={NavLink} to="faq"><h3>FAQ</h3></Link>
                </div>
                <div className="nav-section">
                    <Link component={NavLink} to="contact"><h3>Contact</h3></Link>
                </div>
            </nav>

            <Outlet />

        </div>
     );
}
 
export default HelpLayout
