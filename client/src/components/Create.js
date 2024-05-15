import React, { useState } from "react";
import Img from "../Images/emp.svg";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FormComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: "",
    f_Createdate: "",
    f_Image: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name } = e.target;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: reader.result,
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/create", { formData });
      setError("");
      navigate(`/dash`);
    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        setError(error.response.data); // Display error message from server
      } else {
        setError("An error occurred. Please try again."); // Display generic error message
      }
    }
  };
  return (
    <div className="d-flex justify-content-center mt-4 mb-4">
      <div className="card data_card ">
        <div className="card-header text-center head text-white">
          <img src={Img} alt="" width={100} className="rounded-circle" />
          <h2 className="fs-4 mt-1 mb-1 ">Create Employee</h2>
        </div>

        <div className="card-body">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Name">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="f_Name"
                name="f_Name"
                value={formData.f_Name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="f_Email"
                name="f_Email"
                value={formData.f_Email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Mobile">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                id="f_Mobile"
                name="f_Mobile"
                value={formData.f_Mobile}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Designation">
                Designation
              </label>
              <select
                className="form-control"
                id="f_Designation"
                name="f_Designation"
                value={formData.f_Designation}
                onChange={handleChange}
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_gender">
                Gender
              </label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="f_gender"
                    id="male"
                    value="Male"
                    onChange={handleChange}
                    checked={formData.f_gender === "Male"}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="f_gender"
                    id="female"
                    value="Female"
                    onChange={handleChange}
                    checked={formData.f_gender === "Female"}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="f_gender"
                    id="other"
                    value="Other"
                    onChange={handleChange}
                    checked={formData.f_gender === "Other"}
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Course">
                Course
              </label>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="mca"
                    name="f_Course"
                    value="MCA"
                    onChange={handleChange}
                    checked={formData.f_Course.includes("MCA")}
                  />
                  <label className="form-check-label" htmlFor="mca">
                    MCA
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="bca"
                    name="f_Course"
                    value="BCA"
                    onChange={handleChange}
                    checked={formData.f_Course.includes("BCA")}
                  />
                  <label className="form-check-label" htmlFor="bca">
                    BCA
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="bsc"
                    name="f_Course"
                    value="BSC"
                    onChange={handleChange}
                    checked={formData.f_Course.includes("BSC")}
                  />
                  <label className="form-check-label" htmlFor="bsc">
                    BSC
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="btech"
                    name="f_Course"
                    value="BTECH"
                    onChange={handleChange}
                    checked={formData.f_Course.includes("BTECH")}
                  />
                  <label className="form-check-label" htmlFor="btech">
                    BTECH
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="font_card" htmlFor="f_Createdate">
                Create Date
              </label>
              <input
                type="date"
                className="form-control"
                id="f_Createdate"
                name="f_Createdate"
                value={formData.f_Createdate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="font_card" htmlFor="f_Image">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="f_Image"
                name="f_Image"
                accept=".png"
                onChange={handleChange}
              />
              {formData.f_Image && (
                <div>
                  <h6 className="mt-2 fs-6 display-4 "><i class="fa-solid fa-eye"></i> Preview</h6>
                  <Image src={formData.f_Image} alt="Preview" width={200}/>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-4">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
