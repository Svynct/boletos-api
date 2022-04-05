const { Router } = require('express');

const BoletoController = require('./app/controllers/BoletoController');
const baseValidator = require('./app/middlewares/baseValidator');

const router = Router();
router.get('/boleto/:typableLine', baseValidator, BoletoController.show);

module.exports = router;
