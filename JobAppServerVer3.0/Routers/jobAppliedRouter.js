const express = require("express")
const db = require("../dbConnect/dbConnect")
const router = express.Router()
const utils = require("../utils/utils")




//JOB_APPLIED API
router.post("/apply",(request,response)=>{
    const {applicant_id,posted_by_id,job_id,selected} = request.body
    let query = `insert into job_applied(applicant_id,posted_by_id,job_id,selected) values(?,?,?,?)`
    db.query(query,[applicant_id,posted_by_id,job_id,selected],(error,result)=>{
        response.send(utils.createObject(error,result))
    })
})
//GET ALL JOBS API
router.get("/",(request, response)=>{
    let query ='select * from job_post'
    db.query(query,(error,result)=>{
        response.send(utils.createObject(error,result))
    })
})

//GET ALL APPLIED JOBS FOR APPLICANT
router.get("/applied/:id",(request, response)=>{
    const id =request.params.id
    let query =`select jp.job_id,jp.posted_by_id,jp.company_name,jp.job_type,jp.created_date,jp.job_description,jp.is_active,jp.skill_set_required,jp.position,jp.job_location from job_post jp JOIN job_applied ja on jp.job_id=ja.job_id where ja.applicant_id=?`
    db.query(query,[id],(error,result)=>{
        response.send(utils.createObject(error,result))
    })
})

//get applied table
router.get("/applied/",(request,response)=>{

    let query = "select * from job_applied";

    db.query(query,(error,result)=>{

        response.send(utils.createObject(error,result));
    })


})

module.exports=router;