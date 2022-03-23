import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./helper";



const Guard = ({Component, ...allProps}) => {
    return (
    <Route
        {...allProps}
        render={(props) =>
          isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
        } />
      );

}

export default Guard;