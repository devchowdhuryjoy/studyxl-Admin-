import React, { useState, useEffect } from "react";

const CommissionForm = () => {
  // --- HELPER: GET TOKEN ---
  const getAuthToken = () => {
    return localStorage.getItem("admin_token");
  };

  // --- STATES ---
  const [loading, setLoading] = useState(true);
  const [agentList, setAgentList] = useState([]);
  
  // Data States
  const [rawApplications, setRawApplications] = useState([]); 
  const [uniqueStudents, setUniqueStudents] = useState([]); 
  const [studentApps, setStudentApps] = useState([]); 

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false); 

  // Form Data
  const [formData, setFormData] = useState({
    agent_id: "",
    agent_name: "",
    student_id: "",
    student_name: "",
    application_id: "",
    university: "",
    program: "",
    tuition_fee: "",
    paid_amount: "",
    balance_due: "",
    payment_status: "unpaid",
    comm_percent: "" // 👈 FIXED: Backend expects 'comm_percent'
  });

  // --- 1. FETCH AGENTS ---
  useEffect(() => {
    const token = getAuthToken();
    fetch("http://127.0.0.1:8000/api/admin/all-user", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setAgentList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // --- 2. FETCH APPLICATIONS ---
  const handleAgentSelect = async (e) => {
    const selectedAgentId = e.target.value;
    const agent = agentList.find(a => String(a.id) === String(selectedAgentId));
    
    // Reset Form
    setFormData(prev => ({
      ...prev,
      agent_id: selectedAgentId,
      agent_name: agent ? agent.company_name : "",
      student_id: "",
      student_name: "",
      application_id: "",
      university: "",
      program: "",
      tuition_fee: "",
      paid_amount: "",
      balance_due: "",
      payment_status: "unpaid",
      comm_percent: "" // 👈 FIXED
    }));
    setUniqueStudents([]);
    setStudentApps([]);

    if (selectedAgentId) {
      setLoadingStudents(true);
      const url = `http://127.0.0.1:8000/api/admin/agent/${selectedAgentId}/all-aplication`;
      const token = getAuthToken();

      try {
        const response = await fetch(url, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          const apps = data.applications || [];
          setRawApplications(apps);

          const uniqueList = [];
          const map = new Map();
          for (const item of apps) {
            if (!map.has(item.student_id)) { 
                map.set(item.student_id, true);
                uniqueList.push({
                    id: item.student_id,
                    name: item.student_name
                });
            }
          }
          setUniqueStudents(uniqueList);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStudents(false);
      }
    }
  };

  // --- 3. HANDLE STUDENT SELECTION ---
  const handleStudentSelect = (e) => {
    const sId = e.target.value;
    const studentObj = uniqueStudents.find(s => String(s.id) === String(sId));
    
    const appsForThisStudent = rawApplications.filter(app => String(app.student_id) === String(sId));
    setStudentApps(appsForThisStudent);

    setFormData(prev => ({
      ...prev,
      student_id: sId,
      student_name: studentObj ? studentObj.name : "",
      application_id: "",
      university: "",
      program: "",
      tuition_fee: "",
      paid_amount: "",
      balance_due: "",
      payment_status: "unpaid",
      comm_percent: "" // 👈 FIXED
    }));
  };

  // --- 4. HANDLE APPLICATION SELECTION ---
  const handleApplicationSelect = (e) => {
    const appId = e.target.value;
    const specificApp = studentApps.find(app => String(app.id) === String(appId));

    if (specificApp) {
        setFormData(prev => ({
            ...prev,
            application_id: appId,
            university: specificApp.university_name,
            program: specificApp.program_name
        }));
    }
  };

  // --- 5. HANDLE INPUT CHANGE ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // --- 6. SUBMIT FORM ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const token = getAuthToken();
    if (!token) {
        alert("Authentication Token Missing! Please login again.");
        setSubmitting(false);
        return;
    }

    const apiUrl = "http://127.0.0.1:8000/api/admin/transactions";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json" 
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log("✅ Success:", result);
            alert("Transaction saved successfully!");
            // window.location.reload();
        } else {
            const errorData = await response.json();
            console.error("❌ Server Error:", errorData);
            
            if (errorData.errors) {
                alert("Validation Failed: " + JSON.stringify(errorData.errors));
            } else {
                alert(`Error: ${errorData.message || "Something went wrong"}`);
            }
        }

    } catch (error) {
        console.error("❌ Network Error:", error);
        alert("Network error occurred. Please check console for details.");
    } finally {
        setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10">Loading Agents...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded border-t-4 border-blue-600 mb-20">
      <h2 className="text-xl font-bold mb-6">Commission Form</h2>

      <form onSubmit={handleSubmit} className="grid gap-5">
        
        {/* Agent Select */}
        <div>
          <label className="font-bold block mb-1">Select Agent</label>
          <select onChange={handleAgentSelect} value={formData.agent_id} className="w-full border p-2 rounded">
            <option value="" disabled>-- Select Agent --</option>
            {agentList.map(agent => (
              <option key={agent.id} value={agent.id}>{agent.company_name} (ID: {agent.id})</option>
            ))}
          </select>
        </div>

        {/* Student Select */}
        <div>
          <label className="font-bold block mb-1">Select Student</label>
          <select 
            onChange={handleStudentSelect} 
            value={formData.student_id}
            disabled={loadingStudents || !formData.agent_id}
            className="w-full border p-2 rounded disabled:bg-gray-100"
          >
            <option value="" disabled>
              {loadingStudents ? "Fetching..." : (uniqueStudents.length === 0 ? "No Students Found" : "-- Select Student --")}
            </option>
            {uniqueStudents.map((stu) => (
              <option key={stu.id} value={stu.id}>{stu.name} (ID: {stu.id})</option>
            ))}
          </select>
        </div>

        {/* Application Select */}
        <div>
          <label className="font-bold block mb-1">
            Select Application 
            {studentApps.length > 0 && <span className="text-blue-600 ml-2 text-sm">(Total: {studentApps.length})</span>}
          </label>
          <select 
            onChange={handleApplicationSelect} 
            value={formData.application_id}
            disabled={!formData.student_id || studentApps.length === 0}
            className="w-full border p-2 rounded disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>-- Select Specific Application --</option>
            {studentApps.map((app) => (
              <option key={app.id} value={app.id}>
                 App ID: {app.id} - {app.university_name}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ FIELDS */}
        {formData.application_id && (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 pt-4 border-t border-gray-200">
                    
                    {/* Read Only Fields */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Student Name</label>
                        <input type="text" value={formData.student_name} readOnly className="w-full border p-2 rounded bg-gray-50 text-gray-800"/>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">University</label>
                        <input type="text" value={formData.university} readOnly className="w-full border p-2 rounded bg-gray-50 text-blue-700 font-medium"/>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Program</label>
                        <input type="text" value={formData.program} readOnly className="w-full border p-2 rounded bg-gray-50 text-blue-700 font-medium"/>
                    </div>

                    {/* Editable Fields */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Tuition Fee</label>
                        <input type="number" name="tuition_fee" value={formData.tuition_fee} onChange={handleInputChange} placeholder="0.00" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Paid Amount</label>
                        <input type="number" name="paid_amount" value={formData.paid_amount} onChange={handleInputChange} placeholder="0.00" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Balance Due</label>
                        <input type="number" name="balance_due" value={formData.balance_due} onChange={handleInputChange} placeholder="0.00" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Payment Status</label>
                        <select name="payment_status" value={formData.payment_status} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500">
                            <option value="unpaid">Unpaid</option>
                            <option value="partial">Partial</option>
                            <option value="fully_paid">Fully Paid</option>
                        </select>
                    </div>

                    {/* 👇👇👇 UPDATED FIELD NAME 👇👇👇 */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Commission (%)</label>
                        <input 
                            type="number" 
                            name="comm_percent" 
                            value={formData.comm_percent} 
                            onChange={handleInputChange} 
                            placeholder="e.g. 10" 
                            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>

                {/* Submit Button */}
                <div className="mt-6 border-t pt-4">
                    <button 
                        type="submit"
                        disabled={submitting}
                        className={`w-full text-white font-bold py-3 px-4 rounded shadow-md transition-all 
                            ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        {submitting ? "Processing..." : "Submit Commission Data"}
                    </button>
                </div>
            </>
        )}

      </form>
    </div>
  );
};

export default CommissionForm;