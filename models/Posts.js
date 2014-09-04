(function() {
    var app = angular.module('Models');

    app.factory('Posts',
        ['Abstract', '$sce', function(Abstract, $sce) {
            function Posts() {
                var posts = new Abstract();
                var converter = new Markdown.Converter();

                var data = {
                    recordTemplateUrl: 'templates/post-display.html',
                    tableName: 'posts',
                    order: 'id DESC'
                };

                posts._createRecordFromApi = function(apiRecord) {
                    var post = apiRecord;
                    var tempHtml = converter.makeHtml(post.body);
                    post.html = $sce.trustAsHtml(tempHtml);
                    return post;
                };
                posts.setData(data);
                return posts;
            };
            return Posts;
        }
    ]);
})()
