const brandRouter = require("express").Router();
const db = require("../database");

brandRouter.get("/brand", (req, res) => {
  try {
    db.query(
      "SELECT `tabItem`.`brand` AS `brand` FROM ((`tabItem Price` JOIN `tabBin` ON (`tabItem Price`.`item_code` = `tabBin`.`item_code`)) JOIN `tabItem` ON (`tabItem`.`item_code` = `tabItem Price`.`item_code`)) WHERE `tabBin`.`actual_qty` <> 0 GROUP BY `tabItem`.`brand`",
      (err, result, fileds) => {
        return res.send(result);
      }
    );
  } catch (er) {}
});

brandRouter.get("/brand/:category", (req, res) => {
  const category = req.params.category;
  try {
    db.query(
      "SELECT `tabItem`.`brand` AS `brand`,`tabItem`.`item_group` AS `item_group` FROM ((`tabItem Price` JOIN `tabBin` ON (`tabItem Price`.`item_code` = `tabBin`.`item_code`)) JOIN `tabItem` ON (`tabItem`.`item_code` = `tabItem Price`.`item_code`)) WHERE `tabBin`.`actual_qty` <> 0 and `tabItem`.item_group = '"+category+"' GROUP BY `tabItem`.`brand`",
      (err, result, fileds) => {
        return res.send(result);
      }
    );
  } catch (er) {}
});

module.exports = brandRouter;
