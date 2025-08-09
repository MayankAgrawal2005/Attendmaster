// import React from 'react'
// import { useState,useEffect } from 'react';
// import { TeacherHeader } from './TeacherHeader';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// export const TeacherAttendance = () => {

//       const navigate = useNavigate();
//     const {currentUser} = useSelector(state=>state.user);
//    console.log('currentUser is',currentUser);

// const [currentTime,setCurrentTime]=useState(new Date());

//  // teacher data
//    const [teacherData, setTeacherData] = useState(null);

// // jo subject teacher ko assign hai 
// const [assignedSubjects, setAssignedSubjects] = useState([]);

// // class nikali derived subject me se
// const [classes, setClasses] = useState([]);

// // selected class 
// const [selectedClass, setSelectedClass] = useState("");

// // and subject
// const [filteredSubjects, setFilteredSubjects] = useState([]);
// const [selectedSubject, setSelectedSubject] = useState("");

//  // date and subject attendance   

//  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

//  const [students, setStudents] = useState([]);
//  const [attendanceRecords, setAttendanceRecords] = useState([]);
  
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const [searchEnrollment, setSearchEnrollment] = useState('');
//   const [searchMessage, setSearchMessage] = useState('');

    
//     // 1 fetch teacher data 

//     useEffect(()=>{

//         const fetchTeacherData = async()=>{

//             if (!currentUser?._id) return; 

//             try{

//                 setLoading(true);
//                 // console.log("Fetching teacher data for user:", currentUser._id);

//                 const res = await fetch (`/api/teacher/get-teacher/${currentUser?._id}`);
//                 const data = await res.json();
//                 if(data.success === false){
//                     console.log(data.message);
//                  }
    
//                 console.log('fetch data is',data);
//                 setTeacherData(data);
//                 setAssignedSubjects(data.assignedSubjects || []);

//                 const uniqueClasses = [];
//                 (data.assignedSubjects || []).forEach((subj) => {
//                   if (Array.isArray(subj.classId)) {
//                     subj.classId.forEach((cls) => {
//                       // Only add if not already in uniqueClasses
//                       if (!uniqueClasses.some((item) => item._id === cls._id)) {
//                         uniqueClasses.push(cls);
//                       }
//                     });
//                   }
//                 });
//                 setClasses(uniqueClasses);

//             }catch(err){
//                 setError('Failed to load teacher data');
//             }

//             finally{
//                 setLoading(false);
//             }

//          } 
//         fetchTeacherData();

//     },[currentUser?._id])

// // when teacher selects a class filter the assigned subjects for that class

// console.log('teacher data is',teacherData);
// console.log('currentUser is',currentUser);
// console.log('subjects is',assignedSubjects);
// console.log('class is',classes);

// // teacher select karta hai class , uske baad student fetch karna
// // and filter subject 


// const handleClassChange = async (e) => {
//   const classId = e.target.value;
//   setSelectedClass(classId);

//   // Filter the assigned subjects to those that have classId in their subj.classId array
//   const filtered = assignedSubjects.filter((subj) =>
//     Array.isArray(subj.classId) && subj.classId.some((c) => c._id === classId)
//   );
//   setFilteredSubjects(filtered);
//   setSelectedSubject("");

//   // Now fetch students of that class
//   try {
//     setLoading(true);
//     const res = await fetch(`/api/class/getClassById/${classId}`); // e.g. GET /api/classes/:classId
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to load students");

//     // data.students -> [ { _id, name }, ... ]
//     setStudents(data.students || []);

    
//     // Initialize attendanceRecords as "Absent"
//     const initRecords = (data.students || []).map((stu) => ({
//       studentId: stu._id,
//       status: "Absent",
//       name:stu.name,
//       enrollment:stu.enrollmentNumber,
//     }));
//     setAttendanceRecords(initRecords);

//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };


// // select subject from filterted subjects

// const handleSubjectChange = (e) => {
//   setSelectedSubject(e.target.value);
// };

// console.log('students is',students);
// console.log('attendance records is',attendanceRecords);

// // toggle karna attendance ko present ya absent 

// const handleToggleStatus = (studentId) => {
//   setAttendanceRecords((prev) =>
//     prev.map((rec) =>
//       rec.studentId === studentId
//         ? { ...rec, status: rec.status === "Present" ? "Absent" : "Present" }
//         : rec
//     )
//   );
// };

// const handleSelectAll = ()=>{
//   const allPresent = attendanceRecords.every((rec)=>rec.status==='Present');
//   setAttendanceRecords((prev)=>
//   prev.map((rec)=>({
//     ...rec,
//     status:allPresent ? 'Absent':'Present',
//   })))
// }



