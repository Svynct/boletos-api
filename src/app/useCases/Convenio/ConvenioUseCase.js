const dateFormatter = require('../../../utils/dateFormatter');

class ConvenioUseCase {
  showConvenioInfo({ barCode, typableLine }) {
    const dateFactor = typableLine.substring(33, 37);

    const formattedDate = dateFormatter(dateFactor);

    const amount = barCode.substring(4, 15);

    return {
      barCode,
      amount: (+amount * 0.01).toFixed(2),
      expirationDate: formattedDate,
    };
  }
}

module.exports = new ConvenioUseCase();
