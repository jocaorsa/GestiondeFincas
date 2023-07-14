const Incidencia = require("../models/incidencia.model");
const mongoose = require('mongoose');

async function getOneIncidencia (req, res){
    try {
        const incidencia = await Incidencia.findById(req.params.incidenciaId, {__v:0})
        res.json(incidencia)
    } catch (error){
        console.log(error)
    }
}
async function getAllIncidencia (req, res){
    try{
        const incidencia = await Incidencia.find({__v:0})
        res.json(incidencia)
    } catch (error){
        console.log(error)
    }
}

async function getAllIncidenciaAll (req, res){
    try{
        const incidencia = await Incidencia.find({__v:0}).populate("comunidad_id").populate("proveedor_id")
        res.json(incidencia)
    } catch (error){
        console.log(error)
    }
}


async function createIncidencia (req, res){
    console.log(req.body)
    try{
        console.log(req.body)
        const incidencia = await Incidencia.create(req.body)
        res.json(incidencia)
    }catch (error){
        console.log(error)
    }
}

async function updateIncidencia (req, res){
    try{
        const updateincidencia = await Incidencia.findByIdAndUpdate (req.params.incidenciaId, req.body, {new: true})
        res.json(updateincidencia)
    }catch (error){
        console.log(error)
    }
}

async function deleteIncidencia (req, res) {
    try{
        const delincidencia = await Incidencia.findByIdAndDelete(req.params.incidenciaId)
        res.json(delincidencia)
    } catch(error){
        console.log(error)
    }
}


module.exports = {
                getOneIncidencia,
                getAllIncidencia,
                createIncidencia,
                updateIncidencia,
                deleteIncidencia,
                getAllIncidenciaAll} 