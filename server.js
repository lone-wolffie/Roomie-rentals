import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

let adminListings = [];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Roomie Rentals API is running...");
});

// all houses route
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// get all houses for admins
app.get("/api/properties", (req, res) => {
  res.json(adminListings);
});

// new houses for admins
app.post("/api/properties", (req, res) => {
  console.log("Property received from admin");
  console.log(req.body);

  const newProperty = {
    id: adminListings.length + 1,
    ...req.body,
    dateAdded: new Date().toISOString()
  };

  adminListings.push(newProperty);
  console.log("New property added:", newProperty);

  res.status(200).json({
    message: "House added successfully",
    data: newProperty
  });
});

// delete house
app.delete("/api/listings/:id", (req, res) => {
  const id = parseInt(req.params.id);

  listings = listings.filter(item => item.id !== id);

  res.json({ message: "House deleted successfully" });
});

// server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});