import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import BASE_URL from '../../Api/ApiBaseUrl';
import Swal from 'sweetalert2';

const AgentTask = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [availableUniversities, setAvailableUniversities] = useState([]);

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      title: "",
      subject: "",
      description: "",
      status: "",
      due_date: "",
      student_id: "",
      student_name: "",
      agent_id: "",
      agent_name: "",
      university_id: "",
      university_name: "",
      program_id: "",
      program_name: "",
      documents: []
    }
  });

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const response = await axios.get(`${BASE_URL}/admin/all-user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAgents(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const fetchStudentsByAgentId = async (agent_id) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`${BASE_URL}/admin/agent/${agent_id}/all-aplication`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data.applications || []);
    } catch (error) {
      setStudents([]);
    }
  };


  const fetchApplicationStatus = async (program_id, student_name) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`${BASE_URL}/admin/program/${program_id}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const app = response.data.applications.find(a => a.student_name === student_name);
      if (app) {
        setValue("status", app.status);
      }
    } catch (error) {
      console.error("Status fetch error", error);
    }
  };

  const watchAgent = watch("agent_name");
  const watchStudent = watch("student_name");
  const watchUniversity = watch("university_name");
  const watchProgram = watch("program_name");
  const watchDocs = watch("documents") || [];

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setValue("documents", [...watchDocs, ...newFiles]);
    e.target.value = null;
  };

  const removeFile = (idx) => setValue("documents", watchDocs.filter((_, i) => i !== idx));

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title || "Document Submission");
    formData.append("subject", data.subject);
    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append("due_date", data.due_date);
    const uId = parseInt(data.university_id, 10);
    const aId = parseInt(data.agent_id, 10);
    const sId = parseInt(data.student_id, 10);
    const pId = parseInt(data.program_id, 10);

    formData.append("university_id", isNaN(uId) ? "" : uId);
    formData.append("agent_id", isNaN(aId) ? "" : aId);
    formData.append("student_id", isNaN(sId) ? "" : sId);
    formData.append("program_id", isNaN(pId) ? "" : pId);
    formData.append("student_name", data.student_name);
    formData.append("agent_name", data.agent_name);
    formData.append("university_name", data.university_name);
    formData.append("program_name", data.program_name);
    data.documents.forEach((file) => formData.append("documents[]", file))

    try {
      const token = localStorage.getItem("admin_token");
      await axios.post(`${BASE_URL}/admin/tasks`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      // alert("Task Posted Successfully!");
      Swal.fire({
      icon: 'success',
      title: 'Application Successful',
      text: 'Task has been created and documents uploaded successfully!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
      reset();
    } catch (error) {
      // alert("Failed to post task.");
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to create task. Please try again!',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
    }
  };

  return (
    <div className="block min-h-screen py-12 px-4 md:py-24">
      <div className="block mx-auto w-full  bg-white rounded-3xl shadow-xl border overflow-hidden">
        <div className="block bg-primary p-8 text-center">
          <h1 className="text-white text-xl font-bold">University Task Form</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="block p-8 md:p-10">
          {/* AGENT SELECTION */}
          <div className="block mb-5">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Agent Name</label>
            <select
              {...register("agent_name")}
              className="block w-full p-3.5 bg-gray-50 border rounded-xl text-sm outline-none"
              onChange={(e) => {
                const val = e.target.value;
                setValue("agent_name", val);
                const agentObj = agents.find(a => a.company_name === val);
                if (agentObj) {
                  setValue("agent_id", agentObj.id);
                  fetchStudentsByAgentId(agentObj.id);
                }
                ["student_name", "university_name", "program_name"].forEach(f => setValue(f, ""));
              }}
            >
              <option value="">Select Agent</option>
              {agents.map(a => <option key={a.id} value={a.company_name}>{a.company_name}</option>)}
            </select>
          </div>

          {/* STUDENT SELECTION */}
          {watchAgent && (
            <div className="block w-full mb-5">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Student Name</label>
    
              {/* STUDENT SELECTION */}
              <select
                {...register("student_name")}
                className="block w-full p-3.5 bg-gray-50 border rounded-xl text-sm outline-none"
                onChange={(e) => {
                  const val = e.target.value;
                  setValue("student_name", val);
                  const selectedApps = students.filter(s => s.student_name === val);
                  const uniqueUnis = [];
                  const seenIds = new Set();
                  selectedApps.forEach(app => {
                    if (!seenIds.has(app.university_id)) {
                      seenIds.add(app.university_id);
                      uniqueUnis.push({
                        university_id:app.id,
                        university_name: app.university_name
                      });
                    }
                  });
                  setAvailableUniversities(uniqueUnis);
                  if (selectedApps.length > 0) setValue("student_id", selectedApps[0].student_id);
                  ["university_name", "university_id", "program_name", "program_id"].forEach(f => setValue(f, ""));
                }}
              >
                <option value="">Select Student</option>
                {[...new Set(students.map(s => s.student_name))].map((n, i) => <option key={i} value={n}>{n}</option>)}
              </select>

            </div>
          )}

          {/* UNIVERSITY SELECTION */}
          {watchStudent && (
            <div className="block w-full mb-5">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5 ml-1">University Name</label>
            
              {/* UNIVERSITY SELECTION */}
              <select
                {...register("university_name")}
                className="block w-full p-3.5 bg-gray-50 border rounded-xl text-sm outline-none"
                onChange={(e) => {
                  const val = e.target.value;
                  setValue("university_name", val);
                  const uni = availableUniversities.find(u => u.university_name === val);

                  if (uni) {
                    setValue("university_id", uni.university_id);
                  } else {
                    setValue("university_id", "");
                  }
                  setValue("program_name", "");
                  setValue("program_id", "");
                }}
              >
                <option value="">Select University</option>
                {availableUniversities.map((u, i) => <option key={i} value={u.university_name}>{u.university_name}</option>)}
              </select>
            </div>
          )}

          {/* PROGRAM SELECTION */}
          {watchUniversity && (
            <div className="block w-full mb-5">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Academic Program</label>
              <select
                {...register("program_name")}
                className="block w-full p-3.5 bg-gray-50 border rounded-xl text-sm outline-none"
                onChange={(e) => {
                  const val = e.target.value;
                  setValue("program_name", val);
                  const prog = students.find(s => s.student_name === watchStudent && s.university_name === watchUniversity && s.program_name === val);
                  if (prog) {
                    setValue("program_id", prog.program_id);
                    fetchApplicationStatus(prog.program_id, watchStudent);
                    setValue("title", "Document Submission");
                    setValue("subject", "General Enrollment");
                    setValue("description", "Please upload the required documents for the selected program.");
                    setValue("due_date", "2026-03-23")
                  }
                }}
              >
                <option value="">Select Program</option>
                {students
                  .filter(s => s.student_name === watchStudent && s.university_name === watchUniversity)
                  .map((p, i) => <option key={i} value={p.program_name}>{p.program_name}</option>)}
              </select>
            </div>
          )}

          {/* TASK DETAILS VIEW  */}
          {watchProgram && (
            <div className="block mt-6 p-6 bg-gray-50 rounded-2xl border animate-in zoom-in">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Subject</label>
                  <input {...register("subject")} className="block w-full bg-white p-2 border rounded-lg font-medium text-gray-700 outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Description</label>
                  <textarea {...register("description")} className="block w-full bg-white p-2 font-bold border rounded-lg text-xs text-gray-700 outline-none resize-none" rows="2" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500  uppercase">Current App Status</label>
                  <input {...register("status")} readOnly className="block w-full bg-transparent border text-gray-700 rounded-lg  p-2 font-bold  outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Due Date</label>
                  <input {...register("due_date")} className="block w-full bg-white p-2 border rounded-lg font-medium text-gray-700 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Student ID</label>
                  <input {...register("student_id")} readOnly className="block w-full bg-transparent border rounded-lg  p-2 font-medium text-gray-700 outline-none" />
                </div>
              </div>

              {/* UPLOAD SECTION */}
              <div className="block bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 mt-4">
                <input type="file" multiple accept="application/pdf" onChange={handleFileChange} className="block w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white" />
                {watchDocs.map((file, i) => (
                  <div key={i} className="flex justify-between bg-gray-50 p-2 rounded mt-2">
                    <span className="text-[11px] truncate">{file.name}</span>
                    <button type="button" onClick={() => removeFile(i)} className="text-red-500 text-xs font-bold">Remove</button>
                  </div>
                ))}
              </div>

              <button type="submit" className="block w-full mt-6 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all">
                Create Task & Upload
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AgentTask;