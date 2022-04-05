/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const BoletoController = require('./index');

setupMocks = (type) => {
  function jsonCallback(obj, body) {
    obj.body = body;
  }

  function statusCodeCallback(obj, statusCode) {
    obj.statusCode = statusCode;
  }

  let barCodeDto = {};

  if (type === 'boleto') {
    barCodeDto = {
      type,
      typableLine: this.boletoMock.typableLine,
      barCode: this.boletoMock.barCode,
    };
  } else if (type === 'convenio') {
    barCodeDto = {
      type,
      typableLine: this.convenioMock.typableLine,
      barCode: this.convenioMock.barCode,
    };
  } else if (type === 'invalid-type') {
    barCodeDto = {
      type,
      typableLine: '123456789123456789123456789',
      barCode: '123456789123456789123456789',
    };
  } else {
    barCodeDto = undefined;
  }

  return {
    mockRequest: {
      headers: {
        barCodeDto,
      },
    },
    mockResponse: {
      json(data) {
        jsonCallback(this, data);
        return this;
      },
      status(data) {
        statusCodeCallback(this, data);
        return this;
      },
      statusCode: 200,
    },
    mockNext: jest.fn(),
  };
};

describe('validate', () => {
  beforeAll(() => {
    this.boletoMock = {
      barCode: '21299758700000020000001121100012100447561740',
      typableLine: '21290001192110001210904475617405975870000002000',
      expectedType: 'boleto',
    };

    this.convenioMock = {
      barCode: '83640000001331201380008128846271108013618155',
      typableLine: '836400000011331201380002812884627116080136181551',
      expectedType: 'convenio',
    };

    this.expected400error = "Not a valid ticket type - types allowed are either 'boleto' or 'convenio'";
  });

  it('Should return status 200 when validated boleto is informed', async () => {
    const { mockRequest, mockResponse, mockNext } = setupMocks('boleto');

    await BoletoController.show(mockRequest, mockResponse, mockNext);

    const boleto = mockResponse.body;

    expect(boleto).toHaveProperty('barCode');
    expect(boleto).toHaveProperty('amount');
    expect(boleto).toHaveProperty('expirationDate');
    expect(mockResponse.statusCode).toBe(200);
  });

  it('Should return status 200 when validated convenio is informed', async () => {
    const { mockRequest, mockResponse, mockNext } = setupMocks('convenio');

    await BoletoController.show(mockRequest, mockResponse, mockNext);

    const convenio = mockResponse.body;

    expect(convenio).toHaveProperty('barCode');
    expect(convenio).toHaveProperty('amount');
    expect(convenio).toHaveProperty('expirationDate');
    expect(mockResponse.statusCode).toBe(200);
  });

  it('Should return status 400 when invalid type is informed', async () => {
    const { mockRequest, mockResponse, mockNext } = setupMocks('invalid-type');

    await BoletoController.show(mockRequest, mockResponse, mockNext);

    const boleto = mockResponse.body;

    expect(boleto).toHaveProperty('error');
    expect(boleto.error).toBe(this.expected400error);
    expect(mockResponse.statusCode).toBe(400);
  });

  it('Should return status 500 when NO-type is informed', async () => {
    const { mockRequest, mockResponse, mockNext } = setupMocks();

    await BoletoController.show(mockRequest, mockResponse, mockNext);

    const boleto = mockResponse.body;

    expect(boleto).toHaveProperty('error');
    expect(mockResponse.statusCode).toBe(500);
  });
});
