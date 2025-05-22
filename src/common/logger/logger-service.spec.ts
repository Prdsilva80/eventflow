import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '@/common/logger/logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  let consoleSpy: {
    log: jest.SpyInstance;
    error: jest.SpyInstance;
    warn: jest.SpyInstance;
    debug: jest.SpyInstance;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  beforeEach(() => {
    // Espionar os métodos do console com tipagem explícita
    consoleSpy = {
      log: jest.spyOn(console, 'log').mockImplementation(() => {}),
      error: jest.spyOn(console, 'error').mockImplementation(() => {}),
      warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
      debug: jest.spyOn(console, 'debug').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    // Restaurar os métodos do console
    consoleSpy.log.mockRestore();
    consoleSpy.error.mockRestore();
    consoleSpy.warn.mockRestore();
    consoleSpy.debug.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setContext', () => {
    it('should set context', () => {
      service.setContext('TestContext');

      // Testar se o contexto foi definido chamando um método que o utiliza
      service.log('Test message');

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.objectContaining({
          context: 'TestContext',
        }),
      );
    });
  });

  describe('log', () => {
    it('should log message with context', () => {
      service.log('Test log message', 'TestContext');

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'INFO',
          message: 'Test log message',
          context: 'TestContext',
          timestamp: expect.any(String),
        }),
      );
    });

    it('should log object message', () => {
      const objMessage = { key: 'value' };
      service.log(objMessage, 'TestContext');

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'INFO',
          message: JSON.stringify(objMessage),
          context: 'TestContext',
        }),
      );
    });

    it('should use default context if not provided', () => {
      service.setContext('DefaultContext');
      service.log('Test message');

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.objectContaining({
          context: 'DefaultContext',
        }),
      );
    });
  });

  describe('error', () => {
    it('should log error message with context', () => {
      service.error('Test error message', undefined, 'TestContext');

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'ERROR',
          message: 'Test error message',
          context: 'TestContext',
        }),
      );
    });

    it('should log error with stack trace', () => {
      const trace = 'Error stack trace';
      service.error('Test error message', trace, 'TestContext');

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'ERROR',
          message: 'Test error message',
        }),
      );
      expect(consoleSpy.error).toHaveBeenCalledWith(trace);
    });
  });

  describe('warn', () => {
    it('should log warning message with context', () => {
      service.warn('Test warning message', 'TestContext');

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'WARN',
          message: 'Test warning message',
          context: 'TestContext',
        }),
      );
    });
  });

  describe('debug', () => {
    it('should log debug message with context', () => {
      service.debug('Test debug message', 'TestContext');

      expect(consoleSpy.debug).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'DEBUG',
          message: 'Test debug message',
          context: 'TestContext',
        }),
      );
    });
  });
});
