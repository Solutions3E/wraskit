'use strict';
myCustom.controller('changeProfilePicController', function changeProfilePicController($scope, $http, $window, $upload, $navigate, $routeParams) {

	$scope.check_login();
	var user_id = $scope.userId;
	//var image_upload_url = $scope.image_upload_url;
	$scope.base = $scope.baseurl;
	//$scope.current_uesr_id = $scope.userId;



	$scope.submitForm = function ($file) {
		$scope.loading =true;
		if(Object.keys($file).length != 0) 
        {
				$scope.upload = $upload.upload({

                   url : $scope.baseurl+"changeProfilePic/",
                   method: "POST",
                   params: { video: $scope.file_url,userid:$scope.userId },
                   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                   file: $file
               }).progress(function (evt) {
                   console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
               }).success(function (data, status, headers, config) { //alert(JSON.stringify(data));
                   $scope.loading =false;
                   alert("Profile image updated");
                   $navigate.go('/myprofile');  
                   /*$scope.content = data.data;
                   $scope.advertisement_data.file_url = $scope.content.file_url;
                   $('#file_url').val($scope.content.file_url) ;
                   $('#content_type').val($scope.content.content_type) ;
                   $scope.advertisement_data.file_name = $scope.content.name;
                   $scope.advertisement_data.content_type = $scope.content.type;
                   $scope.$apply();
                   console.log(data.data.file_url);*/
                 
               }).error(function (data, status, headers, config) {
                   console.log(data);
                   $scope.loading =false;
               });

		}

	}

		$('.uploadImagepress').click(function(){

			$('.field_log').click();

		});
});
