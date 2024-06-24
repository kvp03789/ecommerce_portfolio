import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { Box, Button, TextField, Select, InputLabel, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

const AddProductContainer = ({ children }) => {
    return(
        <Box 
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '2rem'
        }}
        className="add-product-container">
            {children}
        </Box>
    )
}

const Section = ({children}) => {
    return(
        <Box sx={{
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
        }}>
            {children}
        </Box>
    )
}

const AddProductForm = () => {

    const [productList, setProductList] = useState([])
    const [error, setError] = useState(null)
    
    const [productCategory, setProductCategory] = useState('Wheels and Parts')
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productStock, setProductStock] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productImageUrl, setProductImageUrl] = useState('')

    useEffect(()=> {
        setError(null)
        async function getProducts(){
            try {
                    const response = await fetch('http://localhost:3000/admin/products')
                    const json = await response.json()

                    if(!response.ok){
                        setError({message: 'There was an error getting product list'})
                    }
                    else{
                        setProductList(json.result)
                    }
                }
            catch(err){
                setError({message: err.message})
            }
        }

        getProducts()
        console.log('product list', productList)
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const newProduct = {
            productName, productDescription, productCategory, productPrice, productStock, productImageUrl: 'null image url'
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...newProduct})
        }
        const response = await fetch('http://localhost:3000/admin/products', options)
        const json = await response.json()
        if(!response.ok){
            setError({message: json.message})
        }
        else{
            //reset form
            document.querySelector('.new-product-form').reset()
            console.log('form submit, heres the JSON: ', json )
        }
        
        
    }

    return (
        <AddProductContainer>
            <Section>
                <Typography variant="h3">
                    Product Management
                </Typography>
            </Section>
            <Section>
                <Typography variant="h5">
                    Add Product
                </Typography>
            </Section>
            <form noValidate autoComplete="off" className="new-product-form">
                <Box sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <TextField label="Name" variant="outlined" required onChange={e => setProductName(e.target.value)}/>
                    <TextField label="Description" variant="outlined" required rows={3} onChange={e => setProductDescription(e.target.value)}/>
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
                    <TextField label="Stock" variant="outlined" type="number" required onChange={e => setProductStock(e.target.value)}/>
                    <TextField label="Price" variant="outlined" type="number" required onChange={e => setProductPrice(e.target.value)}/>
                    <Button 
                        onClick={e => handleSubmit(e)}
                        type="submit"
                        color="primary"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Box>
            </form>

            <Section>
                <Typography variant="h5">
                    Product List
                </Typography>
            </Section>
            <Section>
                {error &&
                <Typography variant="p">
                    {error.message}
                </Typography>
            }
            </Section>

        </AddProductContainer>
     );
}
 

export default AddProductForm;