import { NavLink, Outlet } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";

const DashboardMainContainer = ({ children }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {children}
        </Box>
    )
}

const DashboardTopNav = ({ children }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
        }}>
            {children}
        </Box>
    )
}

const DashboardLayout = () => {
    return ( 
        <DashboardMainContainer className="dashboard-main-container">
            <DashboardTopNav className="dashboard-top-nav">
                <div>
                    <Link component={NavLink} to="view_orders" state={{ title: 'Admin Dashboard'}} underline="hover" sx={{textDecoration: 'none'}}>
                        <Typography variant="h5">View Orders</Typography>
                    </Link>
                </div>
                <div className="nav-section">
                    <Link component={NavLink} to="add_products" state={{ title: 'Admin Dashboard'}} underline="hover" sx={{textDecoration: 'none'}}>
                        <Typography variant="h5">Product Management</Typography>
                    </Link>
                </div>
            </DashboardTopNav>

            <Outlet />
        </DashboardMainContainer>
     );
}
 
export default DashboardLayout;