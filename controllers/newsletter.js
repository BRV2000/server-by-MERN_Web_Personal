const Newsletter = require("../models/newsletters");

async function suscribeEmail (req,res) {
    const { email} = req.body;

    if(!email) res.status(400).send({msg: "Email Obligatorio"});

    const newsletter = new Newsletter({
        email: email.toLowerCase(),
    });

    try {
        await newsletter.save();
        res.status(200).send({msg: "Se ha registrado el Email"});
    } catch (error) {
        res.status().send({msg: "Error del registro del Email"});
    }
}

async function getEmails(req, res) {
    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    try {
        const response = await Newsletter.paginate({},options);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({msg: "Error al obtener los Emails"});
    }

}

async function deleteEmails (req,res){
    const {id} = req.params

    try {
        await Newsletter.findByIdAndDelete(id);
        res.status(200).send({msg: "Email se ha eliminado con exito"});
    } catch (error) {
        res.status(400).send({msg: "Error al Eliminar el Email"})
    }
}

module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmails,
};