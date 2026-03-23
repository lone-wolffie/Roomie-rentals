import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Roomie Rentals API is running...");
});


// routes
// all houses
app.get("/", (req, res) => {
  res.json(listings);
});

// new houses for admins
app.post("/api/listings", (req, res) => {
  const newListing = {
    id: listings.length + 1,
    ...req.body
  };

  listings.push(newListing);

  res.status(200).json({
    message: "House added successfully",
    data: newListing
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