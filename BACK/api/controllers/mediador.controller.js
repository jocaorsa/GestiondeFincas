const Mediador = require("../models/mediador.model");
const mongoose = require('mongoose');

async function getOneMediador (req, res){
    try {
        const mediador = await Mediador.findById(req.params.mediadorId, {__v:0})
        res.json(mediador)
    } catch (error){
        console.log(error)
    }
}

async function getAllMediador (req, res){
    try{
        const mediador = await Mediador.find({__v:0})
        res.json(mediador)
    } catch (error){
        console.log(error)
    }
}

async function createMediador (req, res){
    try{
        const mediador = await Mediador.create(req.body)
        res.json(mediador)
    }catch (error){
        console.log(error)
    }
}

async function updateMediador (req, res){
    try{
        const updatemediador = await Mediador.findByIdAndUpdate (req.params.mediadorId, req.body, {new: true})
        res.json(updatemediador)
    }catch (error){
        console.log(error)
    }
}

async function deleteMediador (req, res) {
    try{
        const delmediador = await Mediador.findByIdAndDelete(req.params.mediadorId)
        res.json(delmediador)
    } catch(error){
        console.log(error)
    }
}


module.exports = {
                getOneMediador,
                getAllMediador,
                createMediador,
                updateMediador,
                deleteMediador
            } 