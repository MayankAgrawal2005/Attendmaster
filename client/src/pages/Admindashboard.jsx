
import React from 'react';
import { useSelector } from 'react-redux';
import { AdminHeader } from '../components/AdminHeader';
import { useState, useEffect } from 'react';
import { PiStudent } from "react-icons/pi";
import {
  FaBell,
  FaDownload,
  FaSearch,
  FaUserGraduate,
  FaChartLine,
  FaSchool,
} from 'react-icons/fa';

export const Admindashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
   const [teachers, setTeachers] = useState([]);
   const [refresh, setRefresh] = useState(false);
   const [classes, setClasses] = useState([]);
   const [students, setStudents] = useState([]);
   const adminId = currentUser._id;
   const [activities, setActivities] = useState([]);

   useEffect(() => {
  const loadActivities = () => {
    const saved = JSON.parse(localStorage.getItem("activities")) || [];
    setActivities(saved);
  };

  loadActivities();

  // 👇 LISTEN FOR STORAGE CHANGES
  window.addEventListener("storage", loadActivities);

  return () => {
    window.removeEventListener("storage", loadActivities);
  };
}, []);

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("activities")) || [];
  setActivities(saved);
}, []);

  const fetchTeachers = async () => {
      try {
        const res = await fetch(`/api/teacher/get-teachers/${adminId}`);
        const data = await res.json();
        setTeachers(data);
        console.log(data);
      } catch (error) {
        setError("Failed to load teachers");
        setTimeout(() => setError(""), 3000);
        
      }
    };


  
    const fetchClasses = async () => {
    try {
      const res = await fetch(`/api/class/all/${adminId}`);
      const data = await res.json();
      setClasses(data);
      console.log(data);
    } catch (error) {
      setError("Failed to load Classes");
    }
  };

  const fetchAllStudents = async () => {
  try {
    let allStudents = [];

    for (let cls of classes) {
      const res = await fetch(`/api/student/get-studentbyClass/${cls._id}`);
      const data = await res.json();

      allStudents = [...allStudents, ...data];
    }

    setStudents(allStudents);

  } catch (error) {
    setError("Failed to load students");
  }
};

const getStudentCountByClass = (classId) => {
  return students.filter(student => student.class === classId).length;
};


  
    useEffect(() => {
      fetchTeachers();
       fetchClasses();
    }, [refresh]);
 

    useEffect(() => {
  if (classes.length > 0) {
    fetchAllStudents();
  }
}, [classes]);


  
  const teacherCount = teachers.length;
  // const classCount = classes.length;
  // const studentCount = students.length;
   const stats = [
  {
    title: "Total Students",
    icon: FaUserGraduate,
    color: "text-violet-400",
    value:  students?.length || 0, // when you add students
  },
  {
    title: "Total Teachers",
    icon: FaUserGraduate,
    color: "text-green-400",
    value:  teachers?.length || 0, // when you add teachers
  },

  {
    title: "Total Classes",
    icon: FaSchool,
    color: "text-pink-400",
    value:  classes?.length || 0, // when you add classes
  },
];


const getIcon = (msg) => {
  if (msg.includes("Teacher")) return "👨‍🏫";
  if (msg.includes("Student")) return "🎓";
  if (msg.includes("Class")) return "🏫";
  return "📌";
};
  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">

      {/* SIDEBAR */}
      <div >
        <AdminHeader />
      </div>

      {/* MAIN */}
      <div className="flex-1 mt-12 p-6 space-y-6">

        {/* 🔥 TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="flex items-center gap-3 w-full md:w-[400px] bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            
            <p className=' shimmer-text hero-title bg-transparent outline-none w-full text-xl'>Admin Dashboard</p>
            {/* <input
              type="text"
              placeholder="Admin Dashboard"
              className="bg-transparent outline-none w-full text-sm"
            /> */}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-gray-400 hidden sm:block">
              {new Date().toDateString()}
            </p>

            <FaBell className="cursor-pointer" />

            
          </div>

        </div>

        {/* 🔥 WELCOME BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

          <h1 className="text-xl sm:text-2xl font-semibold">
            Welcome back, <span className="text-violet-400">{currentUser?.username}</span>
          </h1>

          <div className="flex gap-3 flex-wrap">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              ● System Online
            </span>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              ● -- Classes
            </span>
            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
              ● -- Alerts
            </span>
          </div>

        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {stats.map((item, i) => {

            const Icon = item.icon;

            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition"
              >
                <Icon className={`text-2xl mb-3 ${item.color}`} />

                <h3 className="text-gray-400 text-sm">{item.title}</h3>

                {/* REAL DATA WILL COME */}
                <p className="text-3xl font-bold mt-2">{item.value}</p>

                <div className="mt-4 h-[40px] bg-white/5 rounded-lg"></div>
              </div>
            );
          })}

        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">

          {/* LEFT */}
         <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">

  <div className="flex justify-between mb-4">
    <h2 className="text-lg font-semibold">Overview </h2>
    {/* <span className="text-violet-400 cursor-pointer">View All →</span> */}
  </div>

  {classes.length === 0 ? (
    <div className="text-gray-500 text-center py-10">
      No class data available
    </div>
  ) : (
    <div className="space-y-4">
      {classes.map((cls) => {
        const studentCount = getStudentCountByClass(cls._id);

        return (
          <div
            key={cls._id}
            className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            {/* LEFT: Class Info */}
            <div>
              <h3 className="text-white font-semibold">{cls.name}</h3>
              <p className="text-gray-400 text-sm">
                {studentCount} Students
              </p>
            </div>

            {/* RIGHT: Small Indicator */}
            <div className="text-violet-400 font-bold">
              {studentCount}
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>

          {/* RIGHT */}
        







        </div>

      </div>
    </div>
  );
};