// const handleSubmitAttendance = async () => {
//   if (!selectedClass || !selectedSubject || !date) {
//     return alert("Please select class, subject, and date!");
//   }

//   try {
//     setLoading(true);
//     const payload = {
//       classId: selectedClass,
//       subjectId: selectedSubject,
//       teacherId: currentUser._id,
//       date,
//       records: attendanceRecords,
//     };

//     const res = await fetch("/api/attendance/mark-attendance", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     const resultData = await res.json();
//     if (!res.ok) throw new Error(resultData.message || "Failed to mark attendance");

//     alert("Attendance marked successfully!");
//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };

// const handleSearchEnrollment = () => {
//   // Split the input by commas and trim whitespace
//   const enrollmentList = searchEnrollment.split(',').map((enrollment) => enrollment.trim());

//   let foundStudents = [];
//   let notFoundEnrollments = [];

//   enrollmentList.forEach((enrollment) => {
//     // Format enrollment number to 3 digits
//     const formattedEnrollment = enrollment.padStart(3, '0');

//     // Find the student with the matching enrollment number
//     const student = students.find(
//       (stu) => stu.enrollmentNumber.endsWith(formattedEnrollment)
//     );

//     if (student) {
//       // Mark the student as present
//       handleToggleStatus(student._id);
//       foundStudents.push(student.name);
//     } else {
//       notFoundEnrollments.push(formattedEnrollment);
//     }
//   });

//   // Set search message
//   let message = '';
//   if (foundStudents.length > 0) {
//     message += `Attendance marked for: ${foundStudents.join(', ')}. `;
//   }
//   if (notFoundEnrollments.length > 0) {
//     message += `Enrollment not found for: ${notFoundEnrollments.join(', ')}.`;
//   }
 
        
//     setSearchMessage(message);

//     setTimeout(()=>{
//       setSearchMessage('');
//     },5000);
 
 
//   setSearchEnrollment('');
 
// };




// const presentStudentsCount = attendanceRecords.filter(
//   (rec)=>rec.status ==='Present'
// ).length;

//   return (

//     <div className='flex space-x-8'>

//     <div className='w-64  overflow-y-auto bg-white shadow-xl'>
    
//         <TeacherHeader/>
//         </div>

//         <div className="flex-1 min-h-screen border flex-wrap border-gray-200 shadow-2xl bg-white p-6 text-black">
//         <h1 className="text-2xl font-bold p-3 mb-4">Attendance Management</h1>

//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}


//        <div className='mt-6  p-3 w-full overflow-y-auto border border-gray-300 rounded-2xl'>

//             <h className='text-2xl font-semibold p-3'>Mark Attendance </h>
//             <p className='p-3 text-gray-500'>Record Attendance for today or a specific date</p>
//             <div className='flex  space-x-10 mt-4 ml-5'>

            
//          {/* 1) Select Class */}
//         <div className=" ">
//           <label className="block mb-1 font-semibold">Select Class:</label>
//           <select
//             value={selectedClass}
//             onChange={handleClassChange}
//             className="border border-gray-300 p-2 rounded w-80"
//           >
//             <option value="" disabled>
//               -- Choose a Class --
//             </option>
//             {classes.map((cls) => (
//               <option key={cls._id} value={cls._id}>
//                 {cls.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* 2) Select Subject (Filtered by chosen class) */}
//         {filteredSubjects.length > 0 && (
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Select Subject:</label>
//             <select
//               value={selectedSubject}
//               onChange={handleSubjectChange}
//               className="border border-gray-300 p-2 rounded w-80"
//             >
//               <option value="" disabled>
//                 -- Choose a Subject --
//               </option>
//               {filteredSubjects.map((subj) => (
//                 <option key={subj._id} value={subj._id}>
//                   {subj.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* 3) Select Date */}
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Select Date:</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="border border-gray-300 p-2 rounded w-80"
//           />
//         </div>


// </div>


//   <div className='mt-2  p-5  w-full   border border-gray-300 rounded-2xl'>


//      {/* Search Bar */}
//      {students.length > 0 && (
//               <div className="mb-4">
//                 <label className="block mb-1 font-semibold">Mark attendance by Enrollment (Last 3 Digits):</label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={searchEnrollment}
//                     onChange={(e) => setSearchEnrollment(e.target.value)}
//                     className="border border-gray-300 p-2 rounded w-150"
//                     placeholder="Enter Enrollment ex 111,112,121"
//                   />
//                   <button
//                     onClick={handleSearchEnrollment}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   >
//                     Submit
//                   </button>
//                 </div>
//                 {searchMessage && <p className="text-sm text-gray-600 mt-2">{searchMessage}</p>}
//               </div>
//             )}

  
//         {/* 4) Display Students (CheckBoxes) */}
//         {students.length === 0 ? (
//           <p> No students in the class</p>
//         ) : (

