// http://wemadeyoulook.at/en/blog/implementing-basic-http-authentication-http-requests-angular/
(function() {

    var app = angular.module('ServiceDreamFactory', []);

    app.service('DreamFactory', function DreamFactory() {

        this.ready = false;

        window.addEventListener("apiReady", function() {
            dreamFactory.ready = true;
        });

        this.isReady = function() {
            return dreamFactory.ready;
        };

        this.checkReadyOrThrow = function() {
            if (!this.isReady()) {
                throw "DreamFactory not ready";
            }
            return true;
        }

        this.init = function(callback, login, pwd) {
            window.addEventListener("apiReady", function() {
                console.log('apiReady');

                dreamFactory.ready = true;

                if (login) {
                    return dreamFactory.login(login, '', '');
                }

                return callback ? callback() : true;
            });
        };

        this.call = function(apiName, apiAction, args, callback) {
            var call = function() {
                var apiCallName = eval('window.df.apis.' + apiName + '.' + apiAction);
                apiCallName(args, callback)
            };

            if (!dreamFactory.isReady()) {
                return dreamFactory.init(call);
            }
            return call();
        };

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

        var dreamFactory = this;
    });
})()