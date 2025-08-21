const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.json()); 
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const Firstid = uuidv4();
let complaints = [
    {
        "id": Firstid,
        "title": "Mess food is bad",
        "description": "The food served in the hostel mess is not fresh.",
        "status": "pending"
    }
];

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Home page showing all complaints
app.get("/home", (req, res) => {
    res.render("home.ejs", { complaints });
});

// Add new complaint
app.post("/home", (req, res) => {
    let { title, description } = req.body;
    complaints.push({
        id: uuidv4(),
        title,
        description,
        status: "pending"
    });
    res.redirect("/home");
});

// Show single complaint
app.get("/home/:id", (req, res) => {
    const { id } = req.params;
    const complaint = complaints.find(c => c.id === id);
    if (!complaint) {
        return res.status(404).send("Complaint not found");
    }
    res.render("single.ejs", { complaint });
});

// Show edit form
app.get("/home/edit/:id", (req, res) => {
    const { id } = req.params;
    let complaint = complaints.find(c => c.id === id);
    if (!complaint) {
        return res.status(404).send("Complaint not found");
    }
    res.render("edit.ejs", { complaint });
});

// Handle edit form submission
app.post("/home/edit/:id", (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    let complaint = complaints.find(c => c.id === id);
    if (!complaint) {
        return res.status(404).send("Complaint not found");
    }

    // Update fields
    complaint.title = title;
    complaint.description = description;

    // Redirect to complaint detail page
    res.redirect("/home/" + id);
});



app.post("/home/delete/:id", (req, res) => {
    const { id } = req.params;

    // Keep only complaints that don't match this id
    complaints = complaints.filter(c => c.id !== id);

    // After deleting, redirect to home (or render a "deleted" page if you want)
    res.redirect("/home");
});
