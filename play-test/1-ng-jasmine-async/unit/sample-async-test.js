describe('angular promise in jasmine > ', function () {

    var _sampleAsyncService;
    var _$httpBackend;

    //bootstrap the module
    beforeEach(module('async-module-test', function () {

    }));

    //inject some dependencies : 
    beforeEach(inject(function ($httpBackend, sampleAsyncService) {
        _$httpBackend = $httpBackend;
        _sampleAsyncService = sampleAsyncService;
    }));
    
     it('simple async should pass', function (done) {

        inject(function ($rootScope) {
            var testMethod = function (result) {
                expect(result).toBe('resolved!');
            }

            var testFail = function (err) {
                fail();
            }

            var promise = _sampleAsyncService.asyncMethod('yes', false);

            promise.then(testMethod).catch(testFail).finally(done);
            
            $rootScope.$apply();
        });

    });
    
    it('simple async should be rejected', function (done) {

        inject(function ($rootScope) {
            var testMethod = function (result) {
                fail();
            }

            var testFail = function (err) {
                expect(err).toBe('failing resolve!');
            }

            var promise = _sampleAsyncService.asyncMethod('yes',true);

            promise.then(testMethod).catch(testFail).finally(done);
            
            $rootScope.$apply();
        });

    });

    
    it('timeout should be successfull', function (done) {
        inject(function ($timeout) {

            var testSuccess = function (result) {
                expect(result).toBe('resolved!');
            }

            var promise = _sampleAsyncService.asyncMethodTimeOut('yes');

            promise.then(testSuccess).then(done);

            //$timeout.flush(100);
            $timeout.flush(1001);
        });

    });

   

    it('test async http', function (done) {

        var mockReturendValue = 'mocked returned value';

        var testMethod = function (data) {
            expect(data).toBe('mocked returned value');
        };

        _$httpBackend.when('GET', 'http://localhost:8000/myEndpoint').respond(mockReturendValue);

        _sampleAsyncService.asyncMethodHttp().then(testMethod).finally(done);

        _$httpBackend.flush();


    });
    
     it('passes silently', function (done) {

        inject(function ($rootScope) {
            var testMethod = function (result) {
                dump('this is not called');
                expect(result).toBe('resolved!');
            }

            /*var testFail = function (err) {
                fail();
            }*/

            var promise = _sampleAsyncService.asyncMethod('yes', true);

            promise.then(testMethod)
            //    .catch(testFail)
                .finally(done);
            
            $rootScope.$apply();
        });

    });



});