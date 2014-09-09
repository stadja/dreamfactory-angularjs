if (typeof console == 'undefined') {
    console = {};
    console.log = function (message) {
        alert(message);
    };
    console.warn = function (message) {
        alert(message);
    };
    console.error = function (message) {
        alert(message);
    };
    console.trace = function () {
        alert('trace');
    };
}

(function() {
    var app = angular.module('Blog', ['controllers', 'filters']);
})()