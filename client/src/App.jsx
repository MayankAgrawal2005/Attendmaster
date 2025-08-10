import { useState } from 'react';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import  {Home}  from "./pages/Home";
import  {Signin } from "./pages/Signin";
import  Signup from "./pages/Signup";
import { TeacherLogin } from './pages/TeacherLogin';
import { StudentLogin } from './pages/StudentLogin';
import { Login } from './pages/Login';
import { Admindashboard } from './pages/Admindashboard';
import { PrivateRoute } from './components/PrivateRoute';
import { Profile } from './pages/Profile';
// import { TeacherRoute } from './pages/teacherRoute';
import { TeacherRoute } from './pages/TeacherRoute';
import { UpdateTeacher } from './pages/UpdateTeacher';
import { ClassRoute } from './pages/ClassRoute';
import { UpdateClass } from './pages/UpdateClass';
import { StudentRoute } from './pages/StudentRoute';
import { UpdateStudent } from './pages/UpdateStudent';
import { SubjectRoute } from './pages/SubjectRoute';
import { UpdateSubject } from './pages/UpdateSubject';
import { AssingTeacher } from './pages/AssingTeacher';
import { AssingnClass } from './pages/AssingnClass';
import { ViewClass } from './pages/ViewClass';
import { Teacherdashboard } from './pages/Teacherdashboard';
import { TeacherProfile } from './pages/TeacherProfile';
import { TeacherAttendance } from './pages/TeacherAttendance';
import { AttendanceRecord } from './pages/AttendanceRecord';
import { Studentdashboard } from './pages/Studentdashboard';
import { StudentProfile } from './pages/StudentProfile';
import { StudentAttendance } from './pages/StudentAttendance';
function App() {


  return (
    <div>

    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/student-login" element={<StudentLogin/>}/>
        <Route path="/teacher-login" element={<TeacherLogin/>}/>


        <Route element={<PrivateRoute/>}>
        
        
        <Route path="/admin-dashboard" element={<Admindashboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/add-teacher" element={<TeacherRoute/>}/>
        <Route path="/update-teacher/:teacherId" element={<UpdateTeacher/>}/>
        <Route path="/add-class" element={<ClassRoute/>}/>
        <Route  path='update-class/:classId' element={<UpdateClass/>}/>
        <Route  path='add-student/:classId' element={<StudentRoute/>}/>
        <Route  path='update-student/:studentId' element={<UpdateStudent/>}/>
        <Route  path='add-subject/:classId' element={<SubjectRoute/>}/>
        <Route  path='update-subject/:subjectId' element={<UpdateSubject/>}/>
        <Route  path='assign-subject-to-teacher/:subjectId' element={<AssingTeacher/>}/>
        <Route  path='assign-teacher-to-class/:teacherId' element={<AssingnClass/>}/>
        <Route  path='view-class/:classId' element={<ViewClass/>}/>

        <Route path="/teacher-dashboard" element={<Teacherdashboard/>}/>
        <Route path="/teacherprofile" element={<TeacherProfile/>}/>
        <Route path="/teacherattendance" element={<TeacherAttendance/>}/>
        <Route path="/attendance-record" element={<AttendanceRecord/>}/>

        <Route path="/student-dashboard" element={<Studentdashboard/>}/>
        <Route path='/student-profile' element={<StudentProfile/>}/>
        <Route path='/student-attendance' element={<StudentAttendance/>}/>

         
      

        </Route>
        
          
      </Routes>
      
    </div>
  )
}

export default App
