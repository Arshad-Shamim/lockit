import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; //notification
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeOff, Clipboard, BookA } from "lucide-react"; // Optional icon lib, or replace with Bootstrap icons

import {
  authorization,
  randomPws as generatePws,
  storeData,
  getData,
  deleteData,
  sortData,
} from "../api/home.mjs"; //for authorize user;
import Error from "./Error.jsx";
import "../cascading/home.css";

export default function Home() {
  let [authorize, setAuthorize] = useState(true); //ensure that user are authorize or not;
  let [pws, setPws] = useState(""); //store pws input field value
  let navigate = useNavigate();
  let [username, setUsername] = useState(sessionStorage.getItem("username"));
  let [data, setData] = useState([]); //store array of object (user data like url,pws..);
  let [tablepws, setTablepws] = useState(-1); //-1=no pws view event tablepws!=-1 display stored index pws;

  useEffect(() => {
    console.log("useEffect() :");
    updateData();
  }, []);

  function start_loading(border, content) {
    document.getElementById(border).classList.add("spinner-border");
    document.getElementById(content).classList.add("visually-hidden");
  }

  function finish_loading(border, content) {
    document.getElementById(border).classList.remove("spinner-border");
    document.getElementById(content).classList.remove("visually-hidden");
  }

  function updateData() {
    console.log("updateData :");

    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    getData(token, username)
      .then((res) => {
        if (res.status) {
          setData(res.data);
        } else {
          notifyFailer(res.msg);
        }
      })
      .catch((err) => {
        console.log("pages/home", err);
        notifyFailer("Something went wrong!");
      });
  }

  function notifySuccess(data) {
    toast(data, {
      style: {
        backgroundColor: "#4CAF50",
        color: "#FFFFFF",
      },
    });
  }

  function notifyFailer(data) {
    toast(data, {
      style: {
        backgroundColor: "red",
        color: "white",
      },
    });
  }

  async function callAuthorization() {
    let temp = await authorization();
    setAuthorize(temp);
  }

  callAuthorization(); //authorize user;

  function handleSigout() {
    console.log("handleSignout :");
    sessionStorage.clear();
    navigate("/signin");
    return;
  }

  async function randomPws(loading, content) {
    //cal api from random generated pws;
    console.log("randomPws() :");

    start_loading(loading, content);
    let res = await generatePws();
    finish_loading(loading, content);

    if (res.status) {
      setPws(res.pws);
      notifySuccess(res.msg);
    } else notifyFailer(res.msg);
  }

  async function handleSubmit(e, border, content) {
    e.target.pws.value = pws; //store both input as well as random pws into pws.value;

    const data = {
      username: sessionStorage.getItem("username"),
      user_indentifier: e.target.user_indentifier.value,
      pws: e.target.pws.value,
      url: e.target.url.value,
    };

    start_loading(border, content);
    console.log(document.getElementById(content));
    storeData(data)
      .then((res) => {
        if (res.status) {
          notifySuccess(res.msg);
          updateData();
          setPws("");
          e.target.reset();
        } else notifyFailer(res.msg);
      })
      .catch((err) => {
        notifyFailer("Some Went Wrong !");
      })
      .finally(() => {
        finish_loading(border, content);
      });

    e.preventDefault();
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(pws); //copy pws

    const element = document.getElementById("copy");
    element.style.backgroundColor = "#e0dada";
    notifySuccess("password copied");

    setTimeout(() => {
      element.style.backgroundColor = "#e0dada";
    }, 800);
  }

  function table_pws_fn(pws) {
    return (
      <div className="row col-12">
        <div className=" border col-lg-6 col-12 bg-secondary ms-2">
          <span className="text-dark">{pws}</span>
        </div>

        <div className="col-lg-2 col-5 ms-2 p-0">
          <span
            className="btn btn-sm m-0 p-0 text-primary text-decoration-underline"
            onClick={() => setTablepws(-1)}
          >
            Hide
          </span>
        </div>

        <div className="col-lg-2 col-5 p-0 ms-0">
          <span
            className="btn btn-sm m-0 p-0 text-primary text-decoration-underline"
            onClick={async () => {
              await navigator.clipboard.writeText(pws);
              notifySuccess("copied!");
            }}
          >
            copy
          </span>
        </div>
      </div>
    );
  }

  async function deleteTablerow(url, border, content) {
    console.log("deleteTablerow :", url);

    start_loading(border, content);
    deleteData(url)
      .then((res) => {
        if (res.status) {
          updateData();
          notifySuccess(res.msg);
        } else {
          notifyFailer(res.msg);
        }
      })
      .catch((err) => {
        console.log("pages/home/dataTablerow :", err);
        notifyFailer("something went wrong!");
      })
      .finally(() => {
        finish_loading(border, content);
      });
    console.log("ho");
  }

  function handleSort(e) {
    const sortBy =
      e.target.value == 0
        ? "recently add"
        : e.target.value == 1
        ? "url"
        : "user_indentifier";
    console.log("handle sort: sortBy", sortBy);
    sortData(sortBy)
      .then((res) => {
        if (res.status) {
          setData(res.data);
          notifySuccess(res.msg);
        } else {
          notifyFailer(res.msg);
        }
      })
      .catch((err) => {
        notifyFailer("Something went wrong");
      });
  }

  if (!authorize) {
    return <Error msg={"Please log in or sign up to continue...."} />;
  } else {
    return (
      <>
        <ToastContainer />

        {/* nav bar */}

        <nav className="navbar navbar-expand-lg roboto-regular bg-light">
          <div className="container-fluid">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="38"
              fill="currentColor"
              class="bi bi-person-fill-lock"
              viewBox="0 0 16 16"
            >
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
            </svg>
            <span className="navbar-brand fw-bold fs-3 permanent-marker-regular">
              <span>{username}</span>
            </span>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/home/features"
                  >
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/home/contact">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/home/changePws">
                    Change Password
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    class="btn btn-sm mt-1 me-2 text-white"
                    onClick={handleSigout}
                    style={{ backgroundColor: "#4d4b4b" }}
                  >
                    <span>Sign out </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* input box */}
        <div
          className="d-flex align-items-center justify-content-center roboto-regular"
          style={{
            height: "90vh",
            background: "linear-gradient(135deg, #3f2b96, #a8c0ff)",
            color: "#fff",
          }}
        >
          <div
            className="rounded col-11 col-md-10 col-lg-6 px-4 py-4"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "1rem",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              color: "#fff",
            }}
          >
            <h3 className="text-center fw-bold mb-4">
              Lock It Up
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-database-fill-lock ms-2"
                viewBox="0 0 16 16"
              ></svg>
            </h3>

            <form
              onSubmit={(e) =>
                handleSubmit(e, "submit_loading", "submit_content")
              }
              method="POST"
            >
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label text-white"
                >
                  Enter User Identifier
                </label>
                <input
                  type="text"
                  name="user_indentifier"
                  className="form-control"
                  style={{ backgroundColor: "#a0ebc0" }}
                  placeholder="eg: username, phone no, email id"
                  autoComplete="off"
                />
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label text-white"
                >
                  Enter Password
                </label>
                <div className="col-lg-8 col-12 ps-2 pe-0 row">
                  <div className="col-9 pe-0">
                    <input
                      type="password"
                      name="pws"
                      value={pws}
                      onChange={(e) => setPws(e.target.value)}
                      className="form-control fs-6"
                      style={{ backgroundColor: "#a0ebc0" }}
                      placeholder="*************"
                    />
                  </div>
                  <div
                    className="col-2 px-2 text-center pt-1 ms-2 border rounded btn"
                    id="copy"
                    onClick={handleCopy}
                    style={{ backgroundColor: "white" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-copy"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="col-lg-4 col-12 mt-2 mt-lg-0 ps-2 ms-auto">
                  <button
                    className="btn btn-light col-12"
                    type="button"
                    onClick={() =>
                      randomPws("generate_pws_loading", "generate_pws_content")
                    }
                  >
                    <div id="generate_pws_loading"></div>
                    <span id="generate_pws_content">Generate Password</span>
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="urlInput" className="form-label text-white">
                  Enter U.R.L.
                </label>
                <input
                  type="text"
                  name="url"
                  className="form-control fs-7"
                  style={{ backgroundColor: "#a0ebc0" }}
                  placeholder="eg: https://xyz.com/signin"
                />
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-light fw-semibold" type="submit">
                  <div id="submit_loading"></div>
                  <div id="submit_content">
                    Save
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-down ms-1"
                      viewBox="0 0 16 16"
                    ></svg>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* <div className='my-4"'>
              <h1 className='text-center roboto-regular'>User Information Table</h1>
            </div> */}
        {/* <table class="table table-bordered table-hover table-responsive" id="table_content">
                <caption>User Account Database</caption>
                <thead className='table-primary'>
                  <tr>
                    <th scope="col">S. No.</th>
                    <th scope="col">URL</th>
                    <th scope="col">USERNAME IDENTIFIER</th>
                    <th scope="col">PASSWORD</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      data.map((obj,index)=>{
                        return (
                          <tr>
                            <th scope={`${index}`}>{index+1}</th>
                            <td><a href={obj.url}  className='text-dark'>{obj.url}</a></td>
                            <td>{obj.user_indentifier}</td>
                            <td>
                              {tablepws==index?table_pws_fn(obj.pws):<span onClick={()=>setTablepws(index)} className='text-primary btn m-0 p-0 text-start ms-2'>view</span>}
                            </td>
                            <td className='ms-2 btn m-0 p-0'>
                              <div onClick={()=>deleteTablerow(obj.url,`delete_row_${index}_loading`,`delete_row_${index}_content`)} id={`delete_row_${index}_loading`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16" id={`delete_row_${index}_content`}>
                                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                </svg>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                </tbody>
              </table> */}

        {/* table */}
        <div
          className="container-fluid d-flex flex-column"
          style={{ background: "#1e1e2f", minHeight: "100vh" }}
        >
          <div className="text-center pt-5" id="sort_by">
            <span className="ms-2 text-white fs-3">Sort By :</span>
            <div className="ms-1 d-inline">
              <select
                class="form-select form-select-sm d-inline"
                aria-label=".form-select-sm example"
                name="sort"
                style={{ width: "10vw" }}
                onChange={(e) => handleSort(e)}
              >
                <option value="0">Recently</option>
                <option value="1">URL</option>
                <option value="2">User Indentifier</option>
              </select>
            </div>
          </div>
          <div className="rounded py-5">
            {data.length == 0 ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-white"></div>
              </div>
            ) : (
              data.map((obj, index) => (
                <div
                  className="col-10 col-md-8 mx-auto rounded-4 p-4 row my-4"
                  style={{
                    background: "rgba(36, 36, 62, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(10px)",
                    color: "#f8f9fa", // light text
                    transform:
                      "perspective(1000px) rotateX(1deg) rotateY(1deg)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  key={index}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "scale(1.02) perspective(1000px) rotateX(1deg) rotateY(1deg)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 40px rgba(0, 0, 0, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(1000px) rotateX(1deg) rotateY(1deg)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0, 0, 0, 0.5)";
                  }}
                >
                  <div className="row col-md-8">
                    <div className="d-flex align-items-center mb-2">
                      <span>🔗</span>
                      <a
                        href={obj.url}
                        className="mx-2 text-decoration-none text-light fw-semibold"
                      >
                        {obj.url}
                      </a>
                    </div>

                    <div className="d-flex align-items-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-person text-light"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                      </svg>
                      <span className="ms-2">{obj.user_indentifier}</span>
                    </div>

                    <div className="d-flex align-items-center">
                      <span className="me-2">🔒</span>
                      <div className="position-relative d-inline-block">
                        <span
                          className="d-inline-block text-light text-opacity-75"
                          style={{
                            filter: "blur(4px)",
                            transition: "all 0.3s",
                          }}
                        >
                          {obj.pws}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-light position-absolute top-0 start-0 w-100 h-100 opacity-0"
                          style={{
                            transition: "opacity 0.3s",
                            minWidth: "8vw",
                          }}
                          onMouseEnter={(e) =>
                            e.currentTarget.classList.remove("opacity-0")
                          }
                          onMouseLeave={(e) =>
                            e.currentTarget.classList.add("opacity-0")
                          }
                          onClick={async () => {
                            await navigator.clipboard.writeText(obj.pws);
                            notifySuccess("Copied!");
                          }}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex col-md-4 align-items-center justify-content-center">
                    <div
                      onClick={() =>
                        deleteTablerow(
                          obj.url,
                          `delete_row_${index}_loading`,
                          `delete_row_${index}_content`
                        )
                      }
                      id={`delete_row_${index}_loading`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-trash3 text-secondary"
                        viewBox="0 0 16 16"
                        id={`delete_row_${index}_content`}
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* developer */}
        <div className="fixed-bottom text-center roboto-bold bg-secondary">
          Developed By Arshad Shamim
        </div>
      </>
    );
  }
}

//nav bar:-
//  responsive nav bar;

//authorization :-
// first we authorize user for home page if they authorize then render page else render error page;

//signout:-
//  clear/delete session

//pws:-
//  if user click on generate pws button then call api for pws and upate pws state;
//  else user can also enter pws my self;
//  and on submit replace this pws state with e.target.pws.value;

//copy pws:-
//     await navigator.clipboard.writeText(pws);
//      copy pws and change bg-color after 1s (useing setTimeout) change bg-color to previous color;

//get username from session and display it;

//store data(form data):-
//  call api with data and token;
//  and according to status memeber of json display msg;

//updateData:-
//  upadte userdata array;
//  we call it at the time of render and handle submit;

//onClick of view Button:-
//  here a tablePws state conatain showable pws index;
//  and on click on view button we set index into tablePws variable;
//  on while rendering when index==tablePws so we display pws else display view

//table_pws_fn:-
//  when tablepws if -1 i.e. no pws view event then diaply view button
//  else then call this function whith pws and this return a pws anda hide button
//  on click hide button again table pws set -1;

// deleteTablerow:-
//   call api /user/data/delete?username=''&url='';
//   if data delete successfull display msg and update data;
//   else notify all kind of failyear msg;

//handleSort:-
// onchange in select input field we call this
//  after get sort by column name by  selected value;
//  call api with username and sort by column namae;
//  add server data in desired sorted manner;

//start_loading():-
//  eg <div>           #div1
//      <div> </div>    #div2
//    </div>
//   take id of both div and add spinner-border class and visually-hidden class in div1 and div respectively
// call by component handler function;

// finish_loading():-
//  eg <div>           #div1
//      <div> </div>    #div2
//    </div>
//  take id of both div and remove spinner-border class and visually-hidden class in div1 and div2 respectively;
// call by component handler function;