//           <div className="mb-4">
          
//             <h2 className="font-semibold mb-2">Students in this Class:</h2>
            
//             <div className='flex flex-row-reverse mr-18'>

//            <button
//                   onClick={handleSelectAll}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600  mb-4"
//                 >
//                   {attendanceRecords.every((rec) => rec.status === 'Present')
//                     ? 'Unselect All'
//                     : 'Select All'}
//                 </button>
//                 </div>
//                  <table className='w-full ml-1 border  border-gray-300  bg-white  shadow-md'>

//                  <thead className=' text-gray-600  border border-gray-300'>
//         <tr>
//           <th className='p-3 text-left'>Name</th>
//           <th className='p-3 text-left'>Enrollment</th>
//           <th className='p-3 text-lett'>Attendance</th>
          
//         </tr>
//       </thead>
 
//          <tbody>
//               {students.map((stu) => {
//                 const record = attendanceRecords.find((r) => r.studentId === stu._id);
//                 const isPresent = record?.status === "Present";

//                  return(
//                   <tr key={stu._id} className='border-b border-gray-200 hover:bg-gray-50 transition-colors'>

//                    <td className=" p-3   text-black">{stu.name}</td>
//                    <td className=" p-3   text-black">{stu.enrollmentNumber}</td>
                   
//                    <td className=" p-3  flex justify-center text-black">
//                     <input
//                      className='w-5 h-5 '
                     
//                       type="checkbox"
//                       checked={isPresent}
//                       onChange={() => handleToggleStatus(stu._id)}
//                     />

// {/* <span className="text-sm text-gray-500">
//                       ({isPresent ? "Present" : "Absent"})
//                     </span> */}
//                    </td>
                    
//                   </tr>

//                  );
                  
                
//               })}
//               </tbody>
            
//               </table>

//               <p className="text-lg font-semibold mt-4 mb-4">
//                   Present Students: {presentStudentsCount} / Total Students: {students.length}
//                 </p>
//           </div>
          
//         )}

        
//       {/* 5) Submit Attendance */}  
//        {students.length > 0 && (
//           <button
//             onClick={handleSubmitAttendance}
//             className="bg-blue-500 text-white px-4  py-2 rounded hover:bg-blue-600"
//           >
//             Mark Attendance
//           </button>
//         )}
// </div>
// </div>


//       </div>


