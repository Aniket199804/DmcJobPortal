import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function MainJobList() {

    const [alljobs,setAlljobs] = useState([])



    useEffect(()=>{


        getAllJobs();


    },[])


    //APIS

  let getAllJobs=()=>{



        axios.get("http://localhost:4001/jobapplied/").then((result)=>{

            setAlljobs(result.data.data)
            
            
        })




  }


  return (
    <>
        {

            alljobs.map((job)=>{
                   

                return(

    
                    <div class="card mb-3 my-5" style={{marginLeft : 500,marginRight : 500}}>
                    <div class="card-body">
                      <h5 class="card-title">{job.job_type}</h5>
                      <p class="card-text">{job.job_description}</p>
                      <p class="card-text"><small class="text-muted">{job.created_date}</small></p>
                    </div>
                  </div>

                  


                );







            })






        }

    </>
  );
}
