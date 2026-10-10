import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("uploads", express.static(path.join(__dirname, "uploads")));

// storing images of houses
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads"));
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

let adminListings = [];

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
app.post("/api/properties", upload.array("photos", 10), (req, res) => { // allowing up to 10 photos to be uploaded
    try {
        console.log("Property received from admin");

        const propertyDetails = JSON.parse(req.body.property);
        const photoUrls = (req.files || []).map(
            (file) => `/uploads/${file.filename}`
        );

        const newProperty = {
            id: adminListings.length + 1,
            ...propertyDetails,
            photos: photoUrls,
            dateAdded: new Date().toISOString()
        };

        adminListings.push(newProperty);
        console.log("New property added:", newProperty);

        res.status(200).json({
            message: "House added successfully",
            data: newProperty
        });
    } catch (error) {
        console.error("Error adding property:", error);
        res.status(400).json({
            message: "Failed to add property. Please ensure the property details are valid and try again."
        });
    } 
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