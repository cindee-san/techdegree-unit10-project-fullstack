import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Courses extends Component {
    
    constructor(){
        super();
        this.state = {
            courses: [],
        }
    };

async componentDidMount(){      
    // gets a list of all courses from the database
    // updates state of courses
    const api = 'http://localhost:5000/api/courses';
    const response = await fetch(api);
    const data = await response.json();
    this.setState({courses: data});
    }
  render() {
    const courses = this.state.courses;
    return (
        <main>
        <div className="wrap main--grid">
        {courses.map((course, index) => {
            return (
                <Link  key={index} className="course--module course--link" to={`/courses/${course.id}`} >
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            )
        })}
              
            <a className="course--module course--add--module" href="create-course.html">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </a>
        </div>
    </main>
    );
  }
}

