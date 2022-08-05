import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import { Buffer } from "buffer";

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

  function deleteCourse(id) {
    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`
          ).toString("base64")}}).then(console.log('course deleted')).then(navigate('/'));
    };

  

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${course.id}/update`}>
            Update Course
          </Link>
          <a className="button" onClick={() => deleteCourse(id)}>
            Delete Course
          </a>
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
              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <li>{course.materialsNeeded}</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
