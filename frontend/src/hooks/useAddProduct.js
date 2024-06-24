import { useState } from "react"
import useProductContext from "./useProductContext"

const useAddProduct = () => {

    const { dispatch } = useProductContext()
    const [productError, setProductError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const addProduct = async (newProduct) => {
        setProductError(null)
        setIsLoading(true)
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
            setIsLoading(false)
            setError({message: json.message})
        }
        else{
            setIsLoading(false)
            //update local state
            dispatch({type: 'ADD_ONE_PRODUCT', payload: json.result})
            //reset form
            document.querySelector('.new-product-form').reset()
            console.log('add new product form submitted, heres the JSON: ', json )
        }
    }
    
    return {
        productError, isLoading, addProduct
    }
}
 
export default useAddProduct;