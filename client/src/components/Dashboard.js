import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Img from "../Images/emp2.svg";
import data2 from "../Images/data2.png";
import Image from "../Images/default-monochrome-black.svg";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Card, Table, Pagination } from "react-bootstrap";
import axios from "axios";

const Dashboard = () => {
  const [error, setError] = useState("");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [color, setColor] = useState("#0070bb ");
  const toggleColorPicker = () => {
    setColorPickerVisible(!colorPickerVisible);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username_head = queryParams.get("username");
  let first_name;
  if (username_head !== null) {
    first_name = username_head.split(" ")[0];
  } else {
    console.log("username_head is null.");
  }

  const [formDataList, setFormDataList] = useState({
    data: [],
    active: 1,
    totalPages: 0,
  });
  const [create, SetCreate] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    try {
      const response = await axios.get("/data", {
        params: { page: page, pageSize: 5 },
      });
      setFormDataList({
        data: response.data.data,
        active: page,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setFormDataList((prevState) => ({ ...prevState, active: pageNumber }));
    fetchData(pageNumber);
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleEditClick = (formData) => {
    setEditFormData({ ...formData });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setEditFormData({ ...editFormData, f_Image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    try {
      await axios.put("/edit", { editFormData });
      await axios.get("/data");
      setError("");
      navigate(`/dash`);
      refreshPage();
    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      {/* Header Section */}
      <nav
        className="navbar navbar-expand-lg dash dash_font"
        style={{ backgroundColor: color }}
      >
        <div className="container">
          <Link
            className="navbar-brand d-flex justify-content-start align-items-center"
            to="/"
          >
            <img
              src={Image}
              alt="Logo"
              style={{ width: "31px", height: "31px" }}
            />
          </Link>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item active me-3">
                <Link className="nav-link fw-bold theme" to="/dash">
                  Home
                </Link>
              </li>
              <li className="nav-itemm me-3">
                <Link
                  className="nav-link fw-bold theme"
                  onClick={() => SetCreate(!create)}
                >
                  Employee List
                </Link>
              </li>

              {/* <li className="nav-item me-3">
                <a className="nav-link theme fw-bold">
                  <i className="fas fa-palette" onClick={toggleColorPicker}></i>
                  {colorPickerVisible ? (
                    <input
                      value="##0070bb"
                      onChange={(e) => setColor(e.target.value)}
                      className="visible ms-1"
                      type="color"
                      id="exampleColorInput"
                      title="Choose your color"
                    />
                  ) : (
                    " Theme"
                  )}
                </a>
              </li> */}

              <li className="nav-item me-2">
                <Link className="nav-link theme">
                  <div className="d-flex flex-column justify-content-center">
                    <img
                      src={data2}
                      style={{ width: "30px", height: "30px" }}
                      alt="Img"
                    />
                    <span
                      className="profile fw-bold"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "50px",
                        height: "14px",
                        paddingLeft: "4px",
                      }}
                    >
                      {first_name && first_name}
                    </span>
                  </div>
                </Link>
              </li>

              <li className="nav-item me-3">
                <Link className="nav-link theme fw-bold" to="/" title="Logout">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            {create ? (
              <Card className="dash1 table_body text-center">
                <Card.Body>
                  <Card.Title className="fs-1">
                    Welcome, {first_name && first_name}!
                  </Card.Title>
                  <Card.Text>
                    Add a new employee to your team and assign roles.
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate("/create")}>
                    Add Employee
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <div>
                {/* Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light table_body">
                  <div className="container">
                    <div className="collapse navbar-collapse justify-content-end">
                      <ul className="navbar-nav">
                        <li className="nav-item me-5">
                          <button
                            type="button"
                            class="btn btn-primary position-relative logo"
                          >
                            Total Count
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                              {formDataList.data && formDataList.data.length}
                              <span class="visually-hidden">
                                unread messages
                              </span>
                            </span>
                          </button>
                        </li>
                        <li className="nav-item me-5">
                          <input
                            className="border-1 rounded fs-6"
                            type="text"
                            placeholder=" search"
                          />
                        </li>
                        <li className="nav-item text-center">
                          <Button
                            className="btn btn-primary logo"
                            onClick={() => {
                              navigate(`/create`);
                            }}
                          >
                            <i class="fa-solid fa-plus me-1"></i> Create
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>

                {/* Table */}
                <div className="container mt-4 mb-4">
                  <h2 className=" text-dark  fs-4 table_body">Employee List</h2>
                  <>
                    <Table className="table">
                      <thead className="head">
                        <tr>
                          <th className="head">ID</th>
                          <th className="head">Image</th>
                          <th className="head">Name</th>
                          <th className="head">Email</th>
                          <th className="head">Mobile</th>
                          <th className="head">Designation</th>
                          <th className="head">Gender</th>
                          <th className="head">Course</th>
                          <th className="head">Create Date</th>
                          <th className="head"></th>
                        </tr>
                      </thead>
                      <tbody className="table_body">
                        {formDataList.data &&
                          formDataList.data.map((formData, index) => (
                            <tr key={index}>
                              <td className="table_body">{index + 1}</td>
                              <td className="table_body">
                                <img
                                  src={formData.f_Image}
                                  alt="User"
                                  width="50"
                                />
                              </td>
                              <td className="table_body">{formData.f_Name}</td>
                              <td className="table_body">{formData.f_Email}</td>
                              <td className="table_body">
                                {formData.f_Mobile}
                              </td>
                              <td className="table_body">
                                {formData.f_Designation}
                              </td>
                              <td className="table_body">
                                {formData.f_gender}
                              </td>
                              <td className="table_body">
                                {formData.f_Course}
                              </td>
                              <td className="table_body">
                                {formData.f_Createdate}
                              </td>
                              <td className="table_body">
                                <button
                                  className="text-sm edit"
                                  onClick={() => handleEditClick(formData)}
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>{" "}
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>

                    <Pagination size="sm" className="page">
                      <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={formDataList.active === 1}
                      />
                      <Pagination.Prev
                        onClick={() =>
                          handlePageChange(formDataList.active - 1)
                        }
                        disabled={formDataList.active === 1}
                      />
                      {[...Array(formDataList.totalPages).keys()].map(
                        (pageNumber) => (
                          <Pagination.Item
                            onClick={() => handlePageChange(pageNumber + 1)}
                            key={pageNumber + 1}
                            active={pageNumber + 1 === formDataList.active}
                          >
                            {pageNumber + 1}
                          </Pagination.Item>
                        )
                      )}
                      <Pagination.Next
                        onClick={() =>
                          handlePageChange(formDataList.active + 1)
                        }
                        disabled={
                          formDataList.active === formDataList.totalPages
                        }
                      />
                      <Pagination.Last
                        onClick={() =>
                          handlePageChange(formDataList.totalPages)
                        }
                        disabled={
                          formDataList.active === formDataList.totalPages
                        }
                      />
                    </Pagination>

                    {isEditing && (
                      <div className="modal">
                        <div className="modal-content">
                          <div className="card">
                            <div className="card-header text-center head text-white">
                              <img
                                src={Img}
                                alt=""
                                width={70}
                                className="rounded"
                              />
                              <h2 className="fs-4 mt-1 mb-1 ">
                                Update Information
                              </h2>
                            </div>
                            <div className="card-body table_body m-3">
                              <div>
                                <form onSubmit={handleFormSubmit}>
                                  <div className="form-group">
                                    <label htmlFor="f_Image">Image</label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="f_Image"
                                      name="f_Image"
                                      onChange={handleFileInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Name">Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_Name"
                                      name="f_Name"
                                      value={editFormData.f_Name}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Email">Email</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="f_Email"
                                      name="f_Email"
                                      value={editFormData.f_Email}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Mobile">Mobile</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_Mobile"
                                      name="f_Mobile"
                                      value={editFormData.f_Mobile}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Designation">
                                      Designation
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_Designation"
                                      name="f_Designation"
                                      value={editFormData.f_Designation}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_gender">Gender</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_gender"
                                      name="f_gender"
                                      value={editFormData.f_gender}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Course">Course</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="f_Course"
                                      name="f_Course"
                                      value={editFormData.f_Course}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="f_Createdate">
                                      Create Date
                                    </label>
                                    <input
                                      type="date"
                                      className="form-control"
                                      id="f_Createdate"
                                      name="f_Createdate"
                                      value={editFormData.f_Createdate}
                                      onChange={handleInputChange}
                                    />
                                  </div>

                                  <div className="d-flex justify-content-center">
                                    <button
                                      type="submit"
                                      className="btn btn-primary mt-2"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
