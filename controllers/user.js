//it has a function which we attach with our routes
const User = require("../models/user")

async function createUser(req, res) {
    const body = req.body;
    console.log(req.body,"user input")
    if (!body || !body.first_name) {
        return res.status(400).json({
            error: "First name is required"
        })
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        Job_title: body.Job_title,
        gender: body.gender,

    })
    console.log(result,"result")
    return res.status(201).json({ message: "success", user: result })
}
async function handleGetAllUser(req, res) {
    const allDbUsers = await User.find({})
    return res.send(allDbUsers)
}
async function getUserById(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ err: "user is not found" })
    }
    return res.send(user)
}
async function deteleUser(req, res) {
    const id = req.params.id;
    await User.deleteOne({ _id: id })
    return res.status(200).json({ err: "User deleted successfully" })

}

async function updateUser(req, res) {
    const id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true })
    return res.json(updateUser);

}
module.exports = {
    handleGetAllUser,
    getUserById,
    deteleUser,
    updateUser,
    createUser,
}