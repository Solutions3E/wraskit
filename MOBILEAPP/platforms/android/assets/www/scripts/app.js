'use strict';
var myCustom = angular.module('myApp', ['ajoslin.mobile-navigate','ngRoute','angular-carousel','fundoo.services','angularFileUpload','ngFacebook']);
//var fbAppId='1441504876114178';
var fbAppId='1568536133414519';
myCustom.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

myCustom.config(function($routeProvider) {
  $routeProvider.when("/", {
    controller: 'loginController',
    templateUrl: "views/login.html"
  }).when("/fblogin", {
    //controller: 'homeController',
    templateUrl: "views/fblogin.html"
  }).when("/register", {
    controller: 'registerController',
    templateUrl: "views/register.html"
  }).when("/forgot", {
    controller: 'forgotController',
    templateUrl: "views/forgot.html"
  }).when("/home", {
    controller: 'homeController',
    templateUrl: "views/home.html"
  }).when("/answers/:qid", {
    controller: 'answersController',
    templateUrl: "views/answers.html"
  }).when("/submitanswer/:qid", {
    controller: 'submitanswerController',
    templateUrl: "views/submitanswer.html"
  }).when("/myprofile/", {
    controller: 'myprofileController',
    templateUrl: "views/myprofile.html"

  }).when("/editprofile/", {
    controller: 'editprofileController',
    templateUrl: "views/editprofile.html"
  }).when("/wraskit/", {
    controller: 'wraskitController',
    templateUrl: "views/wraskit.html"
  }).when("/changePassword/", {
    controller: 'changePasswordController',
    templateUrl: "views/changePassword.html"

  }).when("/myquestions/:uid", {
    controller: 'myanswersController',
    templateUrl: "views/myquestions.html"

  }).when("/myanswers/:uid", {
    controller: 'myanswersController',
    templateUrl: "views/myanswers.html"

  }).when("/profile/:uid", {
    controller: 'profileController',
    templateUrl: "views/profile.html"

  }).when("/wraskinterest", {
    controller: 'wraskinterestController',
    templateUrl: "views/wraskinterest.html"

  }).when("/settings", {
    controller: 'settingsController',
    templateUrl: "views/settings.html"

  }).when("/connects", {
    controller: 'connectsController',
    templateUrl: "views/connects.html"

  }).when("/changeProfilePic", {
    controller: 'changeProfilePicController',
    templateUrl: "views/change_profile_pic.html"

  }).when("/search", {
    controller: 'searchController',
    templateUrl: "views/search.html"

  }).when("/location", {
    controller: 'locationController',
    templateUrl: "views/location.html"

  }).when("/info", {
    controller: 'infoController',
    templateUrl: "views/info.html"
  }).when("/editanswer/:aid", {
    controller: 'editanswerController',
    templateUrl: "views/editanswer.html"
  }).when("/feedback/", {
    controller: 'feedbackController',
    templateUrl: "views/feedback.html"

  }).otherwise({
    redirectTo: "/"
  });
});

myCustom.config(function( $facebookProvider ) {
    //$facebookProvider.setAppId('1441504876114178');
    $facebookProvider.setAppId(fbAppId);
});

myCustom.run(function($route, $http, $templateCache) {
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
  angular.forEach($route.routes, function(r) {
    if (r.templateUrl) { 
      $http.get(r.templateUrl, {cache: $templateCache});
    }
  });
});

myCustom.controller('MainCtrl', function($scope, $navigate, $templateCache) {
  $scope.$navigate = $navigate;
  //$scope.baseurl = "http://192.168.1.35/projects/wraskadmin/admin/index.php/api/";
  $scope.baseurl = "http://demo1.host3e.com/projects/2014/wraskit/admin/index.php/api/";
  //$scope.siteurl  = "http://localhost/projects/wraskadmin/";
  $scope.siteurl  = "http://www.demo1.host3e.com/projects/2014/wraskit/";
   
 window.plugins.pushNotification.register(
    function(result){ /*alert("ss");alert(JSON.stringify(result));*/ },
     function(result){ /*alert("err");alert(JSON.stringify(result));*/ },
    {
        "senderID":"856049243837",
        "ecb":"onNotification"
    });

  $scope.fbAppId=fbAppId;
  $scope.check_login = function() {
    $scope.userId = localStorage.getItem("userId");
    if( ($scope.userId == null) || ($scope.userId == 0)) {
      $navigate.go('/');
    }
    else
    {
      //alert("loginnnnnnnnnnnnn");
    }
  }
});
myCustom.directive('ngTap', function() {
  var isTouchDevice = !!("ontouchstart" in window);
  return function(scope, elm, attrs) {
    if (isTouchDevice) {
      var tapping = false;
      elm.bind('touchstart', function() { tapping = true; });
      elm.bind('touchmove', function() { tapping = false; });
      elm.bind('touchend', function() { 
        tapping && scope.$apply(attrs.ngTap);
      });
    } else {
      elm.bind('click', function() {
        scope.$apply(attrs.ngTap);
      });
    }
  };
});

// var onNotification = function(result){
//     alert(JSON.stringify(result));
//   }





var onNotification = function(e) {
      
      //alert(e.event);
        switch(e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                   
                    //alert('registration id = '+e.regid);

                    localStorage.setItem("wraskit_device_id", e.regid);
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
                break;

            case 'error':
                //alert('GCM error = '+e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    }













