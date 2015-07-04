var app = angular.module('waitstaff', [])

app.controller('MyCtrl', ['$scope', function($scope) {

	$scope.clearform = function(){
		$scope.mealPrice = "";
		$scope.tax = "";
		$scope.tip = "";
	}

	$scope.inititalCharges = function() {
		$scope.subTotal = 0;
		$scope.tip = 0;
		$scope.total = 0;
	}

	$scope.initalEarnings = function() {
		$scope.mealCount = 0;
		$scope.tipTotal = 0;
		$scope.averageTip = 0;
	}

	$scope.initalState = function (){
		$scope.clearform();
		$scope.initalCharges();
		$scope.initalEarnings();
	}

	$scope.onSubmit = function() {
		$scope.mealCount++;
		$scope.tipTotal += $scope.tip;
	}

	$scope.initalState();

}]);


