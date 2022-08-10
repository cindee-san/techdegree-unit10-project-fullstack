import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import { Buffer } from "buffer";
import ReactMarkdown from "react-markdown";

export default function CourseDetail() {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const context = useContext(Context);
  const navigate = useNavigate();

  console.log(course);

  useEffect(() => {
    //  gets a course from the database by id
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => response.json())
      .then((json) => setCourse(json))
      .catch((err) => console.log("Oh noes!", err));
  }, [id]);

  console.log(course);

  // takes a course id as an argument, sends a DELETE request to API
  // logs 'course deleted' to console
  // navigates to home page
  function deleteCourse(id) {
    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`
          ).toString("base64"),
      },
    })
      .then(console.log("course deleted"))
      .then(navigate("/"));
  }

  return (
    <main>

<div className="actions--bar">
        <div className="wrap">
        {/* //if there is a course user and that course user id matches the authenticated user id, allow user access to buttons that will update or delete course */}


          {course.User && context.authenticatedUser && context.authenticatedUser.id === course["User"]["id"] && (
            <React.Fragment>
              <Link className="button" to={`/courses/${course.id}/update`}>
                Update Course
              </Link>
              <button className="button" onClick={() => deleteCourse(id)}>
                Delete Course
              </button>
            </React.Fragment>
          )}
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
        </div>
      </div>



      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              {course.User && (
                <p>
                  By: {course["User"]["firstName"]} {course["User"]["lastName"]}
                </p>
              )}
             <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
