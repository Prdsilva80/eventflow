import { Test, TestingModule } from '@nestjs/testing';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();

    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe('catch', () => {
    it('should format error response for string exception response', () => {
      // Mock do HttpException com resposta string
      const exception = new HttpException(
        'Test error message',
        HttpStatus.BAD_REQUEST,
      );

      // Mock do ArgumentsHost
      const json = jest.fn();
      const status = jest.fn().mockReturnValue({ json });
      const getResponse = jest.fn().mockReturnValue({ status });
      const getRequest = jest.fn().mockReturnValue({ url: '/test-url' });
      const switchToHttp = jest
        .fn()
        .mockReturnValue({ getResponse, getRequest });

      const host = {
        switchToHttp,
      } as unknown as ArgumentsHost;

      // Executar o método catch
      filter.catch(exception, host);

      // Verificar se os métodos foram chamados corretamente
      expect(switchToHttp).toHaveBeenCalled();
      expect(getResponse).toHaveBeenCalled();
      expect(getRequest).toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(json).toHaveBeenCalledWith({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: expect.any(String),
        path: '/test-url',
        message: 'Test error message',
      });
    });

    it('should format error response for object exception response', () => {
      // Mock do HttpException com resposta objeto
      const exceptionResponse = {
        message: 'Test error message',
        error: 'Bad Request',
      };
      const exception = new HttpException(
        exceptionResponse,
        HttpStatus.BAD_REQUEST,
      );

      // Mock do ArgumentsHost
      const json = jest.fn();
      const status = jest.fn().mockReturnValue({ json });
      const getResponse = jest.fn().mockReturnValue({ status });
      const getRequest = jest.fn().mockReturnValue({ url: '/test-url' });
      const switchToHttp = jest
        .fn()
        .mockReturnValue({ getResponse, getRequest });

      const host = {
        switchToHttp,
      } as unknown as ArgumentsHost;

      // Executar o método catch
      filter.catch(exception, host);

      // Verificar se os métodos foram chamados corretamente
      expect(switchToHttp).toHaveBeenCalled();
      expect(getResponse).toHaveBeenCalled();
      expect(getRequest).toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(json).toHaveBeenCalledWith({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: expect.any(String),
        path: '/test-url',
        message: 'Test error message',
      });
    });

    it('should use default message when exception response has no message', () => {
      // Mock do HttpException com resposta objeto sem message
      const exceptionResponse = {
        error: 'Bad Request',
      };
      const exception = new HttpException(
        exceptionResponse,
        HttpStatus.BAD_REQUEST,
      );

      // Mock do ArgumentsHost
      const json = jest.fn();
      const status = jest.fn().mockReturnValue({ json });
      const getResponse = jest.fn().mockReturnValue({ status });
      const getRequest = jest.fn().mockReturnValue({ url: '/test-url' });
      const switchToHttp = jest
        .fn()
        .mockReturnValue({ getResponse, getRequest });

      const host = {
        switchToHttp,
      } as unknown as ArgumentsHost;

      // Executar o método catch
      filter.catch(exception, host);

      // Verificar se os métodos foram chamados corretamente
      expect(json).toHaveBeenCalledWith({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: expect.any(String),
        path: '/test-url',
        message: 'Erro interno',
      });
    });
  });
});
