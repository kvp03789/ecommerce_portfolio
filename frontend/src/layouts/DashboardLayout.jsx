import { NavLink, Outlet } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";

const MainContainer = ({ children }) => {
    return (
        <Box sx={{
            backgroundColor: 'grey.400'
        }}>
            {children}
        </Box>
    )
}

const SubContainer = ({ children }) => {
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
        <MainContainer>
            <SubContainer>
                <div>
                    <Link component={NavLink} to="view_orders" state={{ title: 'Admin Dashboard'}} sx={{textDecoration: 'none'}}>
                        <Typography variant="h5">View Orders</Typography>
                    </Link>
                </div>
                <div className="nav-section">
                    <Link component={NavLink} to="add_products" state={{ title: 'Admin Dashboard'}} sx={{textDecoration: 'none'}}>
                        <Typography variant="h5">Product Management</Typography>
                    </Link>
                </div>
            </SubContainer>
            <Outlet />
        </MainContainer>
     );
}
 
export default DashboardLayout;