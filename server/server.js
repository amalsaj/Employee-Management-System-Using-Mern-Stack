const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./collection");
const emp = require("./db/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve images from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/employee");
// Set up body parser middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

const authenticateUser = (req, res, next) => {
  const cookieToken = req.cookies.token;

  if (!cookieToken) {
    console.log("Token is not provided");
    return res
      .status(401)
      .json({ message: "Unauthorized - Token is not provided" });
  }
  jwt.verify(cookieToken, "employee", (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.error("Token has expired");
        return res.redirect("/");
      } else {
        console.error("Token verification failed:", err);
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });
      }
    }
    console.log(`Authorized - Valid token: ${cookieToken}`);
    next();
  });
};

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Route to serve the React app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Define a route handler for the "/dash" URL
app.get("/dash", authenticateUser, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/data", async (req, res) => {
  try {
    console.log(req.query)
    // Get page and pageSize from query parameters with default values
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    // Calculate skip and limit values
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Fetch data with pagination
    const allData = await emp.find().skip(skip).limit(limit);

    // Fetch total count of documents
    const totalCount = await emp.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);

    console.log(
      `skip:${skip},limit:${limit},totalCount:${totalCount},totalpages:${totalPages}`
    );

    // Check if any data was found
    if (allData.length === 0) {
      return res.status(404).send("No data found.");
    }

    // Respond with paginated data and metadata
    res.json({
      page,
      pageSize,
      totalCount,
      totalPages,
      data: allData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error.");
  }
});

// Route to handle sign-up form submission
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send("Username already exists.");
    }

    if (!username && !password) {
      return res.status(400).send("Username and password are required.");
    }

    // Create a new user document
    const newUser = new User({ username, password });

    // Save the new user to the database
    await newUser.save();

    // Sign up successful
    res.status(201).send("Sign-up Successful.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error.");
  }
});
// Route to handle form submission for login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).send("Incorrect password.");
    }
    //genarate token for authentication
    const token = jwt.sign({ username }, "employee", { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.json({ token, message: "Sign in successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error.");
  }
});
app.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate,
      f_Image,
    } = req.body.formData;

    // Check if formData exists
    if (!req.body.formData) {
      return res.status(400).send("formData is required.");
    }

    // Check if required fields are provided
    if (!f_Name || !f_Email) {
      return res.status(400).send("EmployeeName and email are required.");
    }

    const existingUser = await emp.findOne({ f_Email });
    if (existingUser) {
      return res.status(409).send("Employee already exists.");
    }

    // Create a new employee document
    const newEmployee = new emp({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate,
      f_Image,
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Sign-up successful
    console.log("Employee created successfully:", newEmployee);
    res.status(200).send("Employee created successfully");
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    res.status(500).send("Internal server error: " + error.message); // Send the error message to the client
  }
});

app.put("/edit", async (req, res) => {
  console.log(req.body);
  try {
    const {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate,
      f_Image,
    } = req.body.editFormData;

    // Check if editFormData exists
    if (!req.body.editFormData) {
      return res.status(400).send("editFormData is required.");
    }

    const existingUser = await emp.findOne({ f_Email });
    if (existingUser) {
      // Update all values in the existing document
      await emp.findOneAndUpdate(
        { f_Email },
        {
          f_Name,
          f_Email,
          f_Mobile,
          f_Designation,
          f_gender,
          f_Course,
          f_Createdate,
          f_Image,
        }
      );

      return res.status(200).send("Employee updated successfully.");
    }

    return res.status(404).send("Employee not found."); // Return 404 if employee not found
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    res.status(500).send("Internal server error: " + error.message); // Send the error message to the client
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
