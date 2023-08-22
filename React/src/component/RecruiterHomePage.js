import React, { useEffect, useState } from 'react'
import loc from '../images/room_black_24dp.svg'
import work from '../images/work_white_24dp.svg'
import check from '../images/checklist_rtl_black_24dp.svg'
import pos from '../images/people_black_24dp.svg'
import axios from 'axios'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


export default function RecruiterHomePage() {

    const [jobPost,setJobPost] = useState([])
    const [message,setMessage] = useState("")
    const [state,setState] = useState("")
    var [searchText, setSearchText] = useState("");

   const history = useHistory();

    useEffect(()=>{

        getJobPosted();


    },[])


    let search=(args)=>
    {
        console.log("U searched " +  args.target.value);
        setSearchText(args.target.value);
    }

    let editJob= (input)=>{

       
        history.push({

            pathname : '/editjob',
            state : input,
            id : 2
        })
          
          


    }


    let getJobPosted=()=>{

        let id = sessionStorage.getItem("recruiterId")
        axios.get("http://localhost:4001/recruiter/getjob/"+id).then((res)=>{


                setJobPost(res.data.data)
                setState("")



        })

    }


    let delJob = (id)=>{


            axios.delete("http://localhost:4001/recruiter/dltjob/"+id).then((res)=>{

                    if(res.data.status === "success")
                    {
                        msg("Deleted SuccessFully")
                        getJobPosted();
                    }


            })

         

    }


    let msg = (msg) => {
        setMessage(msg);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      };

  return (
    <>
      {message === "" ? (
        <></>
      ) : (
        <div class="alert alert-warning" role="alert">
          {message}
        </div>
      )}

      <div class="shadow p-3 mb-5 bg-body rounded container">
        <center className="row">
          <div class="d-flex col">
            <input
              class="form-control me-2"
              type="text"
              placeholder="Search By Job Type Or Location"
              aria-label="Search"
              value={searchText}
              onChange={search}
            />
    
          </div>

          <button
            type="button"
            className="btn btn-outline-info col"
            style={{ maxWidth: 150 }}
            onClick={() => {
              history.push("/addjob");
            }}
          >
            ADD JOB
          </button>
        </center>
      </div>

      {jobPost.map((job) => {

            if(searchText === ""){
        return (
          <center>
            <div
              class="shadow-lg p-3 mb-5 bg-body rounded"
              style={{
                maxWidth: 1000,
                height: "inherit",
                display: "flex",
                borderRadius: 100,
              }}
            >
              <div style={{ marginLeft: 0, position: "relative" }}>
                <div style={{ display: "flex", marginLeft: 30 }}>
                  <h5 style={{ marginLeft: 0 }}>{job.job_type}</h5>
                </div>

                <ul>
                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={work} style={{ fill: "black" }}></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.company_name}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={loc}></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.job_location}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={check}></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.skill_set_required}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={pos}></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.position}</p>
                  </li>
                </ul>

                <div style={{ marginLeft: 30, float: "left",maxWidth : 700,overflow : 'auto' }}>
                  <h6 style={{ float: "left" }}>JOB DESCRIPTION</h6>

                  <p style={{ float: "left", textAlign: "initial",overflow : "none" }}>
                    {job.job_description}sadklsandsad dasdasdasdasdasdas
                    dasdasdasdasdasdasdasdas dasdasdasdasdasdasdasdasd
                    addressasd addressas dangerouslySetInnerHTMLas
                    dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                    dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                    dangerouslySetInnerHTMLas dasdasdasdasdasdasdasdasasasdasd
                    addressasdasdas dasdasdasdasdasdasdasdasasasdasdas
                  </p>
                </div>
                <div
                  style={{ position: "relative", float: "right", right: -220 }}
                >
                  <label> {job.created_date}</label>
                </div>
              </div>

              <button
                type="button"
                class="btn btn-outline-warning"
                style={{ height: "max-content" }}
                onClick={() => {
                  editJob({
                    job_type: job.job_type,
                    skill_set_required: job.skill_set_required,
                    position: job.position,
                    job_location: job.job_location,
                    job_description: job.job_description,
                    job_id: job.job_id,
                  });
                }}
              >
                EDIT JOB
              </button>
              <button
                type="button"
                class="btn btn-outline-danger mx-3"
                style={{ height: "max-content" }}
                onClick={() => {
                  delJob(job.job_id);
                }}
              >
                DELETE JOB
              </button>
            </div>
          </center>
        );
            }else if(job.job_type.toLowerCase().includes(searchText.toLowerCase()) ||job.job_location.toLowerCase().includes(searchText.toLowerCase()) ){

                return (
                    <center>
                      <div
                        class="shadow-lg p-3 mb-5 bg-body rounded"
                        style={{
                          maxWidth: 1000,
                          height: "inherit",
                          display: "flex",
                          borderRadius: 100,
                        }}
                      >
                        <div style={{ marginLeft: 0, position: "relative" }}>
                          <div style={{ display: "flex", marginLeft: 30 }}>
                            <h5 style={{ marginLeft: 0 }}>{job.job_type}</h5>
                          </div>
          
                          <ul>
                            <li style={{ display: "flex" }}>
                              <span>
                                <img src={work} style={{ fill: "black" }}></img>
                              </span>
                              <p style={{ marginLeft: 0 }}>{job.company_name}</p>
                            </li>
          
                            <li style={{ display: "flex" }}>
                              <span>
                                <img src={loc}></img>
                              </span>
                              <p style={{ marginLeft: 0 }}>{job.job_location}</p>
                            </li>
          
                            <li style={{ display: "flex" }}>
                              <span>
                                <img src={check}></img>
                              </span>
                              <p style={{ marginLeft: 0 }}>{job.skill_set_required}</p>
                            </li>
          
                            <li style={{ display: "flex" }}>
                              <span>
                                <img src={pos}></img>
                              </span>
                              <p style={{ marginLeft: 0 }}>{job.position}</p>
                            </li>
                          </ul>
          
                          <div style={{ marginLeft: 30, float: "left",maxWidth : 700,overflow : 'auto' }}>
                            <h6 style={{ float: "left" }}>JOB DESCRIPTION</h6>
          
                            <p style={{ float: "left", textAlign: "initial",overflow : "none" }}>
                              {job.job_description}sadklsandsad dasdasdasdasdasdas
                              dasdasdasdasdasdasdasdas dasdasdasdasdasdasdasdasd
                              addressasd addressas dangerouslySetInnerHTMLas
                              dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                              dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                              dangerouslySetInnerHTMLas dasdasdasdasdasdasdasdasasasdasd
                              addressasdasdas dasdasdasdasdasdasdasdasasasdasdas
                            </p>
                          </div>
                          <div
                            style={{ position: "relative", float: "right", right: -220 }}
                          >
                            <label> {job.created_date}</label>
                          </div>
                        </div>
          
                        <button
                          type="button"
                          class="btn btn-outline-warning"
                          style={{ height: "max-content" }}
                          onClick={() => {
                            editJob({
                              job_type: job.job_type,
                              skill_set_required: job.skill_set_required,
                              position: job.position,
                              job_location: job.job_location,
                              job_description: job.job_description,
                              job_id: job.job_id,
                            });
                          }}
                        >
                          EDIT JOB
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-danger mx-3"
                          style={{ height: "max-content" }}
                          onClick={() => {
                            delJob(job.job_id);
                          }}
                        >
                          DELETE JOB
                        </button>
                      </div>
                    </center>
                  );   


            }

      })}
    </>
  );
}
