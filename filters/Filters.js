(function() {
    var app = angular.module('filters', []);

    app.filter('markdown', ['$sce', function($sce) {
        return function(input) {
            var converter = new Markdown.Converter();
            var tempHtml = converter.makeHtml(input);
            return $sce.trustAsHtml(tempHtml);
        }
    }]);

    app.filter('offsetTo', function() {
        return function(input, start) {
            if (input) {
                start = parseInt(start, 10);
                return input.slice(start);
            }
        };
    });

    app.filter('markdownHighlight', function($sce) {
        return function(text, phrase) {
            if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
            '<mark><u>**$1**</u></mark>')

            return text;
        }
    });

    app.filter('htmlHighlight', ['$sce', function($sce) {
        return function(text, phrase) {
            if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
            '<mark><u><strong>$1</strong></u></mark>')

            return $sce.trustAsHtml(text);
        }
    }]);

    app.filter('categories', [function() {
        return function(records, categories) {
            var out = [];
            categories = categories.filter(function(val) { return val;});
            if (!categories || !categories.length) {
                out = records;
            } else {
                categories.forEach(function(catLibelle) {
                    records.forEach(function(record) {
                        if (record.oldCategorieValues) {
                            record.oldCategorieValues.forEach(function(catInRecord) {
                                if (catInRecord.libelle == catLibelle) {
                                   out.push(record); 
                                }
                            });
                        }
                    });
                });
            }
            return out;
        }
    }]);

})()