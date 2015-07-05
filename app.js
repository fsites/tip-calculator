var app = angular.module('waitstaff', [])

app.controller('MyCtrl', ['$scope', function($scope) {

	$scope.clearform = function() {
		$scope.mealPrice = 0;
		$scope.taxPercent = 0;
		$scope.tipPercent = 0;
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

	$scope.$watchGroup(['mealPrice', 'taxPercent', 'tipPercent'], function(newValues, oldValues, scope) {
		$scope.subTotal = $scope.mealPrice + (($scope.taxPercent / 100) * $scope.mealPrice);
		$scope.tip = $scope.mealPrice / 100 * $scope.tipPercent;
		$scope.total = $scope.subTotal + $scope.tip;
	})

}]);


