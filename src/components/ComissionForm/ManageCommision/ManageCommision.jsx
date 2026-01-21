import React, { useState, useEffect } from "react";

const ManageCommission = () => {
  // --- STATES ---
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal States
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  // --- HELPER: GET TOKEN ---
  const getAuthToken = () => {
    return localStorage.getItem("admin_token");
  };

  // ✅ STATUS CONFIG
  const statusConfig = {
    fully_paid: { 
        label: "Fully Paid", 
        classes: "text-green-600" 
    },
    partial: { 
        label: "Partial", 
        classes: "text-yellow-600" 
    },
    unpaid: { 
        label: "Unpaid", 
        classes: "text-red-600" 
    },
    // pending: {
    //     label: "Pending",
    //     classes: "text-gray-600"
    // },
    // default: { 
    //     label: "Unknown", 
    //     classes: "text-gray-400" 
    // }
  };

  // --- FETCH DATA ---
  const fetchTransactions = async () => {
    setLoading(true);
    const token = getAuthToken();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/transactions", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(Array.isArray(data) ? data : data.data || []);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- DELETE FUNCTION ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    const token = getAuthToken();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/transactions/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        alert("Deleted successfully!");
        setTransactions(transactions.filter(item => item.id !== id));
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // --- EDIT & UPDATE FUNCTIONS ---
  const handleEditClick = (item) => {
    setEditData({ ...item });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/transactions/${editData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({
            tuition_fee: editData.tuition_fee,
            paid_amount: editData.paid_amount,
            balance_due: editData.balance_due,
            status: editData.status,
            comm_percent: editData.comm_percent
        })
      });

      if (response.ok) {
        alert("Updated successfully!");
        setIsEditing(false);
        fetchTransactions();
      } else {
        const errData = await response.json();
        alert("Update failed: " + (errData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // --- CALCULATE COMMISSION ---
  const calculateCommission = (paid, percent) => {
    const p = parseFloat(paid) || 0;
    const per = parseFloat(percent) || 0;
    return ((p * per) / 100).toFixed(2);
  };

  // ✅ SIMPLE STATUS RENDERER
  const renderStatusText = (statusKey) => {
    if (!statusKey) return <span className="text-gray-400">N/A</span>;
    
    let formatted = statusKey.toString().toLowerCase().trim().replace(/\s+/g, '_');
    const config = statusConfig[formatted] || statusConfig.default;

    return (
        <span className={`font-bold ${config.classes}`}>
            {config.label === "Unknown" ? statusKey : config.label}
        </span>
    );
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Data...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Commissions</h2>
        <span className="text-sm text-gray-600 font-semibold border px-3 py-1 rounded">
           Total: {transactions.length}
        </span>
      </div>

      {/* --- TABLE START --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600 border-collapse">
          
          {/* ✅ HEADER UPDATED: Light BG + Borders Top/Bottom */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-t border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-3 font-bold">Agent Name</th>
              <th className="px-6 py-3 font-bold">Student Name</th>
              <th className="px-6 py-3 font-bold">Tuition Fee</th>
              <th className="px-6 py-3 font-bold">Paid</th>
              <th className="px-6 py-3 font-bold">Due</th>
              <th className="px-6 py-3 font-bold">Commision</th>
              <th className="px-6 py-3 font-bold">Earned</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold text-center">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.agent_name || item.agent?.company_name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {item.student_name || item.student?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">{item.tuition_fee}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">{item.paid_amount}</td>
                  <td className="px-6 py-4 text-red-500">{item.balance_due}</td>
                  <td className="px-6 py-4">{item.comm_percent}%</td>
                  <td className="px-6 py-4 font-bold text-blue-600">
                    {calculateCommission(item.paid_amount, item.comm_percent)}
                  </td>

                  <td className="px-6 py-4">
                    {renderStatusText(item.status)}
                  </td>
                  
                  <td className="px-6 py-4 flex gap-3 justify-center">
                    <button 
                      onClick={() => handleEditClick(item)}
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-400">
                    No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- EDIT MODAL --- */}
      {isEditing && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Edit Transaction</h3>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-600">Tuition Fee</label>
                <input type="number" name="tuition_fee" value={editData.tuition_fee} onChange={handleEditChange} className="w-full border p-2 rounded"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600">Paid Amount</label>
                <input type="number" name="paid_amount" value={editData.paid_amount} onChange={handleEditChange} className="w-full border p-2 rounded"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600">Balance Due</label>
                <input type="number" name="balance_due" value={editData.balance_due} onChange={handleEditChange} className="w-full border p-2 rounded"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600">Commission %</label>
                <input type="number" name="comm_percent" value={editData.comm_percent} onChange={handleEditChange} className="w-full border p-2 rounded"/>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-600">Payment Status</label>
                <select 
                    name="status" 
                    value={editData.status} 
                    onChange={handleEditChange} 
                    className="w-full border p-2 rounded bg-white"
                >
                    {Object.keys(statusConfig).map(key => (
                        key !== 'default' && (
                            <option key={key} value={key}>{statusConfig[key].label}</option>
                        )
                    ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-2">
                <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700 text-sm font-bold">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCommission;
//before responsive check