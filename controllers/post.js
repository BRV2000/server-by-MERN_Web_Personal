const Post = require("../models/post");
const image = require("../utils/image");

async function createPost (req, res) {
 const post = new Post(req.body);
 post.created_at = new Date();

 const imagePath = image.getfileName(req.files.miniature);
 post.miniature = imagePath;

 try {
    const response = await post.save();
    res.status(200).send(response);
 } catch (error) {
    res.status(400).send({msg: "Error al crear el post"});
 }
}

async function getPosts (req,res) {
    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {created_at: "desc"}
    };

    try {
        const post = await Post.paginate({},options);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({msg: "Error al obtener Posts"});
    }
    
}

async function updatePost(req, res) {
    const {id} = req.params;
    const postData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getfileName(req.files.miniature);
        postData.miniature = imagePath;
    }

    try {
        await Post.findByIdAndUpdate(id,postData);
        res.status(200).send({msg: "El post se actualizo con exito"});
    } catch (error) {
        res.status(400).send({msg:"Error al actualizar"});
    }
}

async function detelePost (req, res) {
    const {id} = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.status(200).send({msg: "El Post ha sido borrado con exito"});
    } catch (error) {
        res.status(400).send({msg: "Error al borrar el Post"});
    }
}

async function gettingPost (req,res){
    const {path} = req.params;

    try {
        const response = await Post.findOne({path});

        if (!response) {
            res.status(400).send({msg: "No se ha encontrado ningun post"});
        } else {
            res.status(200).send(response);   
        }
    } catch (error) {
        res.status(500).send({msg: "Error del servidor"});
    }
    
}

module.exports = { 
    createPost,
    getPosts,
    updatePost,
    detelePost,
    gettingPost,
};