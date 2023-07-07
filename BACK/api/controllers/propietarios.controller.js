const Propietarios = require("../models/propietarios.model");
const mongoose = require('mongoose');

async function getOnePropietarios (req, res){
    try {
        const propietarios = await Propietarios.findById(req.params.propietariosId, {__v:0})
        res.json(propietarios)
    } catch (error){
        console.log(error)
    }
}

async function getAllPropietarios (req, res){
    try{
        const propietarios = await Propietarios.find({__v:0})
        res.json(propietarios)
    } catch (error){
        console.log(error)
    }
}

async function createPropietarios (req, res){
    try{
        const propietarios = await Propietarios.create(req.body)
        res.json(propietarios)
    }catch (error){
        console.log(error)
    }
}

async function updatePropietarios (req, res){
    try{
        const updatepropietarios = await Propietarios.findByIdAndUpdate (req.params.propietariosId, req.body, {new: true})
        res.json(updatepropietarios)
    }catch (error){
        console.log(error)
    }
}

async function deletePropietarios (req, res) {
    try{
        const delpropietarios = await Propietarios.findByIdAndDelete(req.params.propietariosId)
        res.json(delpropietarios)
    } catch(error){
        console.log(error)
    }
}


module.exports = {
                getOnePropietarios,
                getAllPropietarios,
                createPropietarios,
                updatePropietarios,
                deletePropietarios
            } 