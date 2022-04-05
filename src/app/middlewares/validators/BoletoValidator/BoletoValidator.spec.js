/* eslint-disable no-undef */
const BoletoValidator = require('./index');

describe('validate', () => {
  beforeAll(() => {
    this.boletoMock = {
      barCode: '21299758700000020000001121100012100447561740',
      typableLine: '21290001192110001210904475617405975870000002000',
      expectedType: 'boleto',
      invalidTypableLine: '21100012109044756174',
      convenioTypableLine: '836400000011331201380002812884627116080136181551',
    };
  });

  it('Should be able to validate boleto', () => {
    const boleto = BoletoValidator.validate(this.boletoMock.typableLine);

    expect(boleto).toHaveProperty('type');
    expect(boleto).toHaveProperty('barCode');
    expect(boleto).toHaveProperty('typableLine');
  });

  it('Should be able to return validated boleto', () => {
    const boleto = BoletoValidator.validate(this.boletoMock.typableLine);

    expect(boleto.type).toBe(this.boletoMock.expectedType);
    expect(boleto.barCode).toBe(this.boletoMock.barCode);
    expect(boleto.typableLine).toBe(this.boletoMock.typableLine);
  });

  it('Should return FALSE when validating invalid boleto format', () => {
    const boleto = BoletoValidator.validate(this.boletoMock.invalidTypableLine);

    expect(boleto).toBe(false);
  });

  it('Should return FALSE when trying to validate a non-boleto', () => {
    const boleto = BoletoValidator.validate(this.boletoMock.convenioTypableLine);

    expect(boleto).toBe(false);
  });
});
