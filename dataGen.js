require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
//const process = require("process");

//console.log(process.env.MONGO_URI);
async function addProjects() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    const techProjectSchema = new mongoose.Schema({
        title: {type: String, required: true},
        description: {type: String, required: true},
        technologies: [{type: String, required: true}],
        link: {type: String, require: false},
        repo: {type: String, require: false},
        purpose: {type: String, require: false},
        pics: [{type: String, require: false}],
        // other fields...
    });

    const researchProjectSchema = new mongoose.Schema({
        title: {type: String, required: true},
        description: {type: String, required: true},
        link: {type: String, require: false},
        repo: {type: String, require: false},
        purpose: {type: String, require: false},
        // other fields...
    });

    const ProjectModel = mongoose.model("Project", techProjectSchema);

    const projects = JSON.parse(fs.readFileSync("projectData.json"));

    for (const project of projects) {
        const newProject = new ProjectModel(project);
        await newProject.save();
    }

    mongoose.connection.close();
}

addProjects();
