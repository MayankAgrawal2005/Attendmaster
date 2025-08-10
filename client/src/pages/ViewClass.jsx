
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';

export const ViewClass = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState(null);
  const classId = params.classId;

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`/api/class/getClassById/${classId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
        } else {
          setClassData(data);
        }
      } catch (err) {
        setError("Failed to fetch class data");
      }
    };
    fetchClass();
  }, [classId]);

  if (!classData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-slate-200 shadow-xl">
        <AdminHeader />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-white border border-gray-200 shadow-xl">
        {/* Header */}
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          {classData.name || ''}
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Subjects & Teachers */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md border">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              📖 Subjects & Assigned Teachers
            </h3>
            {classData.subjects?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-md bg-white shadow-md">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">📌 Subject Name</th>
                      <th className="py-3 px-4 text-left">👨‍🏫 Assigned Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classData.subjects.map((subject, index) => (
                      <tr key={subject._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-3 px-4 border-b">{subject.name}</td>
                        <td className="py-3 px-4 border-b">
                          {subject.teacher ? (
                            <span className="text-blue-600 font-medium">{subject.teacher.name}</span>
                          ) : (
                            <span className="text-gray-500">No teacher assigned</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No subjects assigned.</p>
            )}
          </div>

          {/* Students */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md border">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">🎓 Students</h3>
            {classData.students?.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {classData.students.map((student) => (
                  <li
                    key={student._id}
                    className="p-3 bg-white border rounded shadow text-gray-800 flex items-center justify-between"
                  >
                    <span>
                      👤 <strong>{student.name}</strong>
                    </span>
                    <span className="text-sm text-gray-500">({student.enrollmentNumber})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No students enrolled.</p>
            )}
          </div>
        </div>

        {/* Feedback Messages */}
        {error && <p className="text-red-500 mt-6">{error}</p>}
        {successMessage && <p className="text-green-500 mt-6">{successMessage}</p>}
      </div>
    </div>
  );
};
