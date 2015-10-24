angular.module('waitstaff', ['ngRoute', 'ngAnimate'])
	
//ROUTING CONFIG
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

//SET BOOLEAN VALUE FOR ROUTE CHANGE ANIMATION
    .run(function($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function() {
            $location.path("/");
        });
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
          $timeout(function() {
            $rootScope.isLoading = false;
          }, 1000);
        });
    })

//SERVICE TO SHARE DATA
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
			},
			reset: function() {
				earnings.tipTotal = 0;
				earnings.mealCount = 0;
				earnings.averageTip = 0;
			}
		}
	})

//CONTROLLERS
	.controller('HomeCtrl', ['$scope', function($scope) {
		//empty
	}])
	.controller('InputCtrl', ['$scope', 'Total', function($scope, Total) {
		$scope.onSubmit = function() {
			var meal = $scope.data;
			meal.tax = meal.taxPercent * meal.mealPrice / 100;
			meal.subTotal = meal.mealPrice + meal.tax;
			meal.tip = meal.subTotal * meal.tipPercent / 100;
			meal.total = meal.subTotal + meal.tip;
			Total.add(meal.tip);
			$scope.formReset();
		}

		$scope.formReset = function() {
			$scope.data.mealPrice = '';
			$scope.data.taxPercent = 9.5;
			$scope.data.tipPercent = 20;
		}

		$scope.initialState = function() {
			$scope.data = {
				mealPrice: '',
				taxPercent: 9.5, //local tax rate
				tipPercent: 20,
				tax: 0,
				subTotal: 0,
				tip: 0,
				total: 0
			}
		}

		$scope.clearForm = function() {
			$scope.data.taxPercent = '';
			$scope.data.tipPercent = '';
		}

		$scope.initialState();
	}])
	.controller('EarningsCtrl', ['$scope', 'Total', function($scope, Total) {
		$scope.data = Total.get();
		$scope.reset = function() {
			Total.reset();
		}
	}]);


