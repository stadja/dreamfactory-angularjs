(function() {
    var app = angular.module('Models', ['ServiceDreamFactory']);

    app.factory('Collaborateurs', ['DreamFactory', function(DreamFactory) {
        function Collaborateurs() {
                var data = {
                    records: [],
                    recordTemplateUrl: 'templates/collaborateur-display.html'
                };
                this.setData(data);
        };

        Collaborateurs.prototype = {
            setData: function(data) {
                angular.extend(this, data);
            },
            _createCollaborateurFromApi: function(apiCollaborateur) {
                return apiCollaborateur;
            },
            loadRecords: function(limit, offset, callback) {
                collaborateursManager = this;
                DreamFactory.call(function() {
                    window.df.bobsqltest.getRecordsByFilter({
                            table_name: 'collaborateur'
                          , limit: limit
                          , offset: offset
                          , filter:'est_actif=true'
                          , related: 'user_by_id_user,entreprises_by_entreprises_collaborateurs'
                          , include_count: 'true'
                      }, function (response) {
                            response = response.obj;
                            collaborateurs = [];
                            angular.forEach(response.record, function(collaborateur) {
                                newCollaborateur = collaborateursManager._createCollaborateurFromApi(collaborateur);
                                if (newCollaborateur)
                                collaborateurs.push(newCollaborateur);
                            });
                            collaborateursManager.setData({count: response.meta.count, records: collaborateurs});
                            return callback ? callback(collaborateursManager.records, collaborateursManager.count) : true;
                        }
                    );
                });
            }
        };

        return Collaborateurs;
    }]);
})()