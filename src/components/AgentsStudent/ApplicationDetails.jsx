import { useParams } from "react-router-dom";

const ApplicationDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Application Details</h2>
      <p>Application ID: {id}</p>
        {/* Additional details can be fetched and displayed here */}
        <p>Additional details will be shown here.</p>
        
    </div>
  );
};

export default ApplicationDetails;


