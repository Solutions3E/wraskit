'use strict';
myCustom.controller('loginController', function loginController($scope, $http, $window, $navigate,$facebook) {

	$scope.check_login();
    //alert('devic - '+$scope.deviceid);
	//$scope.loading=true;
    $scope.device_id = localStorage.getItem("wraskit_device_id");
    //alert($scope.device_id);
	if($scope.userId) {
		$navigate.go('/home');
	}
	$scope.submitForm = function(isValid) {
		$scope.loading=true;
		if(isValid) {
			var user = $scope.username;
			var pass = $scope.password;

	        $http({
		    url: $scope.baseurl+"userLogin/1", 
	    	method: "GET",
	    	params: {username: user, password: pass, deviceid:$scope.device_id}
	 		})	.success(function(data){
				$scope.loading  =false;
				$scope.username =data.username;
				$scope.userId 	=data.id;
				localStorage.setItem("userId", data.id);
				alert("Welcome "+$scope.username);
				$navigate.go("/home");
			})
			.error(function(data) {
		            alert("Invalid username or password"); 
		            $scope.loading  =false;               
		        })
		        .then(function(data) {
			});
		}
		
	};

    //facebook login for app
    $scope.facebookConnect = function(fbData){
          //alert(JSON.stringify(fbData));
            facebookConnectPlugin.api('/me',[],
                function(fbResponse){
                    //alert("hii4");
                    //alert(JSON.stringify(fbResponse));
                        var username    =fbResponse.id;
                        var email       =fbResponse.email;
                        var firstName   =fbResponse.first_name;
                        var lastName    =fbResponse.last_name;
                        var password    =username;


                        $http({
                            url: $scope.baseurl+"userLogin/1", 
                            method: "GET",
                            params: {username: username, password: password}
                        }).success(function(data){
                                $scope.loading=false;
                                //onSuccessLogin(firstName+' '+lastName, data.id);
                                $scope.username = data.username;
                                $scope.userId   = data.id;
                                localStorage.setItem("userId", $scope.userId);
                                //alert("Welcome "+$scope.username);
                                $navigate.go('/home');
                        }) .error(function(err) {
                            //if login error then user is not exist, try register
                            //alert("hi7878");
                            $http({
                                url: $scope.baseurl+"userRegister/1", 
                                method: "GET",
                                params: {firstname:firstName, lastname:lastName, email:email, username: username, password: password}
                            }) .success(function(data){

                                $scope.loading=false;
                                $scope.username = data.username;
                                $scope.userId   = data.id;
                                localStorage.setItem("userId", $scope.userId);
                                //alert("Welcome "+$scope.username);
                                $navigate.go('/home');

                            }) .error(function(data) {
                                $scope.loading=false;
                                alert("Something went wrong, please try again!");                
                            }) .then(function(data) {});

                        });
                    // },
                },function(error){
                    alert(error);
            });
    }

    $scope.facebookLogin = function(){
        $scope.loading=true;
        facebookConnectPlugin.getLoginStatus(function(response){
            if(response.status !="connected"){
                    facebookConnectPlugin.login(['email','public_profile','user_location','user_friends','read_friendlists','user_birthday'],
                    function(loginResponse){
                         $scope.facebookConnect(loginResponse);
                    },
                    function(error){
                    alert('Error',JSON.stringify(response));
                    }
                );
            }else {
               $scope.facebookConnect(response);
            }
        },
        function(error){
            alert('Error',JSON.stringify(response));
        });
    }



	/*$scope.fbLogin = function(){
		$scope.loading=true;
            $facebook.login().then(function() {
                $facebook.api("/me").then( 
                    function(response) {
                        var username=response.id;
                        var email=response.email;
                        var firstName=response.first_name;
                        var lastName=response.last_name;
                        var password=username;

                        //try login first
                        $http({
                            url: $scope.baseurl+"userLogin/1", 
                            method: "GET",
                            params: {username: username, password: password}
                        }).success(function(data){
                                //alert(JSON.stringify(data));
                                $scope.loading=false;
                                onSuccessLogin(firstName+' '+lastName, data.id);
                        }) .error(function(data) {

                            //if login error then user is not exist, try register
                            $http({
                                url: $scope.baseurl+"userRegister/1", 
                                method: "GET",
                                params: {firstname:firstName, lastname:lastName, email:email, username: username, password: password}
                            }) .success(function(data){
                            	$scope.loading=false;
                                onSuccessLogin(firstName+' '+lastName, data.id);
                            }) .error(function(data) {
                            	$scope.loading=false;
                                alert("Something went wrong, please try again!");                
                            }) .then(function(data) {});

                        }) .then(function(data) {});
                    },
                    function(err) {
                        //console.log(err);
                    }
                );

                function onSuccessLogin(username, id){
                    $scope.username =username;
                    $scope.userId 	=id;
                    localStorage.setItem("userId", id);
                    alert("Welcome "+$scope.username);
                    //$navigate.go('/home');
                    $navigate.go('/wraskinterest');
                }
            });
            
            return false;
        };*/
});
