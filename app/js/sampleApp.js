/**********************************************
 * sampleApp.js
 *
 */

/* global ZeroClipboard, ActiveXObject */

'use strict';

var sampleApp = angular.module('sampleApp', []);

sampleApp.value('zerocopy_movie', '/bower_components/zeroclipboard/ZeroClipboard.swf');

sampleApp.run(['$rootScope', 'zerocopy_movie', function($rootScope, zerocopy_movie) {
    // Determine if flash is available and configure ZeroClipboard
    $rootScope.flashAvailable = false;
    try {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (fo) {
            $rootScope.flashAvailable  = true;
        }
    } catch (e) {
        if (navigator.mimeTypes &&
            navigator.mimeTypes['application/x-shockwave-flash'] !== undefined &&
            navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
            $rootScope.flashAvailable  = true;
        }
    }
    if ($rootScope.flashAvailable) {
        try {
            ZeroClipboard.config({
                moviePath: zerocopy_movie
            });
        }
        catch(e) {
            // ZeroClipboard JS not found
            $rootScope.flashAvailable = false;
        }
    }
}]);

sampleApp.controller('sampleController', ['$scope', function($scope) {
    
    $scope.copyText = "Some Lorem Ipsum for the clipboard!";

}]);

// Custom directive to add ZeroClipboard to a button.
// Add "zero-clipboard" to the button or element that activates
// the copy action. Assumes data-clipboard-target or data-clipboard-text 
// attributes exist on the element.
sampleApp.directive('zeroClipboard', ['$rootScope', 'zerocopy_movie', function($rootScope) {
    return {
        link: function(scope, element) {
            if ($rootScope.flashAvailable) {
                new ZeroClipboard($(element));
            }
        }
    };
}]);
