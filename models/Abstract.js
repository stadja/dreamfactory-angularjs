(function() {
    var app = angular.module('Models', ['ServiceDreamFactoryBeta']);

    app.factory('Abstract', ['DreamFactory',
        function(DreamFactory) {
            function Abstract() {
                var data = {
                    records: [],
                    recordTemplateUrl: 'abstract',
                    api: 'stadjadb',
                    tableName: 'abstract',
                    related: null,
                    order: null
                };

                this.setData = function(data) {
                    angular.extend(this, data);
                };
                this.setData(data);
            };

            Abstract.prototype = {
                _createRecordFromApi: function(apiRecord) {
                    return apiRecord;
                },
                deleteRecord: function(record, callback) {
                    recordManager = this;
                    record.table_name = recordManager.tableName;
                    DreamFactory.call(
                        recordManager.api,
                        'deleteRecord',
                            record
                        , function(response) {
                            var index = this.records.indexOf(record);
            			    if (index > -1) {
            			        this.records.splice(index, 1);
            			    }
            			    if (callback) {
                                callback(record);
                            }
                        }.bind(recordManager)
                    );
                },
                updateRecord: function(record, callback) {
                    recordManager = this;
                    record.table_name = recordManager.tableName;
                    DreamFactory.call(
                        recordManager.api,
                        'updateRecord',
                            record
                        , function(response) {
                            if (callback) {
                                callback(record);
                            }
                        }
                    );
                },
                loadRecords: function(limit, offset, callback) {
                    recordManager = this;
                    DreamFactory.call(
                        recordManager.api,
                        'getRecordsByFilter',
                        {
                            table_name: recordManager.tableName,
                            limit: limit,
                            offset: offset,
                            related: recordManager.related,
                            include_count: 'true',
                            order: recordManager.order
                        }, function(response) {
                            response = response.obj;
                            records = [];
                            angular.forEach(response.record, function(record) {
                                newRecord = this._createRecordFromApi(record);
                                if (newRecord) {
                                    records.push(newRecord);
                                }
                            }.bind(this));
                            this.setData({
                                count: response.meta.count,
                                records: records
                            });
                            return callback ? callback(this.records, this.count) : true;
                        }.bind(recordManager)
                    );
                }
            };
            return Abstract;
        }
    ]);
})()
