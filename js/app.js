angular.module('waitstaff', ['ngRoute'])
	
	.service('dataService', function () {
		var dataResponse = {
			mealCount: 0,
			tipTotal: 0,
			averageTip: 0,
			mealPrice: 0,
			taxPercent: 0,
			tipPercent: 0,
			total: 0,
			subTotal: 0
		}

		return {
			saveDataResponse:function(data) {
				dataResponse = data;
			},
			getDataResponse:function() {
				return dataResponse;
			}
		};
	})

	.config(function($routeProvider) {
		$routeProvider.when('/', {
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
	.controller('HomeCtrl', ['$scope', function($scope) {
		//empty
	}])
	.controller('InputCtrl', ['$scope', 'dataService', function($scope, dataService) {
		$scope.Data = dataService.getDataResponse();

		$scope.clearform = function() {
			$scope.Data.mealPrice = "";
			$scope.Data.taxPercent = 9.5; //Local tax rate
			$scope.Data.tipPercent = "";
		};

		$scope.initialCharges = function() {
			$scope.Data.subTotal = 0;
			$scope.Data.tip = 0;
			$scope.Data.total = 0;
		};

		$scope.initialEarnings = function() {
			$scope.Data.mealCount = 0;
			$scope.Data.tipTotal = 0;
			$scope.Data.averageTip = 0;
		};

		$scope.initialState = function () {
			$scope.clearform();
			$scope.initialCharges();
			$scope.initialEarnings();
		};

		$scope.onSubmit = function() {
			$scope.Data.mealCount++;
			$scope.Data.tipTotal += $scope.Data.tip;
			$scope.Data.averageTip = $scope.Data.tipTotal / $scope.Data.mealCount;
			dataService.saveDataResponse($scope.Data);
			$scope.clearform();
		};

		$scope.initialState(); //loads initial state on page load

		$scope.$watchGroup(['mealPrice', 'taxPercent', 'tipPercent'], function(newValues, oldValues, $scope) {
			$scope.Data.subTotal = $scope.Data.mealPrice + (($scope.Data.taxPercent / 100) * $scope.Data.mealPrice);
			$scope.Data.tip = $scope.Data.mealPrice / 100 * $scope.Data.tipPercent;
			$scope.Data.total = $scope.Data.subTotal + $scope.Data.tip;
		});

	}])
	.controller('EarningsCtrl', ['$scope', 'dataService', function($scope, dataService) {
		$scope.Data = dataService.getDataResponse();
	}]);


