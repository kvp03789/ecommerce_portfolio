import { useState } from "react";
import useProductContext from "./useProductContext"

const useDeleteProduct = () => {
    
    const { dispatch } = useProductContext()
    const [productError, setProductError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const deleteProduct = async (productId) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`http://localhost:3000/admin/products/${productId}`, options)
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError({message: json.message})
        }
        else{
            setIsLoading(false)
            //update local state
            dispatch({type: 'DELETE_PRODUCT', payload: json.result})
            //reset form
            console.log('delete product form submitted, heres the JSON: ', json )
        }
    }

    return { deleteProduct }
}

export default useDeleteProduct