const Recipe = require("../models/recipe.model")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
  })
  
const upload = multer({ storage: storage })


const getRecipes = async (req, res) => {
    const recipes = await Recipe.find()
    return res.json(recipes)
};

const getRecipesById = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.json(recipe)
    
};
const addRecipe = async (req, res) => {
    console.log(req.file)
    const {title , ingredients , instructions , time} = req.body;
    if(!title || !ingredients || !instructions ){
        res.json({
            message : "Required fields can't be empty"
        })
    }

    const newRecipe=await Recipe.create({
        title,ingredients,instructions,time,CoverImage:req.file.filename,
        createdBy:req.user.id
    })
    return res.json(newRecipe)
    
};

const editRecipe=async(req,res)=>{
    const {title,ingredients,instructions,time}=req.body 
    let recipe=await Recipe.findById(req.params.id)

    try{
        if(recipe){
            let CoverImage=req.file?.filename ? req.file?.filename : recipe.coverImage
            await Recipe.findByIdAndUpdate(req.params.id,{...req.body,CoverImage},{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
        return res.status(404).json({message:err})
    }
    
}



const deleteRecipe=async(req,res)=>{
    try{
        await Recipe.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }
}


module.exports = {
    getRecipes,
    addRecipe,
    editRecipe,
    deleteRecipe,
    getRecipesById,
    upload
};
