import React from 'react'
import { Route, useHistory } from 'react-router-dom'

export default function ProtectedRoute(props) {

   const history = useHistory();

    if(sessionStorage.getItem("isUserLoggedIn") === "true")
    {



        return (


                    <Route exac path={props.path} component={props.component}></Route>



            )







    }
    else{


            history.push("/applogin")
    
    }



}
