// const users = [
//   {
//     id: 1,
//     fullName: "John Doe",
//     destination: "Canada",
//     studyLevel: "Bachelor",
//     nationality: "Bangladeshi",
//     englishTest: "IELTS",
//     testScore: "7.0",
//     passportNumber: "A1234567",
//     email: "john@example.com",
//   },
//   {
//     id: 2,
//     fullName: "Jane Smith",
//     destination: "UK",
//     studyLevel: "Masters",
//     nationality: "Indian",
//     englishTest: "TOEFL",
//     testScore: "95",
//     passportNumber: "B9876543",
//     email: "jane@example.com",
//   },
// ];

// const Users = () => {
//   return (
//     <div className="flex">

//       <div className="flex-1 flex flex-col">

//         <main className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Students</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white shadow rounded overflow-hidden">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="p-3 text-left">ID</th>
//                   <th className="p-3 text-left">Full Name</th>
//                   <th className="p-3 text-left">Destination</th>
//                   <th className="p-3 text-left">Study Level</th>
//                   <th className="p-3 text-left">Nationality</th>
//                   <th className="p-3 text-left">English Test</th>
//                   <th className="p-3 text-left">Test Score</th>
//                   <th className="p-3 text-left">Passport Number</th>
//                   <th className="p-3 text-left">Email</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u) => (
//                   <tr key={u.id} className="border-b hover:bg-gray-50">
//                     <td className="p-3">{u.id}</td>
//                     <td className="p-3">{u.fullName}</td>
//                     <td className="p-3">{u.destination}</td>
//                     <td className="p-3">{u.studyLevel}</td>
//                     <td className="p-3">{u.nationality}</td>
//                     <td className="p-3">{u.englishTest}</td>
//                     <td className="p-3">{u.testScore}</td>
//                     <td className="p-3">{u.passportNumber}</td>
//                     <td className="p-3">{u.email}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Users;

import React, { useEffect, useState } from "react";
import BASE_URL from "../Api/ApiBaseUrl";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer 18|ybj64VEXs4lWEHIMGIfzCxsAOg12t781tM0E0zwC59f8edcc"
        );

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `${BASE_URL}/admin/all/students`,
          requestOptions
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="p-6">⏳ Loading students...</div>;
  if (!users.length) return <div className="p-6">❌ No students found</div>;

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <main className="p-4">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow rounded overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left whitespace-nowrap">ID</th>
                  <th className="p-3 text-left whitespace-nowrap">Full Name</th>
                  <th className="p-3 text-left whitespace-nowrap">Email</th>
                  <th className="p-3 text-left whitespace-nowrap">
                    Destination
                  </th>
                  <th className="p-3 text-left whitespace-nowrap">
                    Study Level
                  </th>
                  <th className="p-3 text-left whitespace-nowrap">
                    Nationality
                  </th>
                  <th className="p-3 text-left whitespace-nowrap">
                    English Test
                  </th>
                  <th className="p-3 text-left whitespace-nowrap">
                    Test Score
                  </th>
                  <th className="p-3 text-left whitespace-nowrap">
                    Passport Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 whitespace-nowrap">{u.id}</td>
                    <td className="p-3 whitespace-nowrap">{u.name || "-"}</td>
                    <td className="p-3 whitespace-nowrap">{u.email || "-"}</td>
                    <td className="p-3 whitespace-nowrap">
                      {u.destination || "-"}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {u.study_level || "-"}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {u.nationality || "-"}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {u.subject || "-"}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {u.testScore || "-"}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {u.passportNumber || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
