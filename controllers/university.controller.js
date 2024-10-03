import University from "../models/university.model.js";

const addUniversity = async (req, res) => {
  const { name, location, logo, description, website } = req.body;

  try {
    const university = await University.findOne({ name: name });

    if (university) {
      return res.status(400).json({ message: "University already exists" });
    }

    const newUniversity = {
      name,
      location,
      logo,
      description,
      website,
    };

    await University.create(newUniversity);

    return res.status(200).json({
      success: true,
      message: "University added successfully",
      data: newUniversity,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const showAllUniversities = async (req, res) => {
  try {
    const university = await University.find({}).populate(
      "coursesOffered",
      "name"
    );

    if (!university) {
      return res.status(201).json({
        success: false,
        message: "No universities found",
      });
    }

    return res.status(200).json({
      success: true,
      data: university,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUniversityById = async (req, res) => {
  
  const {id} = req.params;

  try {
    
    const university = await University.findById(id).populate(
      "coursesOffered"
    );

    if(!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: university,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUniversity = async (req, res) => {
  const { id } = req.params;

  try {
    const university = await University.findByIdAndDelete(id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "University deleted successfully",
      data: university,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUniversity = async (req, res) => {
  const { id } = req.params;
  const { name, location, logo, description, website } = req.body;

  try {
    const university = await University.findByIdAndUpdate(
      id,
      { $set: { name, location, logo, description, website } },
      { new: true }
    );

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "University updated successfully",
      data: university,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export {
  addUniversity,
  showAllUniversities,
  getUniversityById,
  deleteUniversity,
  updateUniversity,
};
