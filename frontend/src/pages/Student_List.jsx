import React, { useEffect, useState } from "react";
import "../css/StudentList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
import AttToggle from "../componetns/toggle-btn";
import axios from "axios";

function Student_List() {
  const [studentdata, SetStudentData] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const stdData = await axios.get("http://localhost:8000/api/students");
      const { data } = stdData;
      SetStudentData(data?.students);
      console.log(stdData);
    };
    fetchStudents();
  }, []);


  return (
    <>
      {/* Employee Table */}
      <div className="table-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studentdata.map((val, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0">{val.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>{val.rollno}</td>
                  <td>{val.studentClass}</td>
                  <td>
                    <AttToggle studId={val?._id} attStatus={ val.status } />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Student_List;
