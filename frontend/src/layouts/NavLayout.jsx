import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Drawer, IconButton, Link, Box, AppBar, Toolbar, Icon, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 200

const NavSectionBox = ({ children }) => {
    return (
        <Box sx={{}}>
            { children }
        </Box>
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
    const { state } = useLocation()

    useEffect(() => {
        console.log('location object: ', state)
    }, [])

    return ( 
        <Box sx={{
            backgroundColor: 'grey.900'
        }}>
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
            <Drawer variant="persistent" open={open} sx={{
                        width: drawerWidth
                    }}>
                <DrawerHeader>
                    <IconButton onClick={e => setOpen(!open)}>
                        <ArrowBackIcon/>
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <DrawerBody>
                    <NavSectionBox>
                        <Link component={NavLink} underline="none" to="/" state={{ title: 'Home'}}  sx={{'&hover:': {color: 'grey'}}}>
                            <Typography variant="h3" >Home</Typography>
                        </Link>
                    </NavSectionBox>
                    <NavSectionBox>
                        <Link component={NavLink} underline="none" to="/products" state={{ title: 'Products'}} sx={{'&hover:': {color: 'grey'}}}>
                            <Typography variant="h3" >Products</Typography>
                        </Link>
                    </NavSectionBox>
                    <NavSectionBox>
                        <Link component={NavLink} underline="none" to="/admin_dashboard" state={{ title: 'Admin Dashboard'}} sx={{'&hover:': {color: 'grey'}}}>
                            <Typography variant="h3" >Dashboard</Typography>
                        </Link>
                    </NavSectionBox>
                    <NavSectionBox>
                        <Link component={NavLink} underline="none" to="/help" state={{ title: 'Help'}} sx={{'&hover:': {color: 'grey'}}}>
                            <Typography variant="h3" >Help</Typography>
                        </Link>
                    </NavSectionBox>
                </DrawerBody>
            </Drawer>
            
            <Outlet />
            
        </Box>
     );
}
 
export default NavLayout;