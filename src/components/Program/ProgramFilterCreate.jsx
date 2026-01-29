


import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl";

const token = localStorage.getItem("admin_token");

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const ProgramFiltersCrud = () => {
  /* ---------------- STATES ---------------- */
  const [programLevels, setProgramLevels] = useState([]);
  const [intakes, setIntakes] = useState([]);
  const [intakeMonths, setIntakeMonths] = useState([]);
  const [programTags, setProgramTags] = useState([]);
  const [fields, setFields] = useState([]);

  const [edit, setEdit] = useState(null); // Generic edit
  const [editMonth, setEditMonth] = useState(null); // Intake Month edit

  // Intake Month form fields
  const [monthName, setMonthName] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  const [selectedIntakeId, setSelectedIntakeId] = useState("");

  /* ---------------- FETCH ALL ---------------- */
  const fetchAll = async () => {
    try {
      const [pl, i, im, pt, f] = await Promise.all([
        axios.get(`${BASE_URL}/admin/all/program/level`, { headers }),
        axios.get(`${BASE_URL}/admin/intakes`, { headers }),
        axios.get(`${BASE_URL}/admin/intake/all/month`, { headers }),
        axios.get(`${BASE_URL}/admin/programtag`, { headers }),
        axios.get(`${BASE_URL}/admin/all/field/of/study`, { headers }),
      ]);

      setProgramLevels(pl.data.data || pl.data);
      setIntakes(i.data.data || i.data);
      setIntakeMonths(im.data.data || im.data);
      setProgramTags(pt.data.data || pt.data);
      setFields(f.data.data || f.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (url) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(url, { headers });
      Swal.fire("Deleted!", "", "success");
      fetchAll();
    } catch (error) {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async () => {
    try {
      await axios.put(edit.url, edit.payload, { headers });
      Swal.fire("Updated!", "", "success");
      setEdit(null);
      fetchAll();
    } catch (error) {
      Swal.fire("Error", "Failed to update", "error");
    }
  };

  /* ---------------- CREATE GENERIC BLOCK ---------------- */
  const Block = ({ title, rows, nameKey, createUrl, updateUrl, deleteUrl }) => {
    const [createValue, setCreateValue] = useState("");

    const handleCreate = async () => {
      if (!createValue.trim()) {
        Swal.fire("Error", "Field required", "error");
        return;
      }

      try {
        await axios.post(createUrl, { [nameKey]: createValue }, { headers });
        Swal.fire("Created!", "", "success");
        setCreateValue("");
        fetchAll();
      } catch (error) {
        Swal.fire("Error", "Failed to create", "error");
      }
    };

    return (
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* CREATE */}
        <div className="flex gap-3 mb-4">
          <input
            className="border p-2 flex-1"
            placeholder={`Enter ${title}`}
            value={createValue}
            onChange={(e) => setCreateValue(e.target.value)}
          />
          <button onClick={handleCreate} className="bg-green-600 text-white px-4 rounded">
            Add
          </button>
        </div>

        {/* LIST */}
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id}>
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2 text-center">{row[nameKey]}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() =>
                      setEdit({
                        value: row[nameKey],
                        url: updateUrl(row.id),
                        payload: { [nameKey]: row[nameKey] },
                      })
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(deleteUrl(row.id))}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  /* ---------------- CREATE INTAKE MONTH ---------------- */
  const handleCreateIntakeMonth = async () => {
    if (!selectedIntakeId || !monthName || !openDate || !submissionDeadline) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/admin/intake/month/create/${selectedIntakeId}`,
        {
          month: monthName,
          open_date: openDate,
          submission_deadline: submissionDeadline,
        },
        { headers }
      );
      Swal.fire("Created!", "", "success");
      setSelectedIntakeId("");
      setMonthName("");
      setOpenDate("");
      setSubmissionDeadline("");
      fetchAll();
    } catch (error) {
      Swal.fire("Error", "Failed to create intake month", "error");
    }
  };

  /* ---------------- UPDATE INTAKE MONTH ---------------- */
  const handleUpdateMonth = async () => {
    if (!editMonth.intake_id || !editMonth.month || !editMonth.open_date || !editMonth.submission_deadline) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/admin/intake/month/${editMonth.id}`,
        {
          intake_id: editMonth.intake_id,
          month: editMonth.month,
          open_date: editMonth.open_date,
          submission_deadline: editMonth.submission_deadline,
        },
        { headers }
      );
      Swal.fire("Updated!", "", "success");
      setEditMonth(null);
      fetchAll();
    } catch (error) {
      Swal.fire("Error", "Failed to update intake month", "error");
    }
  };

  return (
    <div className="p-6">
      {/* PROGRAM LEVEL */}
      <Block
        title="Program Levels"
        rows={programLevels}
        nameKey="name"
        createUrl={`${BASE_URL}/admin/program/level/store`}
        updateUrl={(id) => `${BASE_URL}/admin/program/level/${id}/update`}
        deleteUrl={(id) => `${BASE_URL}/admin/program/level/${id}/delete`}
      />

      {/* INTAKE */}
      <Block
        title="Intakes"
        rows={intakes}
        nameKey="name"
        createUrl={`${BASE_URL}/admin/intakes`}
        updateUrl={(id) => `${BASE_URL}/admin/intakes/${id}`}
        deleteUrl={(id) => `${BASE_URL}/admin/intakes/${id}`}
      />

      {/* INTAKE MONTHS */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-bold mb-4">Intake Months</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          <select
            className="border p-2"
            value={selectedIntakeId}
            onChange={(e) => setSelectedIntakeId(e.target.value)}
          >
            <option value="">Select Intake</option>
            {intakes.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="border p-2"
            placeholder="Month Name"
            value={monthName}
            onChange={(e) => setMonthName(e.target.value)}
          />
          <input
            type="date"
            className="border p-2"
            placeholder="Open Date"
            value={openDate}
            onChange={(e) => setOpenDate(e.target.value)}
          />
          <input
            type="date"
            className="border p-2"
            placeholder="Submission Deadline"
            value={submissionDeadline}
            onChange={(e) => setSubmissionDeadline(e.target.value)}
          />
          <button
            onClick={handleCreateIntakeMonth}
            className="bg-green-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* LIST */}
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Intake</th>
              <th className="border p-2">Month</th>
              <th className="border p-2">Open Date</th>
              <th className="border p-2">Deadline</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {intakeMonths.map((m, i) => (
              <tr key={m.id}>
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2 text-center">{m.intake_name || m.intake?.name}</td>
                <td className="border p-2 text-center">{m.month}</td>
                <td className="border p-2 text-center">{m.open_date}</td>
                <td className="border p-2 text-center">{m.submission_deadline}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => setEditMonth({ ...m, intake_id: m.intake_id })}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(`${BASE_URL}/admin/intake/month/${m.id}`)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PROGRAM TAG */}
      <Block
        title="Program Tags"
        rows={programTags}
        nameKey="program_tag"
        createUrl={`${BASE_URL}/admin/programtag`}
        updateUrl={(id) => `${BASE_URL}/admin/programtag/${id}`}
        deleteUrl={(id) => `${BASE_URL}/admin/programtag/${id}`}
      />

      {/* FIELD OF STUDY */}
      <Block
        title="Field of Study"
        rows={fields}
        nameKey="name"
        createUrl={`${BASE_URL}/admin/field/of/study/store`}
        updateUrl={(id) => `${BASE_URL}/admin/field/of/study/${id}/update`}
        deleteUrl={(id) => `${BASE_URL}/admin/field/of/study/${id}/delete`}
      />

      {/* EDIT MODAL (Generic) */}
      {edit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-bold mb-3">Edit</h3>
            <input
              className="border w-full p-2 mb-4"
              value={edit.payload[Object.keys(edit.payload)[0]]}
              onChange={(e) =>
                setEdit({
                  ...edit,
                  payload: { ...edit.payload, [Object.keys(edit.payload)[0]]: e.target.value },
                })
              }
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEdit(null)} className="px-4 py-1 bg-gray-400 rounded text-white">
                Cancel
              </button>
              <button onClick={handleUpdate} className="px-4 py-1 bg-green-600 rounded text-white">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL (Intake Month) */}
      {editMonth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-bold mb-3">Edit Intake Month</h3>
            <select
              className="border p-2 w-full mb-2"
              value={editMonth.intake_id}
              onChange={(e) => setEditMonth({ ...editMonth, intake_id: e.target.value })}
            >
              <option value="">Select Intake</option>
              {intakes.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Month Name"
              value={editMonth.month}
              onChange={(e) => setEditMonth({ ...editMonth, month: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 w-full mb-2"
              placeholder="Open Date"
              value={editMonth.open_date}
              onChange={(e) => setEditMonth({ ...editMonth, open_date: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 w-full mb-2"
              placeholder="Submission Deadline"
              value={editMonth.submission_deadline}
              onChange={(e) => setEditMonth({ ...editMonth, submission_deadline: e.target.value })}
            />
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setEditMonth(null)}
                className="px-4 py-1 bg-gray-400 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateMonth}
                className="px-4 py-1 bg-green-600 rounded text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramFiltersCrud;
