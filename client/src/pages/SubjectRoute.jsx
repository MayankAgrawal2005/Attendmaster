

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminHeader } from '../components/AdminHeader';
import { MdCancel } from 'react-icons/md';

export const SubjectRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [subjectData, setSubjectData] = useState({ name: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classData, setClassData] = useState({ name: '' });
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();
  const { classId } = useParams();

  const handleChange = (e) => {
    setSubjectData({ ...subjectData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/subject/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...subjectData, classId }),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      setIsModalOpen(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchClass = async () => {
      const res = await fetch(`/api/class/get-class/${classId}`);
      const data = await res.json();
      if (data.success === false) console.log(data.message);
      setClassData(data);
    };
    fetchClass();
  }, [classId]);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(`/api/subject/get-subjectbyClass/${classId}`);
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error('Invalid data format:', data);
        setTimeout(() => setError('Failed to load subjects.'), 3000);
        return;
      }
      setSubjects(data);
    } catch (error) {
      setError('Failed to load subjects');
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [isModalOpen]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-slate-200 shadow-xl">
        <AdminHeader />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Subject Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600"
          >
            + Add Subject
          </button>
        </div>

        {/* Subject list */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-1">{classData.name} - Subject List</h2>
          <p className="text-gray-500 mb-4">Manage and view all subjects in the system</p>

          {subjects.length === 0 ? (
            <p className="text-gray-600">No Subject added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Actions</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index} className="hover:bg-gray-100 border-b">
                      <td className="px-4 py-2 text-black">{subject.name}</td>
                      <td className="px-4 py-2">
                        <Link to={`/update-subject/${subject._id}`} state={{ classId }}>
                          <button className="bg-gray-200 hover:bg-gray-700 text-black px-4 py-1 rounded">
                            Update
                          </button>
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        <Link to={`/assign-subject-to-teacher/${subject._id}`}>
                          <button className="bg-blue-500 hover:bg-gray-700 text-white px-4 py-1 rounded">
                            Assign A Teacher
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)}>
                <MdCancel className="text-2xl text-gray-500 hover:text-red-500" />
              </button>
            </div>

            <h2 className="text-xl font-semibold text-center mb-2">Add New Subject</h2>
            <p className="text-sm text-center text-gray-500 mb-4">
              Enter the details of the new subject below
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                maxLength={30}
                placeholder="Subject Name"
                id="name"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
              >
                {loading ? 'Saving...' : 'Add Subject'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
