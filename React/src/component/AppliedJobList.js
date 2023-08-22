
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import work from '../images/work_white_24dp.svg'
import loc from '../images/room_black_24dp.svg'
import check from '../images/checklist_rtl_black_24dp.svg'
import pos from '../images/people_black_24dp.svg'


export default function AppliedJobList()
{

  const [appliedjoblist,setAppliedJoblist] = useState([])

    useEffect(()=>{
      getAppliedJobs();

    },[])

   
    let getAppliedJobs = ()=>{

      let id = sessionStorage.getItem("applicantId")
      axios.get("http://localhost:4001/jobapplied/applied/"+id).then((res)=>{
        setAppliedJoblist(res.data.data)
         
      })
  }

  let trimDate =(date)=>{
      let d=date.substr(1,9).split("-").reverse().join("-");
      return d;
  }

return (
  <>
      <center>
    <div class="shadow p-3 mb-3 bg-body rounded" style={{maxWidth: 1000}}>APPLIED JOBS</div>
    </center>
    {appliedjoblist.map((job) => {
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

              <div style={{ marginLeft: 30, float: "left" }}>
                <h6 style={{ float: "left" }}>JOB DESCRIPTION</h6>

                <p style={{ float: "left", textAlign: "initial" }}>
                  {job.job_description}sadklsandsad dasdasdasdasdasdas
                  dasdasdasdasdasdasdasdas dasdasdasdasdasdasdasdasd addressasd
                  addressas dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                  dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                  dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                  dasdasdasdasdasdasdasdasasasdasd addressasdasdas
                  dasdasdasdasdasdasdasdasasasdasdas
                </p>
              </div>
              <div
                style={{ position: "relative", float: "right", right: -100 }}
              >
                <label> {trimDate(job.created_date)}</label>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-success"
              style={{ height: "max-content" }}
            >
              Already Applied
            </button>
          </div>
        </center>
      );
    })}
  </>
);}