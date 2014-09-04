(function() {
    var app = angular.module('Models', ['ServiceDreamFactory']);

    app.factory('Abstract', ['DreamFactory',
        function(DreamFactory) {
            function Abstract() {
                var data = {
                    records: [],
                    recordTemplateUrl: 'templates/post-display.html',
                    api: 'stadjadb',
                    tableName: 'posts',
                    related: ''
                };
                this.setData(data);
            };

            Abstract.prototype = {
                setData: function(data) {
                    angular.extend(this, data);
                },
                _createRecordFromApi: function(apiRecord) {
                    return apiRecord;
                },
                loadRecords: function(limit, offset, callback) {
                    recordManager = this;
                    DreamFactory.call(recordManager.api, 'getRecordsByFilter', {
                        table_name: recordManager.tableName,
                        limit: limit,
                        offset: offset,
                        related: recordManager.related,
                        include_count: 'true'
                    }, function(response) {
                        response = response.obj;
                        records = [];
                        angular.forEach(response.record, function(record) {
                            newRecord = recordManager._createRecordFromApi(record);
                            if (newRecord)
                                records.push(newRecord);
                        });
                        recordManager.setData({
                            count: response.meta.count,
                            records: records
                        });
                        return callback ? callback(recordManager.records, recordManager.count) : true;
                    });
                }
            };

            return Abstract;
        }
    ]);
})()