const noteModel = require("../models/noteModel");
const userModel = require("../models/userModel");

async function createNote(req, res) {
    try {
        const { title, content, userId } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success : false,
                message: "Enter both title and content"
            })
        }

        const note = await noteModel.create({
            title,
            content,
            userId: req.user.id
        })

        console.log(req.user);
        console.log(req.user.id);

        res.status(200).json({
            success : true,
            message: "Note created successfully",
            note
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message: error.message
        })
    }
};

async function readNotes(req, res) {
    try {
        const notes = await noteModel.find({ userId: req.user.id });

        console.log(req.user);
        console.log(req.user.id);

        res.status(200).json({
            message: "Notes fetched successfully",
            notes
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function updateNote(req, res) {
    try {
        const id = req.params.id;

        const note = await noteModel.findOne({ _id: id });

        if (!note) {
            return res.status(400).json({
                success : false,
                message: "Note not found"
            })
        }

        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success : false,
                message: "Forbiddden access"
            })
        }

        const { title, content } = req.body;

        const updatedNote = await noteModel.findByIdAndUpdate(id, {
            title,
            content
        }, {
            new: true
        }
        )

        res.status(200).json({
            success : true,
            message: "Note updated successfully",
            note: updatedNote
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message: error.message
        })
    }
};

async function deleteNote(req, res) {
    try {
        const id = req.params.id;

        const note = await noteModel.findOne({ _id: id });

        if (!note) {
            return res.status(400).json({
                success : false,
                message: "Note not found"
            })
        }

        if (note.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success : false,
                message: "Forbiddden access"
            })
        }

        const deletedNote = await noteModel.findByIdAndDelete(id);

        res.status(200).json({
            success : true,
            message : "Note deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message: error.message
        })
    }
};

module.exports = { createNote, readNotes, updateNote, deleteNote};