const fetch = require("node-fetch");
const menuProvider = require("./lib/menuProvider");

module.exports = async (req, res) => {
  const todaysMeals = await menuProvider.getMenuRawData(fetch);
  res.send(todaysMeals);
};
