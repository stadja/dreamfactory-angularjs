// http://wemadeyoulook.at/en/blog/implementing-basic-http-authentication-http-requests-angular/
(function() {

    var app = angular.module('ServiceDreamFactoryBeta', []);

    app.service('DreamFactory', ['$http', function DreamFactory($http) {

        var dsp_url = "http://stadja.net:81/rest";
        var dsp_url_docs = "http://stadja.net:81/rest/api_docs";
        //replace this app_name with yours
        var app_name = "prototype";

        $http.defaults.headers.common['X-DreamFactory-Application-Name'] = app_name;
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        this.init = function(callback, login, pwd) {

        };

        this.call = function(apiName, apiAction, args, callback) {
            var functionCalled = eval('this.'+apiAction);
            functionCalled(apiName, apiAction, args, callback);
        };

        this.getRecordsByFilter = function (apiName, apiAction, args, callback) {
            $http.get(dsp_url+'/'+apiName+'/'+args.table_name,
                {
                    params: args
                }
            ).success(function(data, status, headers, config) {
                var response = {
                    obj: data
                }
                callback(response);
            });
        };
/*
        this.login = function(login, pwd, callback) {

            if (dreamFactory.checkReadyOrThrow()) {
                var body = {
                    "email": login,
                    "password": pwd
                };
                window.df.apis.user.login({
                    "body": body
                }, function(response) {
                    // assign session token to be used for the session duration
                    var session = new ApiKeyAuthorization("X-Dreamfactory-Session-Token", response.session_id, 'header');
                    window.authorizations.add("X-DreamFactory-Session-Token", session);
                    return callback ? callback() : true;
                });
            }
        };

        var dreamFactory = this;*/
    }]);
})()