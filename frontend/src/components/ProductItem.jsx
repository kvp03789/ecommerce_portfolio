import { List, Collapse, Typography, ListItemButton, ListItemIcon, ListItemText, TextField, InputLabel, Select, MenuItem, Button, Box } from "@mui/material";
import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useEditProduct from "../hooks/useEditProduct";
import useDeleteProduct from "../hooks/useDeleteProduct";

const FormContainer = ({ children }) => {
    <Box sx={{
        
    }}>
        {children}
    </Box>
}

const ProductItem = ({ product }) => {

    const [productCategory, setProductCategory] = useState(product.product_category)
    const [productName, setProductName] = useState(product.product_name)
    const [productDescription, setProductDescription] = useState(product.product_description)
    const [productStock, setProductStock] = useState(product.product_stock)
    const [productPrice, setProductPrice] = useState(product.product_price)
    const [productImageUrl, setProductImageUrl] = useState(product.product_image_url)
    
    const [open, setOpen] = useState(false)
    const { editProductError, editProduct } = useEditProduct()
    const { deleteProductError, deleteProduct } = useDeleteProduct()

    const handleClick = (e) => {
        if(e.target.tagName == "DIV" || e.target.tagName == "SPAN" || e.target.tagName == "svg"){
            setOpen(!open)
        }
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const productToBeEdited = {
            productId: product.product_id, productName, productDescription, productCategory, productPrice, productStock, productImageUrl: 'null image url'
        }
        try{
            editProduct(productToBeEdited)
            setOpen(false)
        }
        catch(err){
            setOpen(true)
        }
    }

    const handleDeleteProduct = (e) => {
        e.preventDefault()
        
        try{
            deleteProduct(product.product_id)
            setOpen(false)
        }
        catch(err){
            setOpen(true)
        }
    }
    
    return ( 
        
        <ListItemButton 
            onClick={(e) => {handleClick(e)}}
            sx={{
                width: '800px'
            }} 
        >
            <ListItemIcon>
                <CircleIcon />
            </ListItemIcon>

            <ListItemText primary={product.product_name} />
            
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{display: 'flex', flexDirection: 'column'}}>
                    <ListItemText primary="Edit Product" />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <List component="div" disablePadding sx={{display: 'flex'}}>
                            <TextField value={productName} variant="outlined" required onChange={e => setProductName(e.target.value)}/>
                            <TextField value={productDescription} variant="outlined" required rows={3} onChange={e => setProductDescription(e.target.value)}/>
                            <InputLabel id="select-label">Category</InputLabel>
                            <Select
                                labelId="select-label"
                                id="demo-simple-select"
                                value={productCategory}
                                label="productCategory"
                                onChange={e => setProductCategory(e.target.value)}
                            >
                                <MenuItem value={'Skates'}>Skates</MenuItem>
                                <MenuItem value={'Wheels and Parts'}>Wheels and Parts</MenuItem>
                                <MenuItem value={'Apparel'}>Apparel</MenuItem>
                                <MenuItem value={'Protective'}>Protective</MenuItem>
                            </Select>
                        </List>
                    </Box>
                    
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <List component="div" disablePadding sx={{display: 'flex'}}>
                            <TextField value={productStock} variant="outlined" type="number" required onChange={e => setProductStock(e.target.value)}/>
                            <TextField value={productPrice} variant="outlined" type="number" required onChange={e => setProductPrice(e.target.value)}/>
                            <Button 
                                onClick={e => handleEditSubmit(e)}
                                type="submit"
                                color="primary"
                                variant="contained"
                            >
                                Submit
                            </Button> 
                            <Button 
                                onClick={e => handleDeleteProduct(e)}
                                sx={{backgroundColor: 'red'}}
                                variant="contained"
                            >
                                Delete
                            </Button>  
                        </List>
                    </Box>
                </List>
            </Collapse>
            {open ? <ExpandLess /> : <ExpandMore />}
        {editProductError && <Typography sx={{color: 'red'}}>{editProductError.message}</Typography>}
    </ListItemButton>
     );
}
 
export default ProductItem;