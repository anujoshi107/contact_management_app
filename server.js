const express = require("express");
const mongoose = require("mongoose");
// Ensure dotenv is loaded first and only once.
require("dotenv").config();

// Require other modules
const userRoutes = require("./routes/user.routes");
const contactRoutes = require("./routes/contact_routes");
const errorHandler = require("./middleware/errorHandler");

// Connect to the database
const connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Database connected:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// Call the async function to establish connection
connectdb();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

// Error handler (after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
