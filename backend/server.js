const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("E-Book Library API Running");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/borrow", require("./routes/borrowRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});