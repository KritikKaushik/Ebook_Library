const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("E-Book Library API Running");
});

const PORT = process.env.PORT || 8000;
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/borrowRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


app.use("/api/books", require("./routes/bookRoutes"));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});