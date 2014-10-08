(function() {
    var app = angular.module('Models');

    app.factory('Categories',
        ['Abstract', function(Abstract) {

            var Categories = function() {
                Abstract.apply(this, arguments);

                var data = {
                    tableName: 'categories',
                    order: 'id DESC'
                };
                this.setData(data);
            };

            Categories.prototype = new Abstract();

            Categories.prototype._createRecordFromApi = function(apiRecord) {
                apiRecord.getRemoveFromPostVersion = function() {
                    var copy = angular.copy(apiRecord);
                    copy['posts.id'] = null;
                    return copy;
                };
                return apiRecord;
            };

            return Categories;
        }
    ]);

})()
