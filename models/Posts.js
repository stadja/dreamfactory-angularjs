(function() {
    var app = angular.module('Models');

    app.factory('Posts',
        ['Abstract', function(Abstract) {
            var Posts = function() {
                Abstract.apply(this, arguments);

                var data = {
                    recordTemplateUrl: 'templates/post-display.html',
                    tableName: 'posts',
                    order: 'id DESC',
                    related: 'category_by_posts_categories'
                };
                this.setData(data);
            };

            Posts.prototype = new Abstract();

            Posts.prototype._createRecordFromApi = function(apiRecord) {
                var oldCategorieValues = [];
                if (apiRecord.category_by_posts_categories) {
                    apiRecord.oldCategorieValues = angular.copy(apiRecord.category_by_posts_categories);
                    oldCategorieValues = angular.copy(apiRecord.category_by_posts_categories);
                }
                apiRecord.category_by_posts_categories = [];
                apiRecord.isInCategorie = function(categorie) {
                    for (var i = oldCategorieValues.length - 1; i >= 0; i--) {
                        if (oldCategorieValues[i].id == categorie.id) {
                            return true;
                        }
                    };
                    return false;
                };
                return apiRecord;
            };


            return Posts;
        }
    ]);

})()
