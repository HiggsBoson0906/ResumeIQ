// Dashboard Controller
// TODO: Implement dashboard endpoints

const getDashboardStats = async (req, res) => {
  try {
    res.status(200).json({
      message: "Dashboard stats",
      data: {},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
