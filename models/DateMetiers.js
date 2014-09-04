(function() {
    var app = angular.module('Models');

    app.factory('DateMetiers', ['DreamFactory', function(DreamFactory) {
        function DateMetiers() {
            var data = {
                records: [],
                recordTemplateUrl: 'templates/datemetier-display.html'
            };
            this.setData(data);
        };

        DateMetiers.prototype = {
            setData: function(data) {
                angular.extend(this, data);
            },
            _createRecordFromApi: function(apiRecord) {
                return apiRecord;
            },
            loadRecords: function(limit, offset, callback) {
                recordManager = this;
                DreamFactory.call(function() {
                    window.df.bobsqltest.getRecordsByFilter({
                            table_name: 'date_metier'
                          , limit: limit
                          , offset: offset
                          , related: 'date_metier_type_by_id_type, evenement_by_id_evenement, salle_by_id_salle'
                          , include_count: 'true'
                      }, function (response) {
                            response = response.obj;
                            records = [];
                            angular.forEach(response.record, function(record) {
                                newRecord = recordManager._createRecordFromApi(record);
                                if (newRecord)
                                records.push(newRecord);
                            });
                            recordManager.setData({count: response.meta.count, records: records});
                            return callback ? callback(recordManager.records, recordManager.count) : true;
                        }
                    );
                });
            }
        };

        return DateMetiers;
    }]);
})()