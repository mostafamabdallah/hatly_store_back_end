const attactmentsRouter = require("express").Router();
const db = require("../database");

attactmentsRouter.get("/attactments", (req, res) => {
    const code = req.query.code;
    try {
        db.query("SELECT file_url FROM _ce526a619e3f46ae.tabFile where attached_to_doctype ='item' and folder='Home/Attachments' and attached_to_name ='" + code + "'",
            (err, result, fileds) => {
                return res.send(result);
            }
        );
    } catch (er) { }
});

module.exports = attactmentsRouter;
