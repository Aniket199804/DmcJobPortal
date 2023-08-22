import axios from 'axios'
import React, { useState } from 'react'



export default function RecruiterRegister() {
const data = {first_name : "", last_name : "", email : "", password : "", cpassword : "", contact_number : "", company_name : ""};    
const [inputdata,setInputData] = useState(data)

const handleData = (e) => {
    setInputData({...inputdata, [e.target.name]:e.target.value})
}
    const onSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:4000/recruiter/register',inputdata).then((res)=>{
         //setInputData(res.data)   
        console.log(res)
        })
        
    }
  return (
    <>
    
    
    <div>
   
    <div className="container">
      <div className="main-body">
        <div className="row">
         
         
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
              <h5 className="d-flex align-items-center mb-3">Register Details</h5>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">First Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" name='first_name' placeholder='Enter First Name' value={inputdata.first_name} onChange={handleData} className='form-control'></input>                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Last Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" name='last_name' placeholder='Enter Last Name' value={inputdata.last_name} onChange={handleData} className='form-control'></input>                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="email" name='email' placeholder='Enter Email' value={inputdata.email} onChange={handleData} className='form-control'></input>                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Password</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="password" name='password' placeholder='Enter password' value={inputdata.password} onChange={handleData} className='form-control'></input>                  </div>
                 </div>
                 <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Confirm Password</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="cpassword" name='cpassword' placeholder='Enter Confirm password' value={inputdata.cpassword} onChange={handleData} className='form-control'></input>                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Contact Number</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="contact" name='contact_number' placeholder='Enter Contact number' value={inputdata.contact_number} onChange={handleData} className='form-control'></input>                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Company Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="company_name" name='company_name' placeholder='Enter Company Name'value={inputdata.company_name} onChange={handleData}  className='form-control'></input>                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-9 text-secondary">
                  <button className='btn btn-primary' onClick={onSubmit}>Submit</button>                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</>
  )
}
