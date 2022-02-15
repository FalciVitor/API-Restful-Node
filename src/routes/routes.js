const express = require('express');
const { route } = require('express/lib/application');

const ControleBairro = require('../controllers/ControleBairro.js');
const ControleEndereco = require('../controllers/ControleEndereco.js');
const ControleMunicipio = require('../controllers/ControleMunicipio.js');
const ControlePessoa = require('../controllers/ControlePessoa.js');
const ControleUF = require('../controllers/ControleUF.js');

const router = express.Router();

//UF
router.post('/uf', ControleUF.create); // Create
router.get('/uf', ControleUF.read); // Read e Consulta
router.put('/uf', ControleUF.update); // Update
router.delete('/uf', ControleUF.delete); // Delete

//Municipios
router.post('/municipio', ControleMunicipio.create); // Create
router.get('/municipio', ControleMunicipio.read); // Read
router.put('/municipio', ControleMunicipio.update); // Update
router.delete('/municipio', ControleMunicipio.delete); // Delete

//Bairros
router.post('/bairro', ControleBairro.create); // Create
router.get('/bairro', ControleBairro.read) // Read
router.put('/bairro', ControleBairro.update); // Update
router.delete('/bairro', ControleBairro.delete); // Delete

// Endereços
router.post('/endereco', ControleEndereco.create); // Create
router.get('/endereco', ControleEndereco.read); // Read
router.put('/endereco', ControleEndereco.update) // Update
router.delete('/endereco', ControleEndereco.delete) // Delete

// Usuarios
router.post('/pessoa', ControlePessoa.create); // Create
router.get('/pessoa', ControlePessoa.read); // Read
router.put('/pessoa', ControlePessoa.update); // Update
router.delete('/pessoa', ControlePessoa.delete); // Delete

module.exports = router