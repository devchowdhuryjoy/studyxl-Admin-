
const users = [
  {
    id: 1,
    fullName: "John Doe",
    destination: "Canada",
    studyLevel: "Bachelor",
    nationality: "Bangladeshi",
    englishTest: "IELTS",
    testScore: "7.0",
    passportNumber: "A1234567",
    email: "john@example.com",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    destination: "UK",
    studyLevel: "Masters",
    nationality: "Indian",
    englishTest: "TOEFL",
    testScore: "95",
    passportNumber: "B9876543",
    email: "jane@example.com",
  },
];

const Users = () => {
  return (
    <div className="flex">
      
      <div className="flex-1 flex flex-col">
        
        <main className="p-6">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow rounded overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Full Name</th>
                  <th className="p-3 text-left">Destination</th>
                  <th className="p-3 text-left">Study Level</th>
                  <th className="p-3 text-left">Nationality</th>
                  <th className="p-3 text-left">English Test</th>
                  <th className="p-3 text-left">Test Score</th>
                  <th className="p-3 text-left">Passport Number</th>
                  <th className="p-3 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{u.id}</td>
                    <td className="p-3">{u.fullName}</td>
                    <td className="p-3">{u.destination}</td>
                    <td className="p-3">{u.studyLevel}</td>
                    <td className="p-3">{u.nationality}</td>
                    <td className="p-3">{u.englishTest}</td>
                    <td className="p-3">{u.testScore}</td>
                    <td className="p-3">{u.passportNumber}</td>
                    <td className="p-3">{u.email}</td>
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
