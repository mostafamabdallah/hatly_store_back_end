const productRouter = require("express").Router();
const db = require("../database");

productRouter.get("/products", (req, res) => {
  try {
    db.query(
      "SELECT `tabItem Price`.`price_list` AS `price_list`,`tabBin`.`actual_qty` AS `actual_qty`, `tabBin`.`projected_qty` AS `projected_qty`,`tabItem`.`item_name` AS `item_name`,`tabItem`.`item_group` AS `item_group`,`tabItem`.`image` AS `image`,`tabItem`.`description` AS `description`,`tabItem`.`brand` AS `brand`,`tabItem Price`.`price_list_rate` AS `price_list_rate`,tabItem.item_code ,`tabItem Price`.name AS id FROM ((`tabItem Price` JOIN `tabBin`  ON (`tabItem Price`.`item_code` = `tabBin`.`item_code`))  JOIN `tabItem` ON (`tabItem`.`item_code` = `tabItem Price`.`item_code`)) WHERE `tabBin`.`actual_qty` > 0",
      (err, result, fileds) => {
        return res.send(result);
      }
    );
  } catch (er) {
    res.send(er);
  }
});

productRouter.get("/products/:id", (req, res) => {
  const id = req.params.id;
  try {
    db.query(
      "SELECT `tabItem Price`.`price_list` AS `price_list`,`tabBin`.`actual_qty` AS `actual_qty`, `tabBin`.`projected_qty` AS `projected_qty`,`tabItem`.`item_name` AS `item_name`,`tabItem`.`item_group` AS `item_group`,`tabItem`.`image` AS `image`,`tabItem`.`description` AS `description`,`tabItem`.`brand` AS `brand`,`tabItem Price`.`price_list_rate` AS `price_list_rate`,tabItem.item_code ,`tabItem Price`.name AS id FROM ((`tabItem Price` JOIN `tabBin`  ON (`tabItem Price`.`item_code` = `tabBin`.`item_code`))  JOIN `tabItem` ON (`tabItem`.`item_code` = `tabItem Price`.`item_code`)) WHERE `tabBin`.`actual_qty` > 0 and `tabItem Price`.name = '" +
        id +
        "'",
      (err, result, fileds) => {
        return res.send(result);
      }
    );
  } catch (er) {}
});

productRouter.get("/products/brand/:brand", (req, res) => {
  const brand = req.params.brand;
  try {
    db.query(
      "SELECT `tabItem Price`.`price_list` AS `price_list`,`tabBin`.`actual_qty` AS `actual_qty`, `tabBin`.`projected_qty` AS `projected_qty`,`tabItem`.`item_name` AS `item_name`,`tabItem`.`item_group` AS `item_group`,`tabItem`.`image` AS `image`,`tabItem`.`description` AS `description`,`tabItem`.`brand` AS `brand`,`tabItem Price`.`price_list_rate` AS `price_list_rate`,tabItem.item_code ,`tabItem Price`.name AS id FROM ((`tabItem Price` JOIN `tabBin`  ON (`tabItem Price`.`item_code` = `tabBin`.`item_code`))  JOIN `tabItem` ON (`tabItem`.`item_code` = `tabItem Price`.`item_code`)) WHERE `tabBin`.`actual_qty` > 0 and `tabItem`.brand = '" +
        brand +
        "'",
      (err, result, fileds) => {
        return res.send(result);
      }
    );
  } catch (er) {}
});

productRouter.get("/searchProduct/:product", (req, res) => {
  const product = req.params.product;
  try {
    db.query(
      `SELECT * FROM newschema.tabitem where name like "%${product}%"`,
      (err, result, fileds) => {
        return res.send(result);
      }
    );
  } catch (er) {}
});

productRouter.put("/products/changeQuantity", (req, res) => {
  const items = req.body.items;
  try {
    items.map((item, i) => {
      db.query(
        "UPDATE `tabBin` SET `actual_qty` = `actual_qty` - " +
          item.quantity +
          ", `projected_qty` = `projected_qty` -" +
          item.quantity +
          " WHERE `item_code` = '" +
          item.item_code +
          "' and warehouse = 'Stores - H';"
      );
    });
    return res.send(true);
  } catch (er) {}
});

module.exports = productRouter;

// UPDATE newschema.tabitem SET docstatus = docstatus + 1 WHERE name = 'AMAZFIT GTR 2E +'
