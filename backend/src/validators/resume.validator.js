// Resume Validator
// TODO: Implement request validation for resume routes

const validateResumeUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  next();
};

module.exports = { validateResumeUpload };
