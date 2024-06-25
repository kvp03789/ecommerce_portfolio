import { useState } from "react"
import useProductContext from "./useProductContext"

const useEditProduct = () => {

    const { dispatch } = useProductContext()
    const [editProductError, setEditProductError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const editProduct = async (productToBeEdited) => {
        setEditProductError(null)
        setIsLoading(true)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...productToBeEdited})
        }
        const response = await fetch('http://localhost:3000/admin/products', options)
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setEditProductError({message: json.message})
        }
        else{
            setIsLoading(false)
            //update local state
            dispatch({type: 'EDIT_PRODUCT', payload: json.result})
            //reset form
            document.querySelector('.new-product-form').reset()
            console.log('edit product form submitted, heres the JSON: ', json )
        }
    }
    
    return {
        editProductError, isLoading, editProduct
    }
}
 
export default useEditProduct;