

const express = require("express");
const router = express.Router();

//importo isAuth
const { isAuth } = require("../../middlewares/auth.middleware")

const{ getAllColors, getColorById,createColor,modifyColor,deleteColor} = require("../controllers/color.controller");

router.get("/", getAllColors);
router.get("/:colorId", getColorById);
router.post("/", [isAuth], createColor )
router.put("/:colorId", [isAuth], modifyColor)
router.delete("/:colorId", [isAuth], deleteColor)

module.exports = router;