const { module10, module11 } = require('../../../../utils/modulesCalculator');

class ConvenioValidator {
  validate(typableLine) {
    const cleanTypableLine = typableLine.replace(/( |-)/g, '');

    if (!/^[0-9]{48}$/.test(cleanTypableLine)) {
      return false;
    }

    const blocks = [];

    blocks[0] = cleanTypableLine.substring(0, 12);
    blocks[1] = cleanTypableLine.substring(12, 24);
    blocks[2] = cleanTypableLine.substring(24, 36);
    blocks[3] = cleanTypableLine.substring(36, 48);

    const isModuleTen = ['6', '7'].indexOf(cleanTypableLine[2]) !== -1;
    let valid = 0;
    let barCode = '';

    blocks.forEach((block) => {
      if (isModuleTen) {
        const verificatorDigit = module10(block);
        if (verificatorDigit === Number(block[block.length - 1])) valid++;
      } else {
        const verificatorDigit = module11(block);
        if (verificatorDigit === Number(block[block.length - 1])) valid++;
      }

      barCode += block.substring(0, block.length - 1);
    });

    return valid === 4 ? { type: 'convenio', barCode, typableLine: cleanTypableLine } : false;
  }
}

module.exports = new ConvenioValidator();
