import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Consumer, Context } from "../Context";
import { Buffer } from "buffer";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const context = useContext(Context);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const createCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    setIsLoading(true);


    fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: { "Content-Type":"application/json",
      'Authorization':'Basic' + Buffer.from(`${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`).toString("base64")},
      body: JSON.stringify(createCourse),
    })
    .then(console.log(context.authenticatedUser.emailAddress))
    .then((response) => {
      if (response.ok) {
        console.log("new course added");
        console.log(createCourse);
        setIsLoading(false);
      } else if (!response.ok) {
        console.log(response.statusText);
        console.log(response.body);
      } else {
        throw new Error(response.status);
      }
    })
    .then((navigate('/')));
  };

  return (
    <Consumer>
      {(context) => {
        return (
          <main>
            <div className="wrap">
              <h2>Create Course</h2>
              {/* <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          <li>Please provide a value for "Title"</li>
          <li>Please provide a value for "Description"</li>
        </ul>
      </div> */}
              <form onSubmit={handleSubmit}>
                <div className="main--flex">
                  <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input
                      id="courseTitle"
                      name="courseTitle"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <p>By Joe Smith</p>

                    <label htmlFor="courseDescription">
                      Course Description
                    </label>
                    <textarea
                      id="courseDescription"
                      name="courseDescription"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                    />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      value={materialsNeeded}
                      onChange={(e) => setMaterialsNeeded(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                {!isLoading && (
                  <button className="button" type="submit">
                    Create Course
                  </button>
                )}
                {isLoading && (
                  <button className="button" type="submit">
                    Creating Course...
                  </button>
                )}
                <button className="button button-secondary">
                  <Link to="/">Cancel</Link>
                </button>
              </form>
            </div>
          </main>
        );
      }}
    </Consumer>
  );
}
