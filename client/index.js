'use strict';

angular.module('daytrader', ['firebase'])
.run(['$rootScope', '$window', function($rootScope, $window){
  $rootScope.fbRoot = new $window.Firebase('https://daytrader-kolohelios.firebaseio.com/');
}])
.controller('master', ['$scope', '$firebaseObject', '$firebaseArray', '$http', function($scope, $firebaseObject, $firebaseArray, $http){

  var fbUser = $scope.fbRoot.child('user');
  var fbSectors = $scope.fbRoot.child('sectors');
  var afUser = $firebaseObject(fbUser);
  var afSectors = $firebaseArray(fbSectors);

  $scope.user = afUser;
  $scope.sectors = afSectors;

  function getStockQuote(symbol){
    $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=JSON_CALLBACK').then(function(response){
      return response.data.LastPrice;
    });
  }
  getStockQuote('AAPL');

  $scope.saveUser = function(){
    afUser.$save($scope.user);

  };

  $scope.createSector = function(){
    console.log($scope.sector.name);
    //$scope.sector.stocks = [];
    //$scope.sector.value = 0;
    afSectors.$add($scope.sector).then(function(){
      //$scope.selectedSector = $scope.sector;
      // add code to select new sector as option in dropdown
    });
    $scope.sector = {};
  };

  $scope.buyStock = function(){
    console.log('in buy stock function');
  }

}]);
