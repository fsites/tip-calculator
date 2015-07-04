var app = angular.module('waitstaff', [])
app.controller('MyCtrl', ['$scope', function($scope) {
	$scope.onSubmit = function() {
		if ($scope.userform.$valid) {
			console.log('valid form');
			
		} else {
			console.log ('enter numbers only');
		}
	};


}]);


	// $scope.onSubmit = function() {
	// 	if ($scope.userform.$valid) {
	// 		console.log('valid form');
	// 	} else {
	// 		alert ('enter numbers only');
	// 	}
	// };