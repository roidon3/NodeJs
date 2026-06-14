const express = require("express");
const {
    handleGetAllUser,
    getUserById,
    deteleUser,
    updateUser,
    createUser
} = require("../controllers/user");

const router = express.Router();

//1.POST 
router.post("/", createUser)

//2.GET all the users
router.get("/", handleGetAllUser)

//3.GET a particular user (GET element by ID)
router.get("/:id", getUserById)

//4.DELETE
router.delete("/:id", deteleUser)

//5.PATCH 
router.patch("/:id", updateUser)

module.exports = router;