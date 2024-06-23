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
        
    }, [])

    const handleSubmit = async() => {
        console.log('form submit')
    }

    const handleChange = (e) => {
        setProductCategory(e.target.value)
        console.log('handle change: ', e.target.value)
    }

    const [productCategory, setProductCategory] = useState('Wheels')

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
            <form noValidate autoComplete="off">
                <Box sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <TextField label="Name" variant="outlined" required/>
                    <TextField label="Description" variant="outlined" required rows={3}/>
                    <InputLabel id="select-label">Category</InputLabel>
                    <Select
                        labelId="select-label"
                        id="demo-simple-select"
                        value={productCategory}
                        label="productCategory"
                        onChange={e => handleChange(e)}
                    >
                        <MenuItem value={'Wheels'}>Wheels</MenuItem>
                        <MenuItem value={'Parts'}>Parts</MenuItem>
                        <MenuItem value={'Skates'}>Skates</MenuItem>
                    </Select>
                    <TextField label="Stock" variant="outlined" type="number" required/>
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