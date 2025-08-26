const express = require("express");
const router = express.Router();
const {
    getcontacts,
    postcontacts,
    getcontact,
    putcontacts,
    deletecontact
} = require("../controllers/contact_controllers")
const validatetoken = require("../middleware/validatetokenhandler")
router.use(validatetoken);
router.route("/").get(getcontacts).post(postcontacts);
router.route("/:id").get(getcontact).put(putcontacts).delete(deletecontact);
module.exports = router;