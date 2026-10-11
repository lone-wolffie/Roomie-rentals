import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// store images of houses
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
let users = []; // store users temporarily

app.get("/", (req, res) => {
    res.send("Roomie Rentals API is running...");
});


app.post("/api/register", async (req, res) => {
    try {
        const { fullName, phoneNumber, email, password } = req.body;

        // Check that all fields have been filled out
        if (!fullName || !phoneNumber || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all the fields."
            });
        }

        // Check whether the email is already registered
        const existingUser = users.find(
            (user) => user.email === email.trim().toLowerCase()
        );

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        // Hash the password before storing 
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new user
        const newUser = {
            id: users.length + 1,
            fullName: fullName.trim(),
            phoneNumber: phoneNumber.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        };

        users.push(newUser);

        return res.status(201).json({
            message: "Registration was successful!",
        });
    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Something went wrong during registration. Please try again later."
        });
    }
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