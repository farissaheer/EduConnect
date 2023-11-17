import Module from "../Models/moduleModel.js";

const module = {
  createModule: async (req, res) => {
    const { moduleName, description, tutorid, courseid } = req.body;
    try {
      const video = req.file.filename;
      const newModule = new Module({
        tutorid,
        courseid,
        moduleName,
        description,
        video,
      });
      await newModule.save();
      res.status(200).json({ status: 200, message: "Module Added" });
    } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
    }
  },
};

export default module;
