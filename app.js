var app = angular.module('waitstaff', [])

app.controller('MyCtrl', ['$scope', function($scope) {

	$scope.clearform = function(){
		$scope.meal-price = "";
		$scope.tax = "";
		$scope.tip = "";
	}


}]);


