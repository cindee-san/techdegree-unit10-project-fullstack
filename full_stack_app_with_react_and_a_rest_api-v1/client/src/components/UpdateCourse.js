import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context";
import { Buffer } from "buffer";

export default function UpdateCourse() {
  // grabs id from current url
  const { id } = useParams();
  // manages state of course elements
  const [course, setCourse] = useState([]);
  const [error, setError] = useState("");

  const url = `http://localhost:5000/api/courses/${id}`;

// manages state of loading button
  const [isLoading, setIsLoading] = useState(false);

  // uses context from global state
  const context = useContext(Context);
  
   // navigates user to a specified path
  const navigate = useNavigate();

  useEffect(() => {
    //  gets a course from the database by id
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => response.json())
      .then((json) => setCourse(json))
      .catch((err) => console.log("Oh noes!", err))
      
  }, [id]);

  // should manage the state of the course input fields as user types
  // needed to change the name of the input field to match the name of the corresspondng input field in the fetch request.
  const onChange = (e) => {
    console.log('onchange')
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // should submit the form, updating the course elements
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateCourse = {
      title: course.title,
      description: course.description,
      estimatedTime: course.estimatedTime,
      materialsNeeded: course.materialsNeeded,
    };

    setIsLoading(true);

    // fetch request to update the course, with authorization
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`
          ).toString("base64"),
      },
      body: JSON.stringify({
        ...updateCourse,
        userId: parseInt(context.authenticatedUser.id),
      }),
    })
    // checks if the response went through to the API
      .then((response) => {
        if (response.ok) {
          console.log("course updated");
          console.log(updateCourse);
          setIsLoading(false);
          navigate(`/courses/${id}`);
        } else {
          setIsLoading(false);
          console.log(response.statusText);
          console.log(response.body);
          throw new Error(response.status);
        }
      })
      .catch(err => {
        setError(err)
      })
     
  };
  
  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {error && (
                <div className="validation--errors">
                  <h3>Validation Errors</h3>
                  <ul>
                    {course.title === "" && (
                      <li>Please provide a value for "Title"</li>
                    )}
                    {course.description === "" && (
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
                name="title"
                type="text"
                value={course.title}
                onChange={onChange}
              ></input>
              {course.User && (
                <p>
                  By: {course["User"]["firstName"]} {course["User"]["lastName"]}
                </p>
              )}
              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="description"
                value={course.description}
                onChange={onChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={course.estimatedTime}
                onChange={onChange}
              ></input>

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={course.materialsNeeded}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
          {!isLoading && (
                  <button className="button" type="submit">
                    Update Course
                  </button>
                )}
                {isLoading && (
                  <button className="button" type="submit">
                    Updating Course...
                  </button>
                )}
          <button className="button button-secondary">
            <Link to="/">Cancel</Link>
          </button>
        </form>
      </div>
    </main>
  );
}
