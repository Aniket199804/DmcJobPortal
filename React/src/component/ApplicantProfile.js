import axios from 'axios';
import React, { useEffect, useState } from 'react'
import account from '../images/account.svg'
import grad from '../images/grad.svg'
import edu from '../images/edu.svg'

export default function ApplicantProfile() {
 
 
  

  const [applicantacc,setApplicantacc] = useState([])
  const [message,setMessage] = useState("");
  const [input,setInput] = useState({applicant_id:sessionStorage.getItem("applicantId"),first_name : "",last_name : "",email : "",contact_number:"",degree_name:"",university_name:"",percentage:"",skill_set:"",start_date:"",completion_date:""})

  useEffect(() => {
    getApplicant();
  }, []);

  let getApplicant = () => {

     let id = sessionStorage.getItem("applicantId")
    axios
      .get("http://localhost:4001/applicant/profileandeducation/"+id)
      .then((res) => {
        setApplicantacc(res.data.data);
      });
  };

             
     

  let trimDate = (date) => {
    let d = date.substr(1, 9).split("-").reverse().join("-");
    return d;
  };

  let TextChanged = (event) => {
    var copyofInput = { ...input };
    copyofInput[event.target.name] = event.target.value;
    setInput(copyofInput);
  };
    
     
  let getImage=(img)=>{

    return "http://localhost:4001/"+img

}
  let msg = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 2000);

    setInput({first_name : "",last_name : "",email : "",contact_number:"",degree_name:"",university_name:"",percentage:"",skill_set:"",start_date:"",completion_date:""})
  };
  let updateProfile = () => {
    let id =sessionStorage.getItem("applicantId")

    if(input.first_name==="" || input.last_name==="" || input.email==="" || input.contact_number==="")
    {
        msg("Fields cannot be blank")
    }
    else{
    axios
      .put("http://localhost:4001/applicant/updateapplicant/"+id,input)
      .then((f) => {
        console.log(f);
        msg("Profile Details Updated Successfully");
        setInput({
          first_name: "",
          last_name: "",
          email: "",
          contact_number: "",
        });
        getApplicant();
      });
    }
  };

  let updateEducation = () => {

    if(input.degree_name==="" || input.university_name==="" || input.percentage==="" || input.skill_set==="" ||  input.start_date==="" || input.completion_date==="")
    {
        msg("Fields cannot be blank")
    }
    else{
    axios
      .post("http://localhost:4001/applicant/addeducationdetails", input)
      .then((f) => {
        console.log(f);
        getApplicant();
        msg("Education Details Updated Successfully");
        setInput({
          degree_name: "",
          university_name: "",
          percentage: "",
          skill_set: "",
          start_date: "",
          completion_date: "",
        });
        getApplicant();
      });
    }
  };

  return (
    <>
      {applicantacc.map((rec) => {
        return (
          <div style={{marginTop : 30}}>
            {message === "" ? (
              <></>
            ) : (
              <div class="alert alert-warning" role="alert">
                {message}
              </div>
            )}
            <meta charSet="utf-8" />
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
                        <img src={getImage(rec.profileImg)} style={{width: 150, height: 150}} alt="" className="avatar-md img-thumbnail rounded-circle" />
                          <div className="mt-3">
                            <h4>
                              {rec.first_name} {rec.last_name}
                            </h4>
                            <p className="text-secondary mb-1">
                              Email :{rec.email}
                            </p>
                            <p className="text-secondary mb-1">
                              Gender :{rec.gender}
                            </p>
                            <p className="text-secondary mb-1">
                              Registration Date :
                              {trimDate(rec.registration_date)}
                            </p>
                            <p className="text-secondary mb-1">
                              Phone:{rec.contact_number}
                            </p>
                          </div>
                          <div className="mt-3">
                            <h6>
                              <img src={edu}/>

                              Education
                            </h6>
                            <p className="text-secondary mb-1">
                              Degree :{rec.degree_name}
                            </p>
                            <p className="text-secondary mb-1">
                              University :{rec.university_name}
                            </p>
                            <p className="text-secondary mb-1">
                              Percentage :{rec.percentage}
                            </p>
                            <p className="text-secondary mb-1">
                              Skill:{rec.skill_set}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="d-flex align-items-center mb-3">
                          <img src={account} className='mx-2' /> Profile Details
                        </h5>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">First Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              required
                              placeholder={applicantacc[0].first_name}
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
                              required
                              placeholder={applicantacc[0].last_name}
                              name="last_name"
                              value={input.last_name}
                              onChange={TextChanged}
                            />
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
                              required
                              placeholder={applicantacc[0].email}
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
                              required
                              placeholder={applicantacc[0].contact_number}
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
                              onClick={updateProfile}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-13">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="d-flex align-items-center mb-3">
                            <img src={grad}  className='mx-2'/>
                            Education Highlights
                          </h5>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Degree</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                required
                                placeholder={applicantacc[0].degree_name}
                                name="degree_name"
                                value={input.degree_name}
                                onChange={TextChanged}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">University</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                required
                                placeholder={applicantacc[0].university_name}
                                name="university_name"
                                value={input.university_name}
                                onChange={TextChanged}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Percentage</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="number"
                                className="form-control"
                                required
                                placeholder={applicantacc[0].percentage}
                                name="percentage"
                                value={input.percentage}
                                onChange={TextChanged}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Skill</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                required
                                placeholder={applicantacc[0].skill_set}
                                name="skill_set"
                                value={input.skill_set}
                                onChange={TextChanged}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Start Date</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="date"
                                className="form-control"
                                required
                                placeholder={applicantacc[0].start_date}
                                name="start_date"
                                value={input.start_date}
                                onChange={TextChanged}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Completion Date</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="date"
                                className="form-control"
                                required
                                placeholder={applicantacc[0].completion_date}
                                name="completion_date"
                                value={input.completion_date}
                               // onChange={TextChanged}
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
                                onClick={updateEducation}
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
          </div>
        );
      })}
    </>
  );}
