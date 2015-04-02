'use strict';
myCustom.controller('profileController', function profileController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading=true;
	$scope.pid = $routeParams.uid;
	//alert($scope.pid);
	var user_id = $scope.userId;

		
	var slides = $scope.slides = [
			{'image': $scope.siteurl+'img/carousel/index.jpg', 'text' : 'Gynecologist Calls Abortion Reversal Bill Downright Offensive','links' : 'http://www.huffingtonpost.com/2015/03/26/abortion-provider-arizona_n_6947946.html'},
			{'image': $scope.siteurl+'img/carousel/index1.jpg', 'text' : 'The 7 naughtiest stories from the blockbuster Justice Department ','links' : 'http://www.businessinsider.in/The-7-naughtiest-stories-from-the-blockbuster-Justice-Department-sex-party-report/articleshow/46708214.cms'},
			{'image': $scope.siteurl+'img/carousel/index2.jpg', 'text' : 'ARMORY NEW YORK 2015 ','links' : 'http://artcomments.blogspot.in/2015/03/armory-new-york-2015.html'},
			{'image': $scope.siteurl+'img/carousel/index3.jpg', 'text' : 'Future Fathers: Livestreamed VR Birth, Womb Kick Smartwatch for Dads','links' : 'http://www.8bitdad.com/2015/03/19/future-fathers-livestreamed-vr-birth-womb-kick-smartwatch-for-dads-18884/'}];
	

	//profile and user details
	$http({
			url: $scope.baseurl+"userDetails/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			//alert(JSON.stringify(data));
			$scope.loading	=false;
			$scope.userdetails = data;
		}).error(function(data) {
        alert("error");    
        $scope.loading	=false;            
    });


	$scope.addLink = function(link){
		//alert(qid);
		//var link = "http://twitter.com/share?url="+$scope.siteurl+"#/answers/"+qid+"&text="+content;
		window.open(link, '_blank', 'location=yes'); 
	}
	
	//user ratings
	$http({
			url: $scope.baseurl+"profileRating/"+$scope.pid,
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


	//questions count
		/*$http({
			url: $scope.baseurl+"countuserQuestions/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countquestions = data;
			if(data == '"0"'){
				$scope.countquestions = 0;
			}
		}).error(function(data) {
        alert("error");                
    });*/

	//answers count
	$http({
		url: $scope.baseurl+"countuserAnswers/"+$scope.pid,
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

	//connects count
		$http({
			url: $scope.baseurl+"countMyconnects/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countmyconnects = data;
			if(data == '"0"'){
				$scope.countmyconnects = 0;
			}
		}).error(function(data) {
        alert("error");                
    	});


    $scope.connectUser = function(cid) {
    	$scope.loading	=true;
		$http({
			url: 	$scope.baseurl+"connectUser/"+user_id,
			method: 'GET',
			params: {connect_id:cid}
		}).success(function(data) {
			alert('connected!');
			$scope.loading	=false;
		}).error(function(data) {
			alert('Something went wrong! Please try again');
			$scope.loading	=false;
		});
	}

		$http({
			url: 	$scope.baseurl+"isUserconnected/"+user_id,
			method: 'GET',
			params: {connect_id:$scope.pid}
		}).success(function(data) {
			if(data.length > '0'){
				$scope.showConnect    = '1';
			}
		}).error(function(data) {
			alert('Something went wrong! Please try again');
		});

});
