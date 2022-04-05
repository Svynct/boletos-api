/* eslint-disable no-undef */
const ConvenioUseCase = require('./ConvenioUseCase');

describe('showConvenioInfo', () => {
  beforeAll(() => {
    this.convenioMock = {
      barCode: '83640000001331201380008128846271108013618155',
      typableLine: '836400000011331201380002812884627116080136181551',
    };
    this.expectedAmount = '133.12';
    this.expectedDate = '09-12-2000';
  });

  it('Should be able to show complete convenio info', () => {
    const convenio = ConvenioUseCase.showConvenioInfo(this.convenioMock);

    expect(convenio).toHaveProperty('barCode');
    expect(convenio).toHaveProperty('amount');
    expect(convenio).toHaveProperty('expirationDate');
  });

  it('Should be able to show expected convenio info', () => {
    const convenio = ConvenioUseCase.showConvenioInfo(this.convenioMock);

    expect(convenio.barCode).toBe(this.convenioMock.barCode);
    expect(convenio.amount).toBe(this.expectedAmount);
    expect(convenio.expirationDate).toBe(this.expectedDate);
  });
});
