(function() {
    var app = angular.module('controllers', ['Models']);

    app.controller('StoreController', ['$scope', 'Posts', 'Users', function($scope, Posts, Users) {
        $scope.Math=Math;
        var store = this;
        var scope = $scope;
        store.loading = true;
        store.cache = [];

        var users = new Users();
        users.getSession();

        this.next = function() {
            this.offset += this.limit
          //  this.loadRecords();
        }

        this.prev = function() {
            this.offset -= this.limit
        //    this.loadRecords();
        }

        this.init = function() {
            this.offset = 0;
            this.loadRecords();
        }

        this.changeRecordManager = function(recordManagerName) {
            this.recordManager = eval('new '+recordManagerName+'()');
            this.init();
        }

        this.loadRecords = function() {
            var key = this.recordManager.tableName+this.limit+'_'+this.offset;
            if (store.cache[key]) {
                var temp = store.cache[key];
                store.records = temp.records;
                store.count = temp.count;
            } else {
                store.loading = true;
                this.recordManager.loadRecords(undefined, undefined, function(records, count) {
                    store.records = records;
                    store.count = count;
                    store.cache[key] = {
                        records: records,
                        count: count
                    };
                    store.loading = false;
                    if(!scope.$$phase) {
                        scope.$apply();
                    }
                });
            }
        }


        this.recordManager = new Posts();
        this.limit = 5;
        store.init();

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
