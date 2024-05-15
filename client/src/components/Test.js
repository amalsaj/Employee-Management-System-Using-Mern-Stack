import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Table } from "react-bootstrap";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

function Test() {
  const [pages, setPages] = useState("10");
  const [data, setData] = useState({
    data: [],
    limit: 10,
    active: 1,
    load: false,
    totalPages: 0,
  });

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    try {
      setData((prevState) => ({ ...prevState, load: true }));
      const response = await axios.get("/data", {
        params: {page: page, pageSize: pages },
      });
      setData((prevState) => ({
        ...prevState,
        data: response.data.data,
        totalPages: response.data.totalPages,
        load: false,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setData((prevState) => ({ ...prevState, active: pageNumber }));
    fetchData(pageNumber);
  };

  return (
    <div>
      {data.load ? (
        <div className="loader-container d-flex justify-content-center mt-5">
          <ColorRing
            visible={true}
            height={80}
            width={80}
            colors={["#1E90FF", "#00BFFF", "#87CEFA", "#4682B4", "#5F9EA0"]}
          />
        </div>
      ) : (
        <div>
          <div
            className="m-4 d-flex justify-content-center"
            style={{ fontSize: "10px" }}
          >
            <Table bordered hover size="sm">
              <thead className="table-dark">
                <tr>
                  <th className=" table-sm">SI.no</th>
                  <th className=" table-sm">Profile</th>
                  <th className=" table-sm">Name</th>
                  <th className=" table-sm">Email</th>
                  <th className=" table-sm">Mobile</th>
                  <th className=" table-sm">Designation</th>
                  <th className=" table-sm">Gender</th>
                  <th className=" table-sm">Course</th>
                </tr>
              </thead>
              <tbody className=" table-info">
                {data.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item.f_Image} width={20} alt="Profile" />
                    </td>
                    <td>{item.f_Name}</td>
                    <td>{item.f_Email}</td>
                    <td>{item.f_Mobile}</td>
                    <td>{item.f_Designation}</td>
                    <td>{item.f_gender}</td>
                    <td>{item.f_Course}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination size="sm" className="page">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={data.active === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange((data.active - 1))}
              disabled={data.active === 1}
            />
            {[...Array(data.totalPages).keys()].map((pageNumber) => (
              <Pagination.Item
                onClick={() => handlePageChange(pageNumber + 1)}
                key={pageNumber + 1}
                active={pageNumber + 1 === data.active}
              >
                {pageNumber + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(data.active + 1)}
              disabled={data.active === data.totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(data.totalPages)}
              disabled={data.active === data.totalPages}
            />
          </Pagination>
          <label htmlFor="page" >Pages:</label>
          <select id="page"
        value={pages}
        onChange={(e) => {
          setPages(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
        </div>
      )}
    </div>
  );
}

export default Test;
