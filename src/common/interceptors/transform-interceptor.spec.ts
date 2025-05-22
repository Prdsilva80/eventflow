import { Test, TestingModule } from '@nestjs/testing';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

describe('TransformInterceptor', () => {
  let interceptor: TransformInterceptor<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformInterceptor],
    }).compile();

    interceptor =
      module.get<TransformInterceptor<unknown>>(TransformInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('intercept', () => {
    it('should transform the response data into the expected format', (done) => {
      const responseData = { id: 1, name: 'Test' };
      const mockExecutionContext = {} as ExecutionContext;
      const mockCallHandler: CallHandler = {
        handle: () => of(responseData),
      };

      interceptor
        .intercept(mockExecutionContext, mockCallHandler)
        .pipe(
          tap((transformedResponse) => {
            expect(transformedResponse).toEqual({
              success: true,
              data: responseData,
            });
            done();
          }),
        )
        .subscribe();
    });

    it('should handle null or undefined response data', (done) => {
      const mockExecutionContext = {} as ExecutionContext;
      const mockCallHandler: CallHandler = {
        handle: () => of(null),
      };

      interceptor
        .intercept(mockExecutionContext, mockCallHandler)
        .pipe(
          tap((transformedResponse) => {
            expect(transformedResponse).toEqual({
              success: true,
              data: null,
            });
            done();
          }),
        )
        .subscribe();
    });

    it('should handle array response data', (done) => {
      const responseData = [
        { id: 1, name: 'Test1' },
        { id: 2, name: 'Test2' },
      ];
      const mockExecutionContext = {} as ExecutionContext;
      const mockCallHandler: CallHandler = {
        handle: () => of(responseData),
      };

      interceptor
        .intercept(mockExecutionContext, mockCallHandler)
        .pipe(
          tap((transformedResponse) => {
            expect(transformedResponse).toEqual({
              success: true,
              data: responseData,
            });
            done();
          }),
        )
        .subscribe();
    });
  });
});
