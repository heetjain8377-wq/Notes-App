const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const {createNote, readNotes, updateNote, deleteNote} = require("../controller/noteController");

router.post("/create-note", authMiddleware, createNote);
router.get("/", authMiddleware, readNotes);
router.put("/update-note/:id", authMiddleware, updateNote);
router.delete("/delete-note/:id", authMiddleware, deleteNote);

module.exports = router;