'use strict';

angular.module('GameFly')

.directive('gfCollapsiblePanel', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/collapsible-panel.html',
		replace: true,
		scope: {
			title: '@',
			content: '='
		},
		controllerAs: 'CollapsiblePanelCtrl',
		controller: function() {
			this.isCollapsed = true;
			this.collapse = function() {
				this.isCollapsed = !this.isCollapsed;
			}
		}
	};
});