//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import { TeacherHeader } from './TeacherHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const TeacherAttendance = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [teacherData, setTeacherData] = useState(null);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchEnrollment, setSearchEnrollment] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  // Fetch teacher data
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!currentUser?._id) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/teacher/get-teacher/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) return;

        setTeacherData(data);
        setAssignedSubjects(data.assignedSubjects || []);

        const uniqueClasses = [];
        (data.assignedSubjects || []).forEach((subj) => {
          if (Array.isArray(subj.classId)) {
            subj.classId.forEach((cls) => {
              if (!uniqueClasses.some((item) => item._id === cls._id)) {
                uniqueClasses.push(cls);
              }
            });
          }
        });
        setClasses(uniqueClasses);
      } catch {
        setError('Failed to load teacher data');
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, [currentUser?._id]);

  // Class change handler
  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);

    const filtered = assignedSubjects.filter((subj) =>
      Array.isArray(subj.classId) && subj.classId.some((c) => c._id === classId)
    );
    setFilteredSubjects(filtered);
    setSelectedSubject('');

    try {
      setLoading(true);
      const res = await fetch(`/api/class/getClassById/${classId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load students');

      setStudents(data.students || []);
      setAttendanceRecords(
        (data.students || []).map((stu) => ({
          studentId: stu._id,
          status: 'Absent',
          name: stu.name,
          enrollment: stu.enrollmentNumber,
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleToggleStatus = (studentId) => {
    setAttendanceRecords((prev) =>
      prev.map((rec) =>
        rec.studentId === studentId
          ? { ...rec, status: rec.status === 'Present' ? 'Absent' : 'Present' }
          : rec
      )
    );
  };

  const handleSelectAll = () => {
    const allPresent = attendanceRecords.every((rec) => rec.status === 'Present');
    setAttendanceRecords((prev) =>
      prev.map((rec) => ({
        ...rec,
        status: allPresent ? 'Absent' : 'Present',
      }))
    );
  };

  const handleSubmitAttendance = async () => {
    if (!selectedClass || !selectedSubject || !date) {
      return alert('Please select class, subject, and date!');
    }
    try {
      setLoading(true);
      const payload = {
        classId: selectedClass,
        subjectId: selectedSubject,
        teacherId: currentUser._id,
        date,
        records: attendanceRecords,
      };
      const res = await fetch('/api/attendance/mark-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const resultData = await res.json();
      if (!res.ok) throw new Error(resultData.message || 'Failed to mark attendance');

      alert('Attendance marked successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchEnrollment = () => {
    const enrollmentList = searchEnrollment.split(',').map((en) => en.trim());
    let foundStudents = [];
    let notFoundEnrollments = [];

    enrollmentList.forEach((enrollment) => {
      const formattedEnrollment = enrollment.padStart(3, '0');
      const student = students.find((stu) =>
        stu.enrollmentNumber.endsWith(formattedEnrollment)
      );
      if (student) {
        handleToggleStatus(student._id);
        foundStudents.push(student.name);
      } else {
        notFoundEnrollments.push(formattedEnrollment);
      }
    });

    let message = '';
    if (foundStudents.length > 0) {
      message += `Attendance marked for: ${foundStudents.join(', ')}. `;
    }
    if (notFoundEnrollments.length > 0) {
      message += `Enrollment not found for: ${notFoundEnrollments.join(', ')}.`;
    }

    setSearchMessage(message);
    setTimeout(() => setSearchMessage(''), 5000);
    setSearchEnrollment('');
  };

  const presentStudentsCount = attendanceRecords.filter(
    (rec) => rec.status === 'Present'
  ).length;

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 w-full">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-xl">
        <TeacherHeader />
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-screen border border-gray-200 shadow-2xl bg-white p-4 sm:p-6 text-black">
        <h1 className="text-xl sm:text-2xl mt-10 text-center font-bold mb-4">Attendance Management</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Selection controls */}
        <div className="mt-4 p-3 w-full border border-gray-300 rounded-2xl space-y-4">
          <h2 className="text-lg sm:text-2xl font-semibold">Mark Attendance</h2>
          <p className="text-gray-500">Record Attendance for today or a specific date</p>
          <div className="flex flex-col lg:flex-row lg:space-x-10 space-y-4 lg:space-y-0">
            {/* Class */}
            <div>
              <label className="block mb-1 font-semibold">Select Class:</label>
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="border border-gray-300 p-2 rounded w-full sm:w-80"
              >
                <option value="" disabled>
                  -- Choose a Class --
                </option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            {filteredSubjects.length > 0 && (
              <div>
                <label className="block mb-1 font-semibold">Select Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="border border-gray-300 p-2 rounded w-full sm:w-80"
                >
                  <option value="" disabled>
                    -- Choose a Subject --
                  </option>
                  {filteredSubjects.map((subj) => (
                    <option key={subj._id} value={subj._id}>
                      {subj.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date */}
            <div>
              <label className="block mb-1 font-semibold">Select Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full sm:w-80"
              />
            </div>
          </div>
        </div>

        {/* Search and Students */}
        <div className="mt-4 p-3 w-full border border-gray-300 rounded-2xl space-y-4">
          {students.length > 0 && (
            <div>
              <label className="block mb-1 font-semibold">
                Mark attendance by Enrollment (Last 3 Digits):
              </label>
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <input
                  type="text"
                  value={searchEnrollment}
                  onChange={(e) => setSearchEnrollment(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full sm:w-60"
                  placeholder="Enter Enrollment ex 111,112,121"
                />
                <button
                  onClick={handleSearchEnrollment}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
                >
                  Submit
                </button>
              </div>
              {searchMessage && <p className="text-sm text-gray-600 mt-2">{searchMessage}</p>}
            </div>
          )}

          {students.length > 0 && (
            <>
              <div className="flex justify-end">
                <button
                  onClick={handleSelectAll}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
                >
                  {attendanceRecords.every((rec) => rec.status === 'Present')
                    ? 'Unselect All'
                    : 'Select All'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 bg-white shadow-md">
                  <thead className="text-gray-600 border border-gray-300">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Enrollment</th>
                      <th className="p-3 text-left">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((stu) => {
                      const record = attendanceRecords.find((r) => r.studentId === stu._id);
                      const isPresent = record?.status === 'Present';
                      return (
                        <tr
                          key={stu._id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-3">{stu.name}</td>
                          <td className="p-3">{stu.enrollmentNumber}</td>
                          <td className="p-3 flex justify-center">
                            <input
                              className="w-5 h-5"
                              type="checkbox"
                              checked={isPresent}
                              onChange={() => handleToggleStatus(stu._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="text-lg font-semibold mt-4 mb-4">
                Present Students: {presentStudentsCount} / Total Students: {students.length}
              </p>

              <button
                onClick={handleSubmitAttendance}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Mark Attendance
              </button>
            </>
          )}

          {students.length === 0 && <p>No students in the class</p>}
        </div>
      </div>
    </div>
  );
};
