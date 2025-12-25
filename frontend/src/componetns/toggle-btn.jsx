import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

function AttToggle({ studId, attStatus }) {
  const [status, setStatus] = useState(attStatus || "");

  const handleClick = async (val) => {
    setStatus(val);

    try {
      await axios.post("http://localhost:8000/api/attendance", {
        student_id: studId,
        attendance_status: val,
      });
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };
  
  return (
    <div className="d-flex gap-2">
      <Button
        variant={status === "Present" ? "success" : "outline-success"}
        disabled={status === "Present"}
        onClick={() => handleClick("Present")}
      >
        Present
      </Button>
      <Button
        variant={status === "Absent" ? "danger" : "outline-danger"}
        disabled={status === "Absent"}
        onClick={() => handleClick("Absent")}
      >
        Absent
      </Button>
    </div>
  );
}

export default AttToggle;
