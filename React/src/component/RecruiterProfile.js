
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export default function RecruiterProfile()
{

  const [recruiteracc,setRecruiteracc] = useState([])
  const [message,setMessage] = useState("");
  const [input,setInput] = useState({first_name : "",last_name : "",email : "",contact_number:""})
    useEffect(()=>{
      getRecruiter();

    },[])


    let getRecruiter = ()=>{

      var id = sessionStorage.getItem("recruiterId")
      axios.get("http://localhost:4001/recruiter/getrecruiter/"+id).then((res)=>{

         setRecruiteracc(res.data.data)
         
      })
  }

  let TextChanged = (event)=>{

        var copyofInput = {...input};
        copyofInput[event.target.name]= event.target.value;
        setInput(copyofInput);
    
    
      }

  let msg = (msg)=>{

    setMessage(msg)
    setTimeout(() => {
      setMessage("")
    }, 2000);
    
    setInput({first_name : "",last_name : "",email : "",contact_number:""})

 }
  let update=()=>{ 
    var id = sessionStorage.getItem("recruiterId")
    if(input.first_name==="" || input.last_name==="" || input.email==="" || input.contact_number==="")
    {
        msg("Fields cannot be blank")
    }
    else{
      axios.put("http://localhost:4001/recruiter/edit/"+id,input).then((f)=>{
    
          console.log(f)
          getRecruiter();
          msg("Updated Successfully");
          setInput({first_name : "",last_name : "",email : "",contact_number:""})
      })
    }
    }
  return (
    <>
      {recruiteracc.map((rec) => {
        return (
          <div className='my-4'>
            {message === "" ? (
              <></>
            ) : (
              <div class="alert alert-warning" role="alert">
                {message}
              </div>
            )}
            <meta charSet="utf-8" />
            <title>profile edit data and skills - Bootdey.com</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css"
              rel="stylesheet"
            />
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html:
                  "\n    \tbody{\n    background: #f7f7ff;\n    margin-top:20px;\n}\n.card {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    word-wrap: break-word;\n    background-color: #fff;\n    background-clip: border-box;\n    border: 0 solid transparent;\n    border-radius: .25rem;\n    margin-bottom: 1.5rem;\n    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);\n}\n.me-2 {\n    margin-right: .5rem!important;\n}\n    ",
              }}
            />
            <div className="container">
              <div className="main-body">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                            alt="Admin"
                            className="rounded-circle p-1 bg-primary"
                            width={110}
                          />
                          <div className="mt-3">
                            <h4>
                              {rec.first_name} {rec.last_name}
                            </h4>
                            <h6>{rec.company_name}</h6>

                            <p className="text-secondary mb-1">{rec.email}</p>
                            <p className="text-muted font-size-sm">
                              {rec.contact_number}
                            </p>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-globe me-2 icon-inline"
                              >
                                <circle cx={12} cy={12} r={10} />
                                <line x1={2} y1={12} x2={22} y2={12} />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              </svg>
                              Website
                            </h6>
                            <span className="text-secondary">
                              https://bootdey.com
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-github me-2 icon-inline"
                              >
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                              </svg>
                              Github
                            </h6>
                            <span className="text-secondary">bootdey</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card">
                      <div className="card-body">
                      <h5 className="d-flex align-items-center mb-3">Profile Details</h5>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">First Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={recruiteracc[0].first_name}
                              name="first_name"
                              value={input.first_name}
                              onChange={TextChanged}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Last Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={recruiteracc[0].last_name}
                              name="last_name"
                              value={input.last_name}
                              onChange={TextChanged}
                            ></input>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={recruiteracc[0].email}
                              name="email"
                              value={input.email}
                              onChange={TextChanged}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="number"
                              className="form-control"
                              placeholder={recruiteracc[0].contact_number}
                              name="contact_number"
                              value={input.contact_number}
                              onChange={TextChanged}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="button"
                              className="btn btn-primary px-4"
                              defaultValue="Save Changes"
                              onClick={update}
                              
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}