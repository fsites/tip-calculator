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
	.factory('Total', function() {
		var earnings = {
			tipTotal: 0,
			mealCount: 0,
			averageTip: 0
		}
		return {
			get: function() {
				return earnings;
			},
			add: function(tip) {
				earnings.tipTotal += tip;
				earnings.mealCount++;
				earnings.averageTip = earnings.tipTotal / earnings.mealCount
			}
			reset: function() {
				earnings.tipTotal = 0;
				earnings.mealCount = 0;
				earnings.averageTip = 0;
			}
		}
	})
	.controller('HomeCtrl', ['$scope', function($scope) {
		//empty
	}])
	.controller('InputCtrl', ['$scope', 'Total', function($scope, Total) {
		initialState(); //resets on page load

		$

	}])
	.controller('EarningsCtrl', ['$scope', 'Total', function($scope, Total) {
		$scope.data = Total.get();

		$scope.reset = function() {
			Total.reset();
			$scope.data = Total.get();
		}
	}]);


