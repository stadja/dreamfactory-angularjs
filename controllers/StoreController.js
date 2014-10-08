(function() {
    var app = angular.module('controllers');

    app.controller('StoreController', ['$scope', 'Posts', 'Users', 'Categories', function($scope, Posts, Users, Categories) {
        $scope.Math=Math;
        var store = this;
        var scope = $scope;
        store.logged = false;
        store.loading = true;
        store.cache = [];

        store.catfilter = [];

        var users = new Users();
        users.getSession();

        var categories = new Categories();
        categories.loadRecords(null, null, function(results) {
            store.categories = results;
        });

        store.createNewCategorie = function() {
            store.categories.push(categories._createRecordFromApi({
                id: null,
                libelle: store.newCategorie
            })); 
            store.newCategorie = '';
        }

        store.next = function() {
            store.offset += store.limit
          //  store.loadRecords();
        }

        store.prev = function() {
            store.offset -= store.limit
        //    store.loadRecords();
        }

        store.init = function() {
            store.offset = 0;
            store.loadRecords();
        }

        store.changeRecordManager = function(recordManagerName) {
            store.recordManager = eval('new '+recordManagerName+'()');
            store.init();
        }

        store.loadRecords = function() {
            var key = store.recordManager.tableName+store.limit+'_'+store.offset;
            if (!store.logged && store.cache[key]) {
                var temp = store.cache[key];
                store.records = temp.records;
                store.count = temp.count;
            } else {
                store.loading = true;
                store.recordManager.loadRecords(undefined, undefined, function(records, count) {
                    store.records = records;
                    store.count = count;
                    if (!store.logged) {
                            store.cache[key] = {
                            records: records,
                            count: count
                        };
                    }
                    store.loading = false;
                    if(!scope.$$phase) {
                        scope.$apply();
                    }
                });
            }
        }

        store.saveRecord = function(record) {
            record.category_by_posts_categories = record.category_by_posts_categories.filter(function(val) {return val;});
            store.recordManager.updateRecord(record, function() {
                console.log('sauvegardÃ©');
                record.category_by_posts_categories = [];
            });
        }

        store.deleteRecord = function(record) {
            store.recordManager.deleteRecord(record, function() {
                console.log('supprimé');
            });
        }


        store.recordManager = new Posts();
        store.limit = 5;
        store.init();

        $scope.$on('loggedIn', function() {
            store.logged = true;
            store.init();
        });

        $scope.$on('loggedOut', function() {
            store.logged = false;
            store.init();
        });

       /* scope.$watch(function() {
            return store.limit;
        }, function(newValue, oldValue) {
            store.init();
        });*/

    }]);

    app.directive('recordDisplay', function() {
        return {
            restrict: 'A',
            template: '<ng-include src=\'store.recordManager.recordTemplateUrl\'></ng-include>'
        };
    });

})()
