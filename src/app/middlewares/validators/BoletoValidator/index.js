const { module10, module11_2 } = require('../../../../utils/modulesCalculator');

class BoletoValidator {
  validate(typableLine) {
    const cleanTypableLine = typableLine.replace(/( |\.)/g, '');

    if (!/^[0-9]{47}$/.test(cleanTypableLine)) {
      return false;
    }

    const barCode = cleanTypableLine.substring(0, 4)
      + cleanTypableLine.substring(32, 48)
      + cleanTypableLine.substring(4, 9)
      + cleanTypableLine.substring(10, 16)
      + cleanTypableLine.substring(16, 20)
      + cleanTypableLine.substring(21, 31);

    const blocks = [];

    blocks[0] = cleanTypableLine.substring(0, 10);
    blocks[1] = cleanTypableLine.substring(10, 21);
    blocks[2] = cleanTypableLine.substring(21, 32);

    let valid = 0;

    blocks.forEach((block) => {
      const verificatorDigit = module10(block);
      if (verificatorDigit === Number(block[block.length - 1])) valid++;
    });

    if (module11_2(barCode.substring(0, 4) + barCode.substring(5, 44)) !== Number(barCode[4])) {
      return false;
    }

    return valid === 3 ? { type: 'boleto', barCode, typableLine: cleanTypableLine } : false;
  }
}

module.exports = new BoletoValidator();
