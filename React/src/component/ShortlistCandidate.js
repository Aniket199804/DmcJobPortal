import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export default function ShortlistCandidate() {

    const [shortlist,setShortlist] = useState([])
  
    useEffect(()=>{
        getShortlistCand();  
      },[])

      let getImage=(img)=>{

        return "http://localhost:4001/"+img
  
    }
      let getShortlistCand = ()=>{

       let id = sessionStorage.getItem("recruiterId")
        axios.get("http://localhost:4001/recruiter/getshortlist/"+id).then((res)=>{
  
           setShortlist(res.data.data)
           console.log(shortlist)
        })
    }
  return (
    <>
          {
            shortlist.map((sh)=>{
              return(
                <div>
              
                <section className="section">
                  <div className="container">      
                    <div className="row">
                      <div className="col-lg-12">
                        <center>
                        <div className="candidate-list">
                          <div className="candidate-list-box card mt-4 shadow p-3 mb-2 bg-body rounded" style={{maxWidth: 800}}>
                            <div className="p-4 card-body">
                              <div className="align-items-center row">
                                <div className="col-auto">
                                  <div className="candidate-list-images">
                                    <a href="#"><img src={getImage(sh.profileImg)} alt="img here" className="avatar-md img-thumbnail rounded-circle" style={{maxWidth : '55%',height : 100,width : 170}} /></a>
                                  </div>
                                </div>
                                <div className="col-lg-5">
                                  <div className="candidate-list-content mt-3 mt-lg-0">
                                    <h5 className="fs-19 mb-0">
                                      <a className="primary-link" href="#">Full Name : {sh.first_name} {sh.last_name}</a>
                                    </h5>
                                    <ul className="list-inline mb-0 text-muted">
                                      <li className="list-inline-item">Email : {sh.email}</li>
                                      <li className="list-inline-item">Phone : {sh.contact_number}</li>

                                      <li className="list-inline-item">Gender : {sh.gender}</li>

                                    </ul>
                                  </div>
                                </div>
                               
                              </div>
                              <div className="favorite-icon">
                                <a href="#"><i className="mdi mdi-heart fs-18" /></a>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                        </center>
                      </div>
                    </div>
                    
                  </div>
                </section>
              </div>
              
              )
            })
          }
    
</>
  );
}