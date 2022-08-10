import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Consumer, Context } from "../Context";
import { Buffer } from "buffer";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);

  const context = useContext(Context);
  const navigate = useNavigate();

  // gets current user, to make them the author of the course
  useEffect(() => {
    fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`
          ).toString("base64"),
      },
    })
      .then((response) => response.json())
      .then((json) => setUser(json))
      .catch((err) => {
        setError(err);
      });
  });

  // takes the submit event
  const handleSubmit = (e) => {
    e.preventDefault();

    // handles state of course elements
    const createCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    // turns on loading button
    setIsLoading(true);

    // fetch request to post the course to the database
    fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`
          ).toString("base64"),
      },
      body: JSON.stringify({
        ...createCourse,
        userId: parseInt(context.authenticatedUser.id),
      }),
    })
    // if the response is ok, creates the course, turns off loading button, 
    // and navigates user to the home page to see newly created course there
      .then((response) => {
        if (response.ok) {
          console.log("new course added");
          console.log(createCourse);
          setIsLoading(false);
          setError(null);
          navigate("/");
    // if the response is something else, turn off the loading button and throw an error
        } else {
          setIsLoading(false);
          throw new Error(
            `You are missing some information, so the request could not be sent: ${response.statusText}`
          );
        }
      })
    // catches error, sets the error to the error state and logs to console
      .catch((err) => {
        setError(err);
        console.log(error);
      });
  };

  return (
    <Consumer>
      {(context) => {
        return (
          <main>
            <div className="wrap">
              <h2>Create Course</h2>
              {error && (
                <div className="validation--errors">
                  <h3>Validation Errors</h3>
                  <ul>
                    {title === "" && (
                      <li>Please provide a value for "Title"</li>
                    )}
                    {description === "" && (
                      <li>Please provide a value for "Description"</li>
                    )}
                  </ul>
                </div>
              )}
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

                    <p>{`By: ${user.firstName} ${user.lastName}`}</p>

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
