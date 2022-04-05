const reverseString = (string) => string.split('').reverse().join('');

const module10 = (block) => {
  const blockSize = block.length - 1;

  let code = block.substring(0, blockSize);

  // somar sempre da DIREITA para a ESQUERDA
  code = reverseString(code).split('');

  let sum = 0;

  code.forEach((value, index) => {
    // Os multiplicadores começam com o número 2 (dois), sempre pela direita, alternandose 1 e 2
    // Multiplicar cada algarismo que compõe o número pelo seu respectivo peso (Multiplicador)
    const digitSum = +value * (index % 2 === 0 ? 2 : 1);

    if (digitSum > 9) {
      // Caso o resultado da multiplicação seja maior que 9 (nove) deverão ser somados os algarismos do produto, até reduzi-lo a um único algarismo
      sum += digitSum.toString().split('')
        .map((numberStr) => Number(numberStr))
        .reduce((currentSum, current) => Number(currentSum) + Number(current));
    } else {
      sum += digitSum;
    }
  });

  // Subtrair o total apurado no item anterior, da dezena imediatamente superior ao total apurado
  // Se o resultado da subtração for igual a 10 (dez), o dígito verificador será igual a 0
  const verificatorDigit = (Math.ceil(sum / 10) * 10) - sum;

  return verificatorDigit;
};

const module11 = (block) => {
  const blockSize = block.length - 1;
  let verificatorDigit;

  let code = block.substring(0, blockSize);

  code = reverseString(code).split('');

  let sum = 0;

  code.forEach((value, index) => {
    /* O DAC (Dígito de Auto-Conferência) módulo 11, de um número é calculado multiplicando cada
      algarismo, pela seqüência de multiplicadores 2,3,4,5,6,7,8,9,2,3,4.... posicionados da direita para a esquerda. */
    sum += +value * (2 + (index >= 8 ? index - 8 : index));
  });

  // A soma dos produtos dessa multiplicação é dividida por 11, obtém-se o resto da divisão
  const remainder = sum % 11;

  // Quando o resto da divisão for igual a 0 ou 1, atribuí-se ao DV o digito “0”, e quando for 10, atribuíse ao DV o digito “1”
  if (remainder === 0 || remainder === 1) {
    verificatorDigit = 0;
  } else if (remainder === 10) {
    verificatorDigit = 1;
  } else {
    // O resto deve ser subtraído de 11, o produto da subtração é o DAC
    verificatorDigit = (Math.ceil(sum / 11) * 11) - sum;
  }

  return verificatorDigit;
};

const module11_2 = (number) => {
  let sum = 0;
  // Os multiplicadores (pesos) variam de 2 a 9
  let weight = 2;

  const base = 9;
  const counter = number.length - 1;

  for (let i = counter; i >= 0; i--) {
    // O primeiro dígito da direita para a esquerda deverá ser multiplicado por 2, o segundo por 3 e assim sucessivamente
    // Os resultados das multiplicações devem ser somados
    sum += (Number(number.substring(i, i + 1)) * weight);
    if (weight < base) {
      weight++;
    } else {
      weight = 2;
    }
  }

  // O total da soma deverá ser dividido por 11
  // O resto da divisão deverá ser subtraído de 11:
  let digit = 11 - (sum % 11);

  // Se o resultado da subtração for... igual a 0, 10 e 11 - D.V. igual a 1
  if (digit === 0 || digit === 10 || digit === 11) digit = 1;

  return digit;
};

module.exports = {
  module10,
  module11,
  module11_2,
};
