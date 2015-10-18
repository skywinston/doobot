(function(){

  var app = angular.module('doobot', []);

  app.directive('loginForm', function(){
    return {
      restrict: 'E',
      templateUrl: '../../views/', // Path to the URL holding the template HTML
      controller: function(){

      },
      controllerAs: 'login'
    };
  });

})();
