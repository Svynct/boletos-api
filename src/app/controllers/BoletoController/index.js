const BoletoUseCase = require('../../useCases/Boleto/BoletoUseCase');
const ConvenioUseCase = require('../../useCases/Convenio/ConvenioUseCase');

class BoletoController {
  async show(request, response) {
    const { barCodeDto } = request.headers;

    let boleto = null;

    try {
      if (barCodeDto.type === 'boleto') {
        boleto = BoletoUseCase.showBoletoInfo({ barCode: barCodeDto.barCode, typableLine: barCodeDto.typableLine });
      } else if (barCodeDto.type === 'convenio') {
        boleto = ConvenioUseCase.showConvenioInfo({ barCode: barCodeDto.barCode, typableLine: barCodeDto.typableLine });
      } else {
        return response.status(400).json({ error: "Not a valid ticket type - types allowed are either 'boleto' or 'convenio'" });
      }
    } catch (err) {
      return response.status(500).json({ error: err });
    }

    return response.json(boleto);
  }
}

module.exports = new BoletoController();
