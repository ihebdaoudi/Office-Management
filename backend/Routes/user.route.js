const express = require("express");
const userRouter = express.Router();
const { register,login,getusers,updateUserRole,deleteUser,toggleArchive} = require("../Controllers/user.contoller");


userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", getusers);
userRouter.put("/:id", updateUserRole);
userRouter.delete("/:id",deleteUser);
userRouter.put("/archive/:id",toggleArchive);





module.exports = userRouter;