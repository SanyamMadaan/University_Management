import { useEffect, useState } from "react";
import { Faculty } from "../../services/api";

export default function AllFaculty() {
  const [faculties, setFaculties] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFaculties() {
      try {
        const response = await Faculty.getFaculty();
        if (Array.isArray(response.data.allFaculty)) {
          setFaculties(response.data.allFaculty);
        }
      } catch (err) {
        alert("Error fetching faculty data.");
      }
    }

    fetchFaculties();
  }, []);

  async function DeleteFaculty(facultyId: string, name: string) {
    const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmDelete) return;

    try {
      await Faculty.deleteFaculty(facultyId); // Assuming this function exists in `faculty` service
      alert(`${name} deleted successfully.`);
      setFaculties((prev) =>
        prev.filter((faculty) => faculty._id !== facultyId)
      );
    } catch (err) {
      alert("Error deleting faculty.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Faculty</h1>
      <div className="overflow-x-auto">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg">
          {faculties.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-700 text-left text-sm font-semibold">
                  <th className="p-3 border-b border-gray-600">Name</th>
                  <th className="p-3 border-b border-gray-600">Email</th>
                  <th className="p-3 border-b border-gray-600">Department</th>
                  <th className="p-3 border-b border-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((faculty, index) => (
                  <tr
                    key={faculty._id}
                    className="even:bg-gray-700 odd:bg-gray-800 hover:bg-gray-600"
                  >
                    <td className="p-3 border-b border-gray-700">
                      {faculty.name}
                    </td>
                    <td className="p-3 border-b border-gray-700">
                      {faculty.email}
                    </td>
                    <td className="p-3 border-b border-gray-700">
                      {faculty.department}
                    </td>
                    <td className="p-3 border-b border-gray-700">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={() => DeleteFaculty(faculty._id, faculty.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-400 py-4">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
