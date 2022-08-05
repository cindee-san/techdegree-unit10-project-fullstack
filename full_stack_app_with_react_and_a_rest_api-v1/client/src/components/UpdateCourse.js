import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context";
import { Buffer } from "buffer";

// will need context from courses:id

export default function UpdateCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
  });
  const url = `http://localhost:5000/api/courses/${id}`;

  // const [isLoading, setIsLoading] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    //  gets a course from the database by id
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => response.json())
      .then((json) => setCourse(json))
      .catch((err) => console.log("Oh noes!", err));
  }, [id]);

  const onChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateCourse = {
      title: course.title,
      description: course.description,
      estimatedTime: course.estimatedTime,
      materialsNeeded: course.materialsNeeded,
    };

    // setIsLoading(true);

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
      .then((response) => {
        if (response.ok) {
          console.log("course updated");
          console.log(updateCourse);
          // setIsLoading(false);
        } else if (!response.ok) {
          console.log(response.statusText);
          console.log(response.body);
        } else {
          throw new Error(response.status);
        }
      })
      .then(navigate(`/courses/${id}`));
  };
  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
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
                name="courseDescription"
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
          <button className="button" type="submit">
            Update Course
          </button>
          <button className="button button-secondary">
            <Link to="/">Cancel</Link>
          </button>
        </form>
      </div>
    </main>
  );
}
