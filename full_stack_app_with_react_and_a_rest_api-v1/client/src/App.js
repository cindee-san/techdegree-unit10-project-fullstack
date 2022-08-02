import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Courses from './components/Courses';
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

import withContext from './Context';
const UserSignUpWithContext = withContext(UserSignUp);



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path='/' element={<Courses />} />
          <Route path='/courses/create' element={<CreateCourse />} />
          <Route path='/courses/:id/update' element={<UpdateCourse />} />
          <Route path='/courses/:id' element={<CourseDetail />} />
          <Route path='/signin' element={<UserSignIn />} />
          <Route path='/signup' element={<UserSignUpWithContext />} />
          <Route path='/signout' element={<UserSignOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
