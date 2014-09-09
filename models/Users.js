(function() {
    var app = angular.module('Models');

    app.factory('Users',
        ['Abstract', 'DreamFactory', function(Abstract, DreamFactory) {
            function Users() {
                var users = new Abstract();

                var data = {
                    tableName: 'users'
                };

                users.getSession = function(success, error) {
                    DreamFactory.getSession(success, error);
                };

                users.logout = function(callback) {
                    DreamFactory.logout(callback);
                };

                users.login = function(username, password, success, error) {
                    DreamFactory.login(username, password, success, error);
                };

                users.setData(data);
                return users;
            };
            return Users;
        }
    ]);
})()
