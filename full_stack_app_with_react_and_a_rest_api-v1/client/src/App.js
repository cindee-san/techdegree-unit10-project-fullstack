import Courses from './components/Courses';

function App() {
  fetch('http://localhost:5000/api/courses')
   .then(response => response.json())
   .then(data => console.log(data));

  return (
    <Courses />
  );
}

export default App;
