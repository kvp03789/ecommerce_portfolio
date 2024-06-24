import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Drawer, IconButton, Link, Box, AppBar, Toolbar, Icon, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 150



const NavSection = ({ children }) => {
    return (
        <div>
            { children }
        </div>
    )
}

const DrawerHeader = ({ children }) => {
    return(
        <Box sx={{
            display: 'flex'
        }}>
            {children}
        </Box>
    )
}

const DrawerBody = ({ children }) => {
    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {children}
        </Box>
    )
}

const NavLayout = () => {

    const [open, setOpen] = useState(false)
    const location = useLocation();
    const state = location.state || {}
    

    return ( 
        <div className="main-container">
            <AppBar position="static">
                <Toolbar sx={{
                    backgroundColor: 'grey.900',
                    display: 'flex',
                    justifyContent: 'space-between'
                    }}>
                    <IconButton onClick={e => setOpen(!open)}>
                        <MenuIcon sx={{color: 'white'}}/>
                    </IconButton>
                    <Typography variant='h3'>{state.title ? state.title : 'Home'}</Typography>
                </Toolbar>
            </AppBar>
            <Drawer className={`drawer`}open={open} sx={{
            display: 'flex',
            flexDirection: 'column',
            width: drawerWidth
        }}>
                <NavSection>
                    <IconButton onClick={e => setOpen(!open)}>
                        <ArrowBackIcon sx={{}}/>
                    </IconButton> 
                </NavSection>
                <NavSection>
                    <Link component={NavLink} underline="none" to="/" state={{ title: 'Home'}}  sx={{'&hover:': {color: 'grey'}}}>
                        <Typography variant="h5" >Home</Typography>
                    </Link>
                </NavSection>
                <NavSection>
                    <Link component={NavLink} underline="none" to="/products" state={{ title: 'Products'}} sx={{'&hover:': {color: 'grey'}}}>
                        <Typography variant="h5" >Products</Typography>
                    </Link>
                </NavSection>
                <NavSection>
                    <Link component={NavLink} underline="none" to="/admin_dashboard" state={{ title: 'Admin Dashboard'}} sx={{'&hover:': {color: 'grey'}}}>
                        <Typography variant="h5" >Dashboard</Typography>
                    </Link>
                </NavSection>
                <NavSection>
                    <Link component={NavLink} underline="none" to="/help" state={{ title: 'Help'}} sx={{'&hover:': {color: 'grey'}}}>
                        <Typography variant="h5" >Help</Typography>
                    </Link>
                </NavSection>
            </Drawer>
            
            <Outlet />
            
        </div>
     );
}
 
export default NavLayout;