/* eslint-disable no-undef */
const BoletoUseCase = require('./BoletoUseCase');

describe('showBoletoInfo', () => {
  beforeAll(() => {
    this.boletoMock = {
      barCode: '21299758700000020000001121100012100447561740',
      typableLine: '21290001192110001210904475617405975870000002000',
    };
    this.expectedAmount = '20.00';
    this.expectedDate = '16-07-2018';
  });

  it('Should be able to show complete boleto info', () => {
    const boleto = BoletoUseCase.showBoletoInfo(this.boletoMock);

    expect(boleto).toHaveProperty('barCode');
    expect(boleto).toHaveProperty('amount');
    expect(boleto).toHaveProperty('expirationDate');
  });

  it('Should be able to show expected boleto info', () => {
    const boleto = BoletoUseCase.showBoletoInfo(this.boletoMock);

    expect(boleto.barCode).toBe(this.boletoMock.barCode);
    expect(boleto.amount).toBe(this.expectedAmount);
    expect(boleto.expirationDate).toBe(this.expectedDate);
  });
});
