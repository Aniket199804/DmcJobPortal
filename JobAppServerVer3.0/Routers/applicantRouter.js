const express = require("express")
const db = require("../dbConnect/dbConnect")
const router = express.Router()
const utils = require("../utils/utils")
const multer = require("multer")
const upload = multer({ dest: 'uploads' })

//UPLOAD PROFILE IMAGE
router.post('/uploadprofile/:id',upload.single('image'),(request, response) => {
    const  applicant_id = request.params.id
    const filename = request.file.filename
    console.log("ee")

    db.query(
      `update applicant_account set profileImg = '${filename}' where applicant_id = ${applicant_id}`,
      (error, result) => {
        response.send(utils.createObject(error, result))
      }
    )
  }
)

//GET EDUCATIONAL DETAILS 
router.get("/profileandeducation/:id", (req,resp) => {
  const id =  req.params.id
  const q5 = `select * from applicant_account aa join educational_details ed on aa.applicant_id = ed.applicant_id where aa.applicant_id = ?`
  db.query(q5,[id] ,(err,data) => {
    resp.send(utils.createObject(err,data))
  })
})

router.post("/upload",upload.single('image'),(request,response)=>{


 console.log("upload success")
  response.sendStatus(200)




})

//GET PROFILE IMAGE
router.get("/getprofile/:id",(request,response) => {
  const  applicant_id = request.params.id
  const statement = `select profileImg from applicant_account where applicant_id=?`
  db.query(statement, [applicant_id], (error, result) =>{
    console.log(applicant_id)
    response.send(utils.createObject(error,result))
  })
})




//REGISTER_APPLICANT_API
router.post("/register", (request, response) => {
    const { first_name, last_name, email, password, gender,contact_number, registration_date } = request.body
    db.query(
      "INSERT INTO applicant_account(first_name,last_name,email,password,gender,Contact_number,registration_date) VALUES(?,?,?,?,?,?,now())",
      [first_name, last_name, email, password, gender,contact_number, registration_date],
      (error, result) => {
        response.send(utils.createObject(error, result))
      }
    )
  })

//LOGIN_APPLICAN_API
router.post("/login", (request, response) => {
    console.log(request.body);
    const { email, password } = request.body

    console.log("POST OF LOGIN IS CALLED");
    console.log(request.body.email);
    const statement = "SELECT * FROM applicant_account WHERE email=? and password=?"
    db.query(statement, [email, password], (error, result) => {
      response.send(utils.createObject(error, result))
    })
  })

//UPDATE_APPLICANT_PROFILE
router.put("/updateapplicant/:id",(request,response) =>{
    const {first_name,last_name,email,contact_number} = request.body

    console.log(request.body)
    db.query(
        "UPDATE applicant_account set first_name = ?,last_name = ?,email = ?,Contact_number = ? where applicant_id = ?",
        [first_name,last_name,email,contact_number,request.params.id],
        (error,result) =>{
            response.send(utils.createObject(error,result))       
        }
    )
  })

//ADD OR UPDATE EDUCATIONAL_DETAILS
router.post("/addeducationdetails", (request, response) => {
  const { applicant_id,degree_name,university_name,start_date,completion_date,percentage,skill_set} = request.body
  console.log(request.body)
  db.query(
    "select * from educational_details where applicant_id=?",
    [applicant_id],
    (error, result) => 
    {
      console.log(request[0]);

      if(result.length>0)
      {
        console.log("update");
        db.query("update educational_details set degree_name=?,university_name=?,start_date=?,completion_date=?,percentage=?,skill_set=? where applicant_id=?",[degree_name,university_name,start_date,completion_date,percentage,skill_set,applicant_id],(error,result) =>{
        response.send(utils.createObject(error, result))
        })
      }else{
        console.log("insert");
        db.query("insert into educational_details (applicant_id,degree_name,university_name,start_date,completion_date,percentage,skill_set) VALUES(?,?,?,?,?,?,?)",[applicant_id,degree_name,university_name,start_date,completion_date,percentage,skill_set],(error,result) =>{
          response.send(utils.createObject(error, result))
          })
      }
    }
  )
})
  
  
// SEARCH_JOB_API
router.get("/searchjob",(req,resp)=>{
    const {job_type,company_name} = req.body
    console.log(job_type)
    if(job_type == undefined)
    {
        console.log("hh")
       var q1= "select * from job_post where company_name=?"
        db.query(q1,[company_name],(err,data)=>{
            resp.send(utils.createObject(err,data)); 
        })
    }
    if(company_name == undefined)
    {
      var q2= "select * from job_post where job_type = ?"
        db.query(q2,[job_type],(err,data)=>{
            resp.send(utils.createObject(err,data));
        })
    }
})



//FILTER_JOB_API
router.post("/filterjob",(req,resp)=>{
    const {job_location} = req.body
    var q = "select * from job_post where job_location = ?"
    db.query(q,[job_location],(err,data)=>{
        resp.send(utils.createObject(err,data));
    })
})

//get applicant by id
router.get("/getapplicant/:id", (req,resp) => {
  const id =  req.params.id
  console.log(id);
  const q3 = `SELECT  * FROM applicant_account where applicant_id = ?`
  db.query(q3,[id] ,(err,data) => {
    resp.send(utils.createObject(err,data))
  })
})



//GET EDUCATIONAL DETAILS 
router.get("/geteducation/:id", (req,resp) => {
  const id =  req.params.id
  console.log("getEdu")
  const q4 = `SELECT  * FROM educational_details where applicant_id = ?`
  db.query(q4,[id] ,(err,data) => {
    resp.send(utils.createObject(err,data))
  })
})

  module.exports = router
