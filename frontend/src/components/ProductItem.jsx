import { Typography, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';

const ProductContainer = () => {
    
    const [open, setOpen] = useState()
    
    return (
        <Box sx={{
            display: 'flex'
        }}>

        </Box>
    )
}
const ProductItem = ({ product }) => {
    return ( 
        <ListItemButton>
            <ListItemIcon>
                <CircleIcon />
            </ListItemIcon>
            <ListItemText primary={product.product_name} />
      </ListItemButton>
        
     );
}
 
export default ProductItem;