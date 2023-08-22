import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function AddJob() {


  const [message, setMessage] = useState("");
  const id = sessionStorage.getItem("recruiterId")
  const company = sessionStorage.getItem("company")
  const [input, setInput] = useState({
    posted_by_id: id,
    company_name: company,
    job_type: "",
    job_description: "",
    skill_set_required: "",
    position: "",
    job_location: "",
  });

  useEffect(()=>{

    setInput({
      posted_by_id: id,
      company_name: company,
      job_type: "",
      job_description: "",
      skill_set_required: "",
      position: "",
      job_location: "",
    })



  },[])

  let TextChanged = (event) => {
    var copyofInput = { ...input };
    copyofInput[event.target.name] = event.target.value;
    setInput(copyofInput);
  };

  let msg = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  let can = () => {
    setInput({
      job_type: "",
      job_description: "",
      skill_set_required: "",
      position: "",
      job_location: "",
    });
  };
  let insert = () => {
    if (
      input.job_type === "" ||
      input.job_description === "" ||
      input.skill_set_required === "" ||
      input.position === "" ||
      input.job_location === ""
    ) {
      msg("fields cannot be blank");
    } else {
      axios
        .post("http://localhost:4001/recruiter/addjob",input)
        .then((res) => {
          msg("Job Added Successfully");
          setInput({
            job_type: "",
            job_description: "",
            skill_set_required: "",
            position: "",
            job_location: "",
          });
          console.log(res);
        });
    }
  };
  return (
    <div
      className="card text-center"
      style={{ marginLeft: 400, marginRight: 400 }}
    >
      {message === "" ? (
        <></>
      ) : (
        <div class="alert alert-warning" role="alert">
          {message}
        </div>
      )}
      <div className="card-header">Add Job </div>

      <div className="mb-3">
        <div className="row mb-4">
          <label for="colFormLabel" className="col-sm-2 col-form-label">
            Job Type
          </label>
          <div className="col-sm-10" style={{ marginTop: 10 }}>
            <input
              type="text"
              className="form-control"
              id="colFormLabel"
              placeholder="Job Type"
              name="job_type"
              value={input.job_type}
              onChange={TextChanged}
            />
          </div>
          <label for="colFormLabel" className="col-sm-2 col-form-label">
            Skill Set
          </label>
          <div className="col-sm-10" style={{ marginTop: 10 }}>
            <input
              type="text"
              className="form-control"
              id="colFormLabel"
              placeholder="Skill Set"
              name="skill_set_required"
              value={input.skill_set_required}
              onChange={TextChanged}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label
            for="inputCity"
            className="form-label"
            style={{ marginRight: 400 }}
          >
            Position
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Position"
            aria-label="First name"
            name="position"
            value={input.position}
            onChange={TextChanged}
          />
        </div>
        <div className="col">
          <label
            for="inputCity"
            className="form-label"
            style={{ marginRight: 400 }}
          >
            Location
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            aria-label="Last name"
            name="job_location"
            value={input.job_location}
            onChange={TextChanged}
          />
        </div>
      </div>
      <div className="mb-3" style={{ marginTop: 10 }}>
        <label
          for="exampleFormControlTextarea1"
          className="form-label"
          style={{ marginRight: 980 }}
        >
          Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Enter text here"
          name="job_description"
          value={input.job_description}
          onChange={TextChanged}
        />
      </div>

      <div className="col">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={insert}
          style={{ marginRight: 200 }}
        >
          submit
        </button>
        <button type="button" className="btn btn-primary btn-sm" onClick={can}>
          cancel
        </button>
      </div>
    </div>
  );
}
