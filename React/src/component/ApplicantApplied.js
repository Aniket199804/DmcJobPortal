import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import gender from "../images/gender.svg";
import mail from "../images/mail.svg";
import phone from "../images/phone.svg";
import calender from "../images/calender.svg";
import percent from "../images/percent.svg";
import skills from "../images/skill.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ApplicantApplied() {
  const [applies, setApplies] = useState([]);
  const [message, setMessage] = useState("");
  const history = useHistory();
  var [searchText, setSearchText] = useState("");

  useEffect(() => {
    getApplies();
  }, []);

  let getApplies = () => {
    let id = sessionStorage.getItem("recruiterId");
    axios
      .get("http://localhost:4001/recruiter/getApplies/" + id)
      .then((res) => {
        setApplies(res.data.data);
      });
  };

  let trimDate = (date) => {
    let d = date.substr(1, 9).split("-").reverse().join("-");
    return d;
  };

  let getImage = (img) => {
    return "http://localhost:4001/" + img;
  };

  let shortList = (id) => {
    axios
      .post("http://localhost:4001/recruiter/shortlist", { job_applied_id: id })
      .then((res) => {
        if (res.data.status === "success") {
          msg("SHORTLISTED SUCCESSFULLY..!!!");
        }
      });
  };

  let search = (args) => {
    console.log("U searched " + args.target.value);
    setSearchText(args.target.value);
  };

  let msg = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
      history.push("/recruiterhome");
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
      <center>
        <div
          className="shadow p-3 mb-2 mt-2 bg-body rounded"
          style={{ maxWidth: 1000 }}
        >
          <div class="d-flex col">
            <input
              class="form-control me-2"
              type="text"
              placeholder="Search By Skills Or Percentage Or Degree Name"
              aria-label="Search"
              value={searchText}
              onChange={search}
            />
          </div>
        </div>
      </center>
      {applies.map((applicant) => {
        if (searchText === "") {
          return (
            <div>
             
                <div className="container">
                  <div className="row" style={{justifyContent : 'center'}}>
                    <div className="col-lg-10">
                      <div className="candidate-list">
                        <div className="candidate-list-box card mt-4">
                          <div className="p-4 card-body ">
                            <div className="align-items-center row">
                              <div
                                className="col-auto"
                                width={500}
                                height={500}
                              >
                                <div
                                  className="candidate-list-images"
                                  style={{ width: 150, height: 150 }}
                                >
                                  <a href="#">
                                    <img
                                      src={getImage(applicant.profileImg)}
                                      style={{ width: 150, height: 150 }}
                                      alt="img"
                                      className="avatar-md img-thumbnail rounded-circle"
                                    />
                                  </a>
                                </div>
                              </div>

                              <div className="col-lg-5">
                                <div className="candidate-list-content mt-3 mt-lg-0">
                                  <h5 className="fs-19 mb-0">
                                    <a className="primary-link" href="#">
                                      {applicant.first_name}{" "}
                                      {applicant.last_name}
                                    </a>
                                    <span className="badge bg-success ms-1"></span>
                                  </h5>

                                  <p className="text-muted mb-2">
                                    Degree: {applicant.degree_name}
                                  </p>
                                  <p className="text-muted mb-2">
                                    University: {applicant.university_name}
                                  </p>

                                  <ul className="list-inline mb-0 text-muted">
                                    <li className="list-inline-item">
                                      <img src={gender}></img>
                                      {applicant.gender}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={mail}></img>
                                      {applicant.email}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={phone}></img>
                                      {applicant.contact_number}
                                    </li>
                                  </ul>

                                  <ul className="list-inline mb-0 text-muted">
                                    <li className="list-inline-item">
                                      <img src={calender}></img>Gradution start
                                      date: {trimDate(applicant.start_date)}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={calender}></img>Gradution end
                                      date:{" "}
                                      {trimDate(applicant.completion_date)}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={percent}></img>
                                      {applicant.percentage}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={skills}></img>
                                      {applicant.skill_set}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div
                                className="col-lg-5"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <span>
                                  <div className="form-check form-switch">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      onClick={() => {
                                        shortList(applicant.job_applied_id);
                                      }}
                                    >
                                      Shortlist
                                    </button>
                                  </div>
                                </span>
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
        } else if (
          applicant.skill_set
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          applicant.degree_name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          applicant.percentage <= searchText
        ) {
          return (
            <div>
              <section className="section">
                <div className="container">
                  <div className="row" style={{justifyContent : 'center'}}>
                    <div className="col-lg-10">
                      <div className="candidate-list">
                        <div className="candidate-list-box card mt-4">
                          <div className="p-4 card-body ">
                            <div className="align-items-center row">
                              <div
                                className="col-auto"
                                width={500}
                                height={500}
                              >
                                <div
                                  className="candidate-list-images"
                                  style={{ width: 150, height: 150 }}
                                >
                                  <a href="#">
                                    <img
                                      src={getImage(applicant.profileImg)}
                                      style={{ width: 150, height: 150 }}
                                      alt="img"
                                      className="avatar-md img-thumbnail rounded-circle"
                                    />
                                  </a>
                                </div>
                              </div>

                              <div className="col-lg-5">
                                <div className="candidate-list-content mt-3 mt-lg-0">
                                  <h5 className="fs-19 mb-0">
                                    <a className="primary-link" href="#">
                                      {applicant.first_name}{" "}
                                      {applicant.last_name}
                                    </a>
                                    <span className="badge bg-success ms-1"></span>
                                  </h5>

                                  <p className="text-muted mb-2">
                                    Degree: {applicant.degree_name}
                                  </p>
                                  <p className="text-muted mb-2">
                                    University: {applicant.university_name}
                                  </p>

                                  <ul className="list-inline mb-0 text-muted">
                                    <li className="list-inline-item">
                                      <img src={gender}></img>
                                      {applicant.gender}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={mail}></img>
                                      {applicant.email}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={phone}></img>
                                      {applicant.contact_number}
                                    </li>
                                  </ul>

                                  <ul className="list-inline mb-0 text-muted">
                                    <li className="list-inline-item">
                                      <img src={calender}></img>Gradution start
                                      date: {trimDate(applicant.start_date)}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={calender}></img>Gradution end
                                      date:{" "}
                                      {trimDate(applicant.completion_date)}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={percent}></img>
                                      {applicant.percentage}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={skills}></img>
                                      {applicant.skill_set}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div
                                className="col-lg-5"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <span>
                                  <div className="form-check form-switch">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      onClick={() => {
                                        shortList(applicant.job_applied_id);
                                      }}
                                    >
                                      Shortlist
                                    </button>
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        }
      })}
    </>
  );
}