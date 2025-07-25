const Recipe = require("../models/recipe.model");

// Import Cloudinary storage
const multer = require('multer');
const { storage } = require('../config/cloudinary.js');
const upload = multer({ storage }); 

// GET all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find();
    return res.json(recipes);
};

//  GET recipe by ID
const getRecipesById = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
};

// ADD new recipe with Cloudinary image
const addRecipe = async (req, res) => {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
        return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const newRecipe = await Recipe.create({
        title,
        ingredients,
        instructions,
        time,
        CoverImage: req.file?.path, // Cloudinary URL
        createdBy: req.user.id,
    });

    return res.status(201).json(newRecipe);
};

//  EDIT existing recipe
const editRecipe = async (req, res) => {
    const { title, ingredients, instructions, time } = req.body;
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    const CoverImage = req.file?.path || recipe.CoverImage;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        { title, ingredients, instructions, time, CoverImage },
        { new: true }
    );

    return res.json(updatedRecipe);
};

// DELETE recipe
const deleteRecipe = async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.id });
        res.json({ status: "ok" });
    } catch (err) {
        return res.status(400).json({ message: "error" });
    }
};

module.exports = {
    getRecipes,
    addRecipe,
    editRecipe,
    deleteRecipe,
    getRecipesById,
    upload, // exported multer Cloudinary upload for use in router
};
