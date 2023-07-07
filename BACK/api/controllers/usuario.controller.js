const Usuario = require("../models/usuario.model");
const mongoose = require('mongoose');


async function getOneUsuario (req, res){
    try {
        const usuario = await Usuario.findById(req.params.usuarioId, {__v:0})
        res.json(usuario)
    } catch (error){
        console.log(error)
    }
}

async function getAllUsuario (req, res){
    try{
        const usuario = await Usuario.find({__v:0})
        res.json(usuario)
    } catch (error){
        console.log(error)
    }
}

async function createUsuario (req, res){
    try{
        const usuario = await Usuario.create(req.body)
        res.json(usuario)
    }catch (error){
        console.log(error)
    }
}

async function updateUsuario (req, res){
    try{
        const updateusuario = await Usuario.findByIdAndUpdate (req.params.usuarioId, req.body, {new: true})
        res.json(updateusuario)
    }catch (error){
        console.log(error)
    }
}

async function deleteUsuario (req, res) {
    try{
        const delusuario = await Usuario.findByIdAndDelete(req.params.usuarioId)
        res.json(delusuario)
    } catch(error){
        console.log(error)
    }
}


module.exports = {
                getOneUsuario,
                getAllUsuario,
                createUsuario,
                updateUsuario,
                deleteUsuario
            } 