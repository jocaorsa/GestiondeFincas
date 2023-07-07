const Comunidad = require("../models/comunidad.model");
const mongoose = require('mongoose');


async function getOneComunidad (req, res){
    try {
        const comunidad = await Comunidad.findById(req.params.comunidadId, {__v:0})
        res.json(comunidad)
    } catch (error){
        console.log(error)
    }
}

async function getAllComunidad (req, res){
    try{
        const comunidad = await Comunidad.find({__v:0})
        res.json(comunidad)
    } catch (error){
        console.log(error)
    }
}

async function createComunidad (req, res){
    try{
        const comunidad = await Comunidad.create(req.body)
        res.json(comunidad)
    }catch (error){
        console.log(error)
    }
}

async function updateComunidad (req, res){
    try{
        const updatecomunidad = await Comunidad.findByIdAndUpdate (req.params.comunidadId, req.body, {new: true})
        res.json(updatecomunidad)
    }catch (error){
        console.log(error)
    }
}

async function deleteComunidad (req, res) {
    try{
        const delcomunidad = await Comunidad.findByIdAndDelete(req.params.comunidadId)
        res.json(delcomunidad)
    } catch(error){
        console.log(error)
    }
}


module.exports = {
                getOneComunidad,
                getAllComunidad,
                createComunidad,
                updateComunidad,
                deleteComunidad} 