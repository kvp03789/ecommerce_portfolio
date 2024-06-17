import { Box, Container, Typography, styled} from '@mui/material'

const DashboardContainer = styled('div')(
    ({ theme }) => `
        background-color: 
    `
)

const AdminDashboard = () => {


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