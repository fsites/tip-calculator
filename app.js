var app = angular.module('waitstaff', [])

app.controller('MyCtrl', ['$scope', function($scope) {

	$scope.clearform = function() {
		$scope.mealPrice = "";
		$scope.tax = "";
		$scope.tip = "";
	}

	$scope.initialCharges = function() {
		$scope.subTotal = 0;
		$scope.tip = 0;
		$scope.total = 0;
	}

	$scope.initialEarnings = function() {
		$scope.mealCount = 0;
		$scope.tipTotal = 0;
		$scope.averageTip = 0;
	}

	$scope.initialState = function () {
		$scope.clearform();
		$scope.initialCharges();
		$scope.initialEarnings();
	}

	$scope.onSubmit = function() {
		$scope.mealCount++;
		$scope.tipTotal += $scope.tip;
	}

	$scope.initialState();

}]);


