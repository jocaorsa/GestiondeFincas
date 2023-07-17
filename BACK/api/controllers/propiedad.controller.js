const Propiedad = require("../models/propiedad.model");
const mongoose = require('mongoose');

async function getOnePropiedad (req, res){
    try {
        const propiedad = await Propiedad.findById(req.params.propiedadId, {__v:0})
        res.json(propiedad)
    } catch (error){
        console.log(error)
    }
}

async function getAllPropiedad (req, res){
    try{
        const propiedad = await Propiedad.find({__v:0}).populate("comunidad_id")
        res.json(propiedad)
    } catch (error){
        console.log(error)
    }
}

async function createPropiedad (req, res){
    try{
        const propiedad = await Propiedad.create(req.body)
        res.json(propiedad)
    }catch (error){
        console.log(error)
    }
}

async function updatePropiedad (req, res){
    try{
        const updatepropiedad = await Propiedad.findByIdAndUpdate (req.params.propiedadId, req.body, {new: true})
        res.json(updatepropiedad)
    }catch (error){
        console.log(error)
    }
}

async function deletePropiedad (req, res) {
    try{
        const delpropiedad = await Propiedad.findByIdAndDelete(req.params.propiedadId)
        res.json(delpropiedad)
    } catch(error){
        console.log(error)
    }
}


module.exports = {
                getOnePropiedad,
                getAllPropiedad,
                createPropiedad,
                updatePropiedad,
                deletePropiedad
            } 