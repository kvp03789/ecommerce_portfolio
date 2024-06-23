import { useOutletContext } from "react-router-dom";
import { Box, Container, Typography, styled} from '@mui/material'
import { useEffect } from "react";

const DashboardContainer = styled('div')(
    ({ theme }) => `
        background-color: 
    `
)

const AdminDashboard = () => {

    const drawerOpen = useOutletContext()

    useEffect(() => {
        
        console.log('changed open: ', drawerOpen)
    }, [drawerOpen])

    return ( 
        <Box sx={{
            backgroundColor: 'grey.400',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row'}
        }}>
            
        </Box>
            
        
     );
}
 
export default AdminDashboard;