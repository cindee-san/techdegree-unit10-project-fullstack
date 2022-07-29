

function App() {
  fetch('http://localhost:5000/api/courses')
   .then(response => response.json())
   .then(data => console.log(data));

  return (
    <div>
      <div>New Course Updated Again Hello </div>
      <div> New Course Updated Again wassup </div>
      <div> New Course Updated Agan Hello </div>
      <div>Learn How to Be Truly Amazing</div>
      <div> Learn How to be Sanji </div>
      <div> Learn How to Balance </div>
      <div> L </div>
      <div> ketchup </div>
      <div>How to Cook Lasagna </div>
    </div>
  );
}

export default App;
