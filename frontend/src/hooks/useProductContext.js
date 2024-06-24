import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const useProductContext = () => {

    const context = useContext(ProductContext)

    if(!context){
        throw Error('cant use useTaskscontext here!')
    }
    return context;
}
 
export default useProductContext;