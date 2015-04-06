'use strict';
myCustom.controller('myprofileController', function myprofileController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading	=true;
	$scope.qid 		= $routeParams.qid;
	var user_id 	= $scope.userId;
	$scope.notify 	= false;


	//code for slider 
	var slides = $scope.slides = [
			{'image': $scope.siteurl+'img/carousel/index.jpg', 'text' : 'Gynecologist Calls Abortion Reversal Bill Downright Offensive','links' : 'http://www.huffingtonpost.com/2015/03/26/abortion-provider-arizona_n_6947946.html'},
			{'image': $scope.siteurl+'img/carousel/index1.jpg', 'text' : 'The 7 naughtiest stories from the blockbuster Justice Department ','links' : 'http://www.businessinsider.in/The-7-naughtiest-stories-from-the-blockbuster-Justice-Department-sex-party-report/articleshow/46708214.cms'},
			{'image': $scope.siteurl+'img/carousel/index2.jpg', 'text' : 'ARMORY NEW YORK 2015 ','links' : 'http://artcomments.blogspot.in/2015/03/armory-new-york-2015.html'},
			{'image': $scope.siteurl+'img/carousel/index3.jpg', 'text' : 'Future Fathers: Livestreamed VR Birth, Womb Kick Smartwatch for Dads','links' : 'http://www.8bitdad.com/2015/03/19/future-fathers-livestreamed-vr-birth-womb-kick-smartwatch-for-dads-18884/'}];
	
	//~ $scope.addSlide = function() {
		//~ var newWidth = 600 + slides.length + 1;
		//~ slides.push({
		  //~ image: 'http://placekitten.com/' + newWidth + '/300',
		  //~ text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
			//~ ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
		//~ });
	//~ };
	//~ 
	//~ 
	//~ for (var i=0; i<4; i++) {
	//~ $scope.addSlide();
	//~ }
	//end for slider code.


	$scope.go = function (url) {
      $location.path(url);
    }
		
    	$http({
			url: $scope.baseurl+"userNotify/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.loading=false;
				$scope.notifycount = data[0];
			if(data[0] > 0) {
				$scope.notify = true;

			}
		}).error(function(data) {
        	alert("error");  
        	$scope.loading=false;              
    	});

		$http({
			url: $scope.baseurl+"userDetails/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.loading=false;
			$scope.userdetails = data;
		}).error(function(data) {
        	alert("error");                
        	$scope.loading=false;
    	});

    	//user ratings
		$http({
				url: $scope.baseurl+"profileRating/"+$scope.userId,
				method : 'GET',
				params : {}
			}).success(function(data) {
				$scope.rating = data.point;
				if(data.point > 5) {
					$scope.rating = 5;
				}
			}).error(function(data) {
	        	alert("error");                
	    });

		//myquestions count
		$http({
			url: $scope.baseurl+"countuserQuestions/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countquestions = data;
			if(data == '"0"'){
				$scope.countquestions = 0;
			}
		}).error(function(data) {
        alert("error");                
    	})

    	//myanswers count
		$http({
			url: $scope.baseurl+"countuserAnswers/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countanswers = data;
			if(data == '"0"'){
				$scope.countanswers = 0;
			}
		}).error(function(data) {
        alert("error");                
    	});

		//notification

		$scope.notifyClick = function () {
			 $scope.loading = true;
			$http({
				url: $scope.baseurl+"notifyClick/"+$scope.userId,
				method : 'GET',
				params : {}
			}).success(function(data) {
				 $scope.loading = false;
				$navigate.go('/home');
			});
			};


    	//connects count
		$http({
			url: $scope.baseurl+"countMyconnects/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countmyconnects = data;
			if(data == '"0"'){
				$scope.countmyconnects = 0;
			}
		}).error(function(data) {
        alert("error");                
    	})


});
myCustom.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});