var waitstaff = angular.module('waitstaff', ['ngRoute'])
	

	.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl : 'home.html',
			controller: 'HomeCtrl'
		})
		.when('/input', {
			templateUrl : 'input.html',
			controller : 'InputCtrl'
		})
		.when('/earnings', {
			templateUrl : 'earnings.html',
			controller : 'InputCtrl'
		})
		.otherwise('/');
	})

	.controller('HomeCtrl', ['$scope', function($scope) {
		//empty
	}])
	.controller('InputCtrl', ['$scope', function($scope) {

		$scope.clearform = function() {
			$scope.mealPrice = '';
			$scope.taxPercent = 9.5; //Local tax rate
			$scope.tipPercent= '';
		};

		$scope.initialCharges = function() {
			$scope.subTotal = 0;
			$scope.tip = 0;
			$scope.total = 0;
		};

		$scope.initialEarnings = function() {
			$scope.mealCount = 0;
			$scope.tipTotal = 0;
			$scope.averageTip = 0;
		};

		$scope.onSubmit = function() {
			$scope.mealCount++;
			console.log('meal count is ' + $scope.mealCount);
			$scope.tipTotal += $scope.tip;
			console.log('tip total is ' + $scope.tipTotal);
			$scope.averageTip = $scope.tipTotal / $scope.mealCount;
			console.log('average tip is ' + $scope.averageTip)
			$scope.clearform();
		};

		$scope.initialState = function () {
			$scope.clearform();
			$scope.initialCharges();
			$scope.initialEarnings();
		};

		$scope.initialState(); //loads initial state on page load

		$scope.$watchGroup(['mealPrice', 'taxPercent', 'tipPercent'], function(newValues, oldValues, $scope) {
			$scope.subTotal = $scope.mealPrice + (($scope.taxPercent / 100) * $scope.mealPrice);
			$scope.tip = $scope.mealPrice / 100 * $scope.tipPercent;
			$scope.total = $scope.subTotal + $scope.tip;
		});


	}])
	.controller('EarningsCtrl', ['$scope', function($scope) {

	}]);


