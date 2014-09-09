(function() {
    var app = angular.module('Models');

    app.factory('Posts',
        ['Abstract', function(Abstract) {
            function Posts() {
                var posts = new Abstract();
                var converter = new Markdown.Converter();

                var data = {
                    recordTemplateUrl: 'templates/post-display.html',
                    tableName: 'posts',
                    order: 'id DESC'
                };

                posts.setData(data);
                return posts;
            };
            return Posts;
        }
    ]);

})()
