import { Typography } from "@mui/material";

const ProductItem = ({ product }) => {
    return ( 
        <Typography variant="p">
            {product.product_name}
        </Typography>
     );
}
 
export default ProductItem;