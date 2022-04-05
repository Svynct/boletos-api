const BoletoValidator = require('./validators/BoletoValidator');
const ConvenioValidator = require('./validators/ConvenioValidator');

module.exports = (request, response, next) => {
  const { typableLine } = request.params;

  const boletoBarCode = BoletoValidator.validate(typableLine);

  if (boletoBarCode) {
    request.headers.barCodeDto = boletoBarCode;
    next();
  }

  const convenioBarCode = ConvenioValidator.validate(typableLine);

  if (convenioBarCode) {
    request.headers.barCodeDto = convenioBarCode;
  }

  if (!boletoBarCode && !convenioBarCode) {
    response.status(400).send({ error: `${typableLine} is not a valid typable line` });
  }

  next();
};
