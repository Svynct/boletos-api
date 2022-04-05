/* eslint-disable no-undef */
const ConvenioValidator = require('./index');

describe('validate', () => {
  beforeAll(() => {
    this.convenioMock = {
      barCode: '83640000001331201380008128846271108013618155',
      typableLine: '836400000011331201380002812884627116080136181551',
      expectedType: 'convenio',
      invalidTypableLine: '2013800028128846271160',
      boletoTypableLine: '21290001192110001210904475617405975870000002000',
    };
  });

  it('Should be able to validate convenio', () => {
    const convenio = ConvenioValidator.validate(this.convenioMock.typableLine);

    expect(convenio).toHaveProperty('type');
    expect(convenio).toHaveProperty('barCode');
    expect(convenio).toHaveProperty('typableLine');
  });

  it('Should be able to return validated convenio', () => {
    const convenio = ConvenioValidator.validate(this.convenioMock.typableLine);

    expect(convenio.type).toBe(this.convenioMock.expectedType);
    expect(convenio.barCode).toBe(this.convenioMock.barCode);
    expect(convenio.typableLine).toBe(this.convenioMock.typableLine);
  });

  it('Should return FALSE when validating invalid convenio format', () => {
    const convenio = ConvenioValidator.validate(this.convenioMock.invalidTypableLine);

    expect(convenio).toBe(false);
  });

  it('Should return FALSE when trying to validate a non-convenio', () => {
    const convenio = ConvenioValidator.validate(this.convenioMock.boletoTypableLine);

    expect(convenio).toBe(false);
  });
});
