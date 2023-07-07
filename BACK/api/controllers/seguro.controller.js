const Seguro = require("../models/seguro.model");
const mongoose = require('mongoose');

async function getOneSeguro (req, res){
    try {
        const seguro = await Seguro.findById(req.params.seguroId, {__v:0})
        res.json(seguro)
    } catch (error){
        console.log(error)
    }
}

async function getAllSeguro (req, res){
    try{
        const seguro = await Seguro.find({__v:0})
        res.json(seguro)
    } catch (error){
        console.log(error)
    }
}

async function createSeguro (req, res){
    try{
        const seguro = await Seguro.create(req.body)
        res.json(seguro)
    }catch (error){
        console.log(error)
    }
}

async function updateSeguro (req, res){
    try{
        const updateseguro = await Seguro.findByIdAndUpdate (req.params.seguroId, req.body, {new: true})
        res.json(updateseguro)
    }catch (error){
        console.log(error)
    }
}

async function deleteSeguro (req, res) {
    try{
        const delseguro = await Seguro.findByIdAndDelete(req.params.seguroId)
        res.json(delseguro)
    } catch(error){
        console.log(error)
    }
}


module.exports = {
                getOneSeguro,
                getAllSeguro,
                createSeguro,
                updateSeguro,
                deleteSeguro
            } 