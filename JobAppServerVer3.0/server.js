const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const app = express()
const routerApplicant = require("./Routers/applicantRouter")
const routerRecruiter = require("./Routers/recruiterRouter")
const routerJobApplied = require("./Routers/jobAppliedRouter")
const morgan = require('morgan')


app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'))
app.use(express.static("uploads"))
app.use(cors("*"))
app.use(express.json())
app.use("/applicant", routerApplicant)
app.use("/recruiter",routerRecruiter)
app.use("/jobapplied", routerJobApplied)

app.listen(4001, "0.0.0.0", () => 
{
  console.log("Server started at port 4001")
})