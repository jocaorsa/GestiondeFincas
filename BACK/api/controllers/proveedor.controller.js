const Proveedor = require("../models/proveedor.model");
const mongoose = require('mongoose');

async function getOneProveedor (req, res){
    try {
        const proveedor = await Proveedor.findById(req.params.proveedorId, {__v:0})
        res.json(proveedor)
    } catch (error){
        console.log(error)
    }
}

async function getAllProveedor (req, res){
    try{
        const proveedor = await Proveedor.find({__v:0})
        res.json(proveedor)
    } catch (error){
        console.log(error)
    }
}

async function createProveedor (req, res){
    try{
        const proveedor = await Proveedor.create(req.body)
        res.json(proveedor)
    }catch (error){
        console.log(error)
    }
}

async function updateProveedor (req, res){
    try{
        
        console.log("hola",req.params.proveedorId)
        const updateproveedor = await Proveedor.findByIdAndUpdate (req.params.proveedorId, req.body, {new: true})
        res.json(updateproveedor)
    }catch (error){
        console.log(error)
    }
}

async function deleteProveedor (req, res) {
    try{
        const delproveedor = await Proveedor.findByIdAndDelete(req.params.proveedorId)
        res.json(delproveedor)
    } catch(error){
        console.log(error)
    }
}


module.exports = {
                getOneProveedor,
                getAllProveedor,
                createProveedor,
                updateProveedor,
                deleteProveedor
            } 