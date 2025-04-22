const express = require("express");
const router = express.Router();
const { getRecipes , addRecipe , editRecipe , deleteRecipe ,getRecipesById,upload} = require("../controller/recipe.controller.js");
const verifyToken = require("../middleware/auth.js")


router.get('/', getRecipes);
router.get("/:id",getRecipesById)
router.post("/",upload.single('file'),verifyToken ,addRecipe) //add recipe
router.put("/:id",upload.single('file'),editRecipe)
router.delete("/:id",deleteRecipe)


module.exports = router;
