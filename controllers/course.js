const Course = require("../models/course");
const image = require("../utils/image");

async function createCourse (req,res){
    const course = new Course(req.body);

    const imagePath = image.getfileName(req.files.miniature);
    course.miniature = imagePath;

    try {
        const response = await course.save();
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({msg: "Error al crear el curso"});
    }

}

async function getCourse(req , res) {
    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };
    
  try {
    const courses = await Course.paginate({}, options);
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los cursos" });
  }
    
}

async function updateCourse (req, res){
    const {id} = req.params;
    const courseData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getfileName(req.files.miniature);
        courseData.miniature = imagePath;
    }

    try {
        const response = await Course.findByIdAndUpdate(id,courseData);
        res.status(200).send(response);

    } catch (error) {
        res.status(400).send({msg: "Error al actulizar el curso"});
    }
}

async function deleteCourse (req, res){
    const {id} = req.params;

    try {
        await Course.findByIdAndDelete(id);
        res.status(200).send({msg: "Curso Eliminado"});
    } catch (error) {
        res.status(400).send({msg: "Error al Eliminar el Course"});
    }
}

module.exports = {
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
};