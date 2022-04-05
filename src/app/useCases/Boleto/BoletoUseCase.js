const dateFormatter = require('../../../utils/dateFormatter');

class BoletoUseCase {
  showBoletoInfo({ barCode, typableLine }) {
    const dateFactor = typableLine.substring(33, 37);

    const formattedTime = dateFormatter(dateFactor);

    const amountFactor = typableLine.substring(37, 47);

    return {
      barCode,
      amount: (amountFactor * 0.01).toFixed(2),
      expirationDate: formattedTime,
    };
  }
}

module.exports = new BoletoUseCase();
