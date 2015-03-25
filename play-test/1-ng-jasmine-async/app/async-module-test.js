(function () {
    'use strict';

    var module = angular.module('async-module-test', [
    ]);

    module.factory('sampleAsyncService', function ($q, $timeout, $http) {

        return {
            asyncMethod: asyncMethod,
            asyncMethodTimeOut: asyncMethodTimeOut,
            asyncMethodHttp: asyncMethodHttp
        };

        function resolveIt(val) {
            if (val === 'no') {
                return false;
            }
            return true;
        }

        function asyncMethod(val, failInResolve) {
            var deferred = $q.defer();

            var resolveValue = 'resolved!';

            if (failInResolve) {
                resolveValue = $q.reject('failing resolve!');
            }

            if (resolveIt(val)) {
                deferred.resolve(resolveValue);
            } else {
                deferred.reject('rejected');
            }

            return deferred.promise;
        }

        function asyncMethodTimeOut(val) {
            var deferred = $q.defer();

            $timeout(function delayed() {
                if (resolveIt(val)) {
                    deferred.resolve('resolved!');
                } else {
                    deferred.reject('rejected!');
                }
            }, 1000);

            return deferred.promise;
        }

        function asyncMethodHttp() {
            // using a fake endpoint (we will mock the result in jasmine test)
            return $http.get('http://localhost:8000/myEndpoint').then(function (data) {
                return data.data;
            });
        }
    });


})();