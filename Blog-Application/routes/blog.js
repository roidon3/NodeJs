const { Router } = require("express");
const router = Router();

const { handleCreateBlog } = require("../controller/blog");
const { checkForAuthentication } = require("../middleware/authentication");

router.get("/create", checkForAuthentication, (req, res) => {
    return res.render("addBlog");
});

router.post("/create", checkForAuthentication, handleCreateBlog);

module.exports = router;