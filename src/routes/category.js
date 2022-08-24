const categoryRouter = require("express").Router();
const db = require("../database");

categoryRouter.get("/category", (req, res) => {
  try {
    db.query(
      "SELECT `tabItem`.`item_group` AS `item_group` FROM (`tabItem` JOIN `tabItem Price` ON (`tabItem`.`item_code` = `tabItem Price`.`item_code`)) GROUP BY `tabItem`.`item_group`",
      (err, result, fileds) => {
        return res.send(result);
      }
    );
  } catch (er) {}
});

categoryRouter.get("/category/:category", (req, res) => {
  const category = req.params.category;
  try {
    db.query("SELECT tabItem.name AS name,tabItem.item_group AS item_group,tabItem.image AS image,tabItem.description AS description,`tabItem Price`.price_list_rate AS price_list_rate,`tabItem Price`.name AS id FROM tabItem INNER JOIN `tabItem Price` ON tabItem.item_code = `tabItem Price`.item_code WHERE `tabItem`.item_group = '"+category+"'",
      (err, result, fileds) => {
        return res.send(result);
      }
    );
  } catch (er) {}
});

module.exports = categoryRouter;
