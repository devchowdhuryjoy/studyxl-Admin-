import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../Api/ApiBaseUrl";
import { X } from "lucide-react";

const AgentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const fields = [
    "id",
    "prefix",
    "first_name",
    "last_name",
    "company_name",
    "job_title",
    "country_dialing_code",
    "phone_number",
    "email",
    "finance_email",
    "password",
    "street_address",
    "street_address_line2",
    "city",
    "state",
    "postal_code",
    "country",
    "director_prefix",
    "director_first_name",
    "director_last_name",
    "director_job_title",
    "director_dialing_code",
    "director_phone_number",
    "director_email",
    "trading_name",
    "website",
    "students_per_year",
    "destinations",
    "other_destination",
    "litigation",
    "litigation_details",
    "australia_recruitment",
    "australia_recruitment_details",
    "institutions",
    "college",
    "creative_course",
    "university_preparation",
    "adult_english",
    "junior_english",
    "direct_entry",
    "year_established",
    "branch_offices",
    "counsellors",
    "icef_id",
    "hear_about",
    "why_oxford",
    "referee_prefix",
    "referee_first_name",
    "referee_last_name",
    "referee_company",
    "referee_email",
    "referee_dialing_code",
    "referee_phone",
    "referee_website",
    "created_at",
    "updated_at",
    "is_approved",
    "status",
  ];

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/all-user`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const selectedAgent = data.find((a) => a.id.toString() === id);
        setAgent(selectedAgent || null);
      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [id]);

  if (loading) return <div className="p-6">⏳ Loading agent details...</div>;
  if (!agent) return <div className="p-6">❌ Agent not found</div>;

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6 relative">
        <h1 className="text-2xl font-bold mb-6 text-[#f16f22]">
          Agent Details (ID: {id})
        </h1>

        {/* Cross icon */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800"
        >
          <X size={28} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fields.map((field) => (
          <div key={field} className="p-4 border rounded-lg shadow-sm bg-white">
            <p className="text-sm font-semibold text-black">{field}</p>
            <p className="text-base text-black">{agent[field] || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentDetails;
