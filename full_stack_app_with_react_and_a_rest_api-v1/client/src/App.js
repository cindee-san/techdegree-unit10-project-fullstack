import Courses from './components/Courses';
import Header from './components/Header';

function App() {
  fetch('http://localhost:5000/api/courses')
   .then(response => response.json())
   .then(data => console.log(data));

  return (
    <div>
      <Header />
        <Courses />
      </div>
  );
}

export default App;
