'use strict';
myCustom.controller('changeProfilePicController', function changeProfilePicController($scope, $http, $window, $upload, $navigate, $routeParams) {

	$scope.check_login();
	var user_id = $scope.userId;
	//var image_upload_url = $scope.image_upload_url;
	$scope.base = $scope.baseurl;
	//$scope.current_uesr_id = $scope.userId;


  $scope.updateProfilePictureGallery = function() {
        var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: 0,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0,     // 0=JPG 1=PNG
        }
        // Take picture using device camera and retrieve image as base64-encoded string
navigator.camera.getPicture(onProfilePicture,onFail,options);
    }

var onProfilePicture = function(imageURI) {
  //alert(imageURI);

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.mimeType = "image/jpg";

        var params = new Object();
        params.imageURI = imageURI;
        params.userid = $scope.userId;
        options.params = params;
        options.chunkedMode = false;
        $scope.loading  =true;
        var ft = new FileTransfer();
        ft.upload(imageURI, $scope.baseurl + 'changeProfilePic',
            function(data){
              alert("Profile Picture Updated");
              $navigate.go('/myprofile');
                //resp = eval('('+data.response+')');
                //$scope.profile_photo = resp.photo;
                //alert($scope.profile_photo);
                $scope.loading =false;
                $scope.$apply();
            },
            function(err){
              alert("Oops, something went wrong. Please try again!");
                $scope.loading =false;
                //alert(JSON.stringify(err));
            },
            options,
            true
        );

        //$scope.$apply();
    };

 var onFail = function(e) {
        $scope.loading =false;
        //alert(e);
    }; 

/*

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
                 
             /*  }).error(function (data, status, headers, config) {
                   console.log(data);
                   $scope.loading =false;
               });

		}

	}

		$('.uploadImagepress').click(function(){

			$('.field_log').click();

		});*/
});
