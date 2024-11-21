import fs from 'fs';
import multer from 'multer';
import uploadPDFToFilebase from '../routes/signature.route.js';
import Notes from "../models/notes.model.js";
import Subject from "../models/subject.model.js";

const upload = multer({ dest: 'uploads/' });


const addNote = async (req, res) => {
  const { title, description,contentUrl , subject } = req.body;

  try {
    // Check if note with the same title already exists
    const note = await Notes.findOne({ title: title });

    if (note) {
      return res.status(400).json({ message: "Note already exists" });
    }

    const subjectDoc = await Subject.findOne({ name: subject });
    if (!subjectDoc) {
        return res.status(400).json({
            success: false,
            message: "Subject not found"
        });
    }
    // Save the new note with the uploaded PDF URL
    const newNote = new Notes({
      title,
      contentUrl,  // Store the URL of the uploaded PDF
      description,
    });

    await newNote.save();

    subjectDoc.notes.push(newNote._id);
    await subjectDoc.save();

    // Remove the temporary file from 'uploads'

    return res.status(200).json({
      success: true,
      message: "Note added successfully with PDF",
      data: newNote,
    });
  } catch (error) {
    console.error('Error adding note:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Notes.findById(id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    return  res.status(200).json({
      success: true,
      message: "Note found",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, contentUrl, description } = req.body;
  try {
    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const updatedNote = {
      title,
      contentUrl,
      description,
    };

    const updateNote = await Notes.findByIdAndUpdate(id, updatedNote, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updateNote,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Notes.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await Subjects.updateMany(
      { notes: id },
      { $pull: { notes: id } } // This removes the note ID from the notes array
    );

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addNote, getNote, updateNote, deleteNote , upload};
