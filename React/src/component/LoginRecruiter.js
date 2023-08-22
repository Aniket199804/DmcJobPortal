import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function LoginRecruiter(props) {
    const [input,setInput] = useState({email:"",password:""})
    const history = useHistory();

    let TextChanged = (event)=>{

        var copyofInput = {...input};
        copyofInput[event.target.name]= event.target.value;
        setInput(copyofInput);

    }


    let login = ()=>{


        axios.post("http://localhost:4001/recruiter/login",input).then((res)=>{

        

           if(res.data.status === "success")
           {
            
                sessionStorage.setItem("isUserLoggedIn","true");
                sessionStorage.setItem("loggedInUser","recruiter");
                sessionStorage.setItem("company",res.data.data[0].company_name)
                sessionStorage.setItem("recruiterId",res.data.data[0].recruiter_id)
                props.setState(" ");
                history.push("/recruiterhome")
            
             

           }


        })

    }
    
  return (
    <>
    
    <div className="login_section">
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Log In As Recruiter</h5>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus  name='email' onChange={TextChanged} />
                                    <label for="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required name='password' onChange={TextChanged}/>
                                    <label for="inputPassword">Password</label>
                                </div>

                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" for="customCheck1">Remember password</label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={login}>Log In</button>
                                <hr className="my-4" />
                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</>
  )
}
