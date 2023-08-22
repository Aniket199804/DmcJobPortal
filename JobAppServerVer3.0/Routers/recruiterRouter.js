const express = require("express")
const db = require("../dbConnect/dbConnect")
const router = express.Router()
const utils = require("../utils/utils")



//REGISTER_RECRUITER_API
router.post("/register", (request, response) => {
    const { first_name,last_name,email,password,contact_number,company_name,registration_date } = request.body
    db.query(
      "INSERT INTO recruiter_account(first_name,last_name,email,password,contact_number,company_name,registration_date) VALUES(?,?,?,?,?,?,now())",
      [first_name, last_name, email, password, contact_number, company_name, registration_date],
      (error, result) => {
        response.send(utils.createObject(error, result))    
      })
  })

//RECRUITER_LOGIN_API
router.post("/login", (request, response) => {
  const { email, password } = request.body
  const statement = "SELECT * FROM recruiter_account WHERE email=? and password=?"
  db.query(statement, [email, password], (error, result) => {
    response.send(utils.createObject(error, result))
  })
})

//UPDATE_RECRUITER_API
//UPDATE_RECRUITER_API
router.put("/edit/:id",(req,resp)=>{

  const {first_name,last_name,email,contact_number} = req.body;
  q = "UPDATE recruiter_account set first_name = ?, last_name = ?, email = ?, contact_number = ?where recruiter_id =?;"
  db.query(q,[first_name, last_name, email, contact_number,req.params.id],(err,data)=>{
      resp.send(utils.createObject(err,data));
  })
})

//UPDATE_JOB_STATUS_API(ACTIVE/INACTIVE)
router.get("/active/:id", (request, response) =>
 {
    const job_id = request.params.id
    const {status}=request.body
    const statement = `Update job_post SET is_active=? where job_id=?`
    db.query(statement, [status,job_id], (error, result) => {
      response.send(utils.createObject(error,result))
    })
  })


//SEARCH_APPLICANTS_API(ACCORDING TO THE SKILL)
router.get("/getcandidates", (request, response) =>
 {
    const {skill}=request.body
    
     const q = `Select first_name,last_name,email,gender,contact_number from applicant_account AA
                    join educational_details EduDetails on AA.applicant_id=EduDetails.applicant_id
                    where skill_set like "%${skill}%"`
    db.query(q, (error, result) => {
      response.send(utils.createObject(error,result))
    })
  })

//SHORTLIST_APPLICANT(FROM LIST OF APPLIES)
router.post("/shortlist", (request, response) =>
 {
    const {job_applied_id}=request.body
    
     const q = `Update job_applied SET selected = true where job_applied_id = ?`
    db.query(q, [job_applied_id],(error, result) => {
      response.send(utils.createObject(error,result))
    })
  })



  //GET SHORTLIST APPLICANTS BY RECRUITER ID
router.get("/getshortlist/:id", (req,resp) => {
  const id =  req.params.id
  console.log(id);
  const q5 = `Select A.first_name,A.last_name,A.email,A.gender,A.contact_number,profileImg from applicant_account A 
       join job_applied J on A.applicant_id=J.applicant_id  where selected=true and posted_by_id=?`
  db.query(q5,[id] ,(err,data) => {
    resp.send(utils.createObject(err,data))
  })
})


//ADD_JOB_IN_JOBPOST_API
router.post("/addjob", (request, response) => {
  const { posted_by_id,company_name,job_type,job_description,skill_set_required,position ,job_location } = request.body
  console.log(request.body)
  db.query(
    "INSERT INTO job_post(posted_by_id,company_name,job_type,created_date,job_description,is_active,skill_set_required,position ,job_location) VALUES(?,?,?,now(),?,true,?,?,?)",
    [posted_by_id,company_name,job_type,job_description,skill_set_required,position ,job_location],
    (error, result) => {
      console.log(error)
      response.send(utils.createObject(error, result))    
    })
})


//UPDATE_JOB_IN_JOBPOST_API
router.put("/updtjob/:id",(req,resp)=>{

    const {job_type,job_description,skill_set_required,position ,job_location} = req.body;
    q = "UPDATE job_post set job_type = ?, job_description = ?, skill_set_required = ?, position = ?, job_location = ? where job_id =?;"
    db.query(q,[job_type,job_description,skill_set_required,position ,job_location,req.params.id],(err,data)=>{
        resp.send(utils.createObject(err,data));
    })
  })


//DELETE_JOB_POST_API
router.delete("/dltjob/:id",(req,resp)=>{
    db.query("delete from job_post where job_id = ?",[req.params.id],(err,data)=>{
        resp.send(utils.createObject(err,data));
    })
})


//get recruiter by id
router.get("/getrecruiter/:id", (req,resp) => {
  const id =  req.params.id
  console.log(id);
  const q4 = `SELECT  * FROM recruiter_account where recruiter_id = ?`
  db.query(q4,[id] ,(err,data) => {
    resp.send(utils.createObject(err,data))
  })
})
// //GET ALL APPLIED USERS
// router.get("/getApplies/:id",(req,resp) =>{
//   const query = 'select ac.applicant_id,ac.first_name,ac.last_name,ac.email,ac.gender,ac.contact_number,ac.registration_date,ac.profileImg,ac.extra_col2  from applicant_account ac JOIN job_applied ja ON ac.applicant_id = ja.applicant_id where ja.posted_by_id =?' 
//   db.query(query,[req.params.id],(err,data)=>{
//     resp.send(utils.createObject(err,data));
//   })
// })


//GET RECRUITER BY ID
router.get("/getrecruiter/:id", (req,resp) => {
  const id =  req.params.id
  console.log(id);
  const q4 = `SELECT  * FROM recruiter_account where recruiter_id = ?`
  db.query(q4,[id] ,(err,data) => {
    resp.send(utils.createObject(err,data))
  })
})


//GET JOB POSTED BY RECRUITER

router.get("/getjob/:id",(request,response)=>{

    const id = request.params.id

    const query = `select * from job_post where posted_by_id = ?`
    db.query(query,[id],(error,result)=>{

        response.send(utils.createObject(error,result))

    })

})

//get job by job id
router.get("/getjobid/:id",(request,response)=>{



      const id = request.params.id;

      const query = `select * from job_post where job_id = ?`

      db.query(query,[id],(error,result)=>{


          response.send(utils.createObject(error,result));


      })


})





//GET ALL APPLIED USERS
router.get("/getApplies/:id",(req,resp) =>{
  const query = 'select ac.applicant_id,ac.first_name,ac.last_name,ac.email,ac.gender,ac.contact_number,ac.profileImg,ed.degree_name,ed.university_name,ed.start_date,ed.completion_date,ed.percentage,ed.skill_set,ja.job_applied_id,ja.posted_by_id,ja.selected from applicant_account ac JOIN job_applied ja ON ac.applicant_id = ja.applicant_id JOIN educational_details ed ON ed.applicant_id=ac.applicant_id where ja.posted_by_id =? and ja.selected = false'
  db.query(query,[req.params.id],(err,data)=>{
    resp.send(utils.createObject(err,data));
  })
})


 module.exports = router



