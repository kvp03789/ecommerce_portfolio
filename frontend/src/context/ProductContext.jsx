import { createContext, useEffect, useReducer } from "react";

export const ProductContext = createContext()

export const productReducer = (state, action) => {
    switch(action.type){
        case 'SET_PRODUCT_LIST':
            return [...action.payload]
        case 'ADD_ONE_PRODUCT':
            return [...state, action.payload]
        
            default:
                return state
    }
}

export const ProductContextProvider = ({ children }) => {

    const [productState, dispatch] = useReducer(productReducer, [] )

    useEffect(() => {
        //fetch initial products list on mount
        async function fetchAllProducts(){
            const response = await fetch('http://localhost:3000/admin/products')
            const json = await response.json()
            if(!response.ok){
                console.error('error fetching initial products list')
            }
            else{
                console.log('iniitial product list set, heres the json: ', json)
                dispatch({type: 'SET_PRODUCT_LIST', payload: json.result})
            }
        }

        fetchAllProducts()
    }, [])
    
    return(
            <ProductContext.Provider value={{productState, dispatch}}>
                {children}
            </ProductContext.Provider>
    )
}