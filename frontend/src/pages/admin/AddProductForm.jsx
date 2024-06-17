import { Box, Button, TextField, Select, InputLabel, MenuItem } from "@mui/material";
import { useState } from "react";

const AddProductForm = () => {

    const handleSubmit = async() => {
        console.log('form submit')
    }

    const handleChange = (e) => {
        setProductCategory(e.target.value)
        console.log('handle change: ', e.target.value)
    }

    const [productCategory, setProductCategory] = useState('Wheels')

    return ( 
        
        <form noValidate autoComplete="off">
            <Box sx={{
                backgroundColor: 'white'
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
        
     );
}
 

export default AddProductForm;