import { NavLink } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="404-container">
            <p>oh no! page not found!! click to go <NavLink to="/">home</NavLink></p>
        </div>
     );
}
 
export default NotFound;