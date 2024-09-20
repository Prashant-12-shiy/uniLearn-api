import Project from "../models/project.model.js";

const addProject = async (req, res) => {
  const {
    title,
    description,
    projectType,
    startDate,
    endDate,
    status,
    resourcesUrl,
    semester,
  } = req.body;

  try {
    const project = await Project.findOne({
      title: title,
    });

    if (project) {
      return res.status(400).json({
        success: false,
        message: "Project already exists",
      });
    }

    const newProject = new Project({
      title,
      description,
      projectType,
      startDate,
      endDate,
      status,
      resourcesUrl,
      semester,
    });

    await newProject.save();

    return res.status(200).json({
      success: true,
      message: "Project added successfully",
      data: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.find({});

    if (!project) {
      return res.status(200).json({
        success: true,
        message: "Project not found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project found",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    projectType,
    startDate,
    endDate,
    status,
    resourcesUrl,
  } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          projectType,
          startDate,
          endDate,
          status,
          resourcesUrl,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const deleteProject = await Project.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: deleteProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addProject, getProject, updateProject, deleteProject };
