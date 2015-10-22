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
			controller : 'EarningsCtrl'
		})
		.otherwise('/');
	})
	.service('Data', function() {
		return {};
	})
	.controller('HomeCtrl', ['$scope', function($scope) {
		//empty
	}])
	.controller('InputCtrl', ['$scope', 'Data', function($scope, Data) {
		$scope.data = Data;

		$scope.clearform = function() {
			$scope.data.mealPrice = '';
			$scope.data.taxPercent = 9.5; //Local tax rate
			$scope.data.tipPercent= '';
		};

		$scope.initialCharges = function() {
			$scope.data.subTotal = 0;
			$scope.data.tip = 0;
			$scope.data.total = 0;
		};

		$scope.initialEarnings = function() {
			$scope.data.mealCount = 0;
			$scope.data.tipTotal = 0;
			$scope.data.averageTip = 0;
		};

		$scope.onSubmit = function() {
			$scope.data.mealCount++;
			console.log('meal count is ' + $scope.data.mealCount);
			$scope.data.tipTotal += $scope.data.tip;
			console.log('tip total is ' + $scope.data.tipTotal);
			$scope.data.averageTip = $scope.data.tipTotal / $scope.data.mealCount;
			console.log('average tip is ' + $scope.data.averageTip)
			$scope.clearform();
		};

		$scope.initialState = function () {
			$scope.clearform();
			console.log($scope.data.taxPercent);
			$scope.initialCharges();
			$scope.initialEarnings();
		};

		$scope.initialState(); //loads initial state on page load

		$scope.$watchGroup(['data.mealPrice', 'data.taxPercent', 'data.tipPercent'], function(newValues, oldValues, $scope) {
			$scope.data.subTotal = $scope.data.mealPrice + (($scope.data.taxPercent / 100) * $scope.data.mealPrice);
			$scope.data.tip = $scope.data.mealPrice / 100 * $scope.data.tipPercent;
			$scope.data.total = $scope.data.subTotal + $scope.data.tip;
		});


	}])
	.controller('EarningsCtrl', ['$scope', 'Data', function($scope, Data) {
		$scope.data = Data;

	}]);


