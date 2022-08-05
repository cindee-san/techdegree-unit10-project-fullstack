import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function CourseDetail() {
  const [course, setCourse] = useState({});
  const { id } = useParams();

  console.log(course);

  useEffect(() => {
    //  gets a course from the database by id
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => response.json())
      .then(json => setCourse(json))
      .catch((err) => console.log("Oh noes!", err));
  }, [id]);

  return (
        <main>
          <div className="actions--bar">
            <div className="wrap">
              <Link className="button" to={`/courses/${course.id}/update`}>
                Update Course
              </Link>
              <Link className="button" to={`/courses/${course.id}/delete`}>
                Delete Course
              </Link>
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
                 { course.User && (
                     <p>
                    By: {course['User']['firstName']} { course['User']['lastName'] }
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
