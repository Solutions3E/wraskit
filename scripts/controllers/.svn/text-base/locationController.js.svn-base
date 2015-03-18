'use strict';
myCustom.controller('locationController', function locationController($scope, $http, $window, $navigate) {

	$scope.check_login();
	$scope.loading=true;

	$scope.selectlocations = [
    	{name:'Use my current location',value:'0'},
    	{name:'Select from the lists',value:'1'},
  	];

  	$scope.getLocationtype = function () {
  		//alert($scope.locationtype);
  		if($scope.locationtype == 1) {
  			alert($scope.locationtype);
  			$scope.showlocationtype = '1';

  			}
  			else {
				$http({
						url: 'http://api.ipinfodb.com/v3/ip-city/?key=edfe3bb8934d58f3e0007ccd9b9d185d00ce5a7eb8f6dbe959c8eb5a119fe8a3&ip=74.125.45.100&format=json',
						//url    : '',
						method : 'GET',
						crossdomain : true,
						params : {}
					}).success(function(data) {
						$scope.locationtype = 'kerala';
					}).error(function(data) {
			        	alert("error api");                
			    });
			}
  		}
		//location test
				
		$scope.submitForm = function () {
			alert($scope.selectedstate);
		}
			


		/*$scope.getlocation = function () {
			alert($scope.state);
			$http({
				url: '',
				method : 'GET',
				params : {}
			}).success(function(data) {
				alert(JSON.stringify(data));
			}).error(function(data) {
	        //alert("error api");                
	    	});
	    }*/


	    $scope.usStates = [
				    { name: 'ALABAMA', abbreviation: 'AL'},
				    { name: 'ALASKA', abbreviation: 'AK'},
				    { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
				    { name: 'ARIZONA', abbreviation: 'AZ'},
				    { name: 'ARKANSAS', abbreviation: 'AR'},
				    { name: 'CALIFORNIA', abbreviation: 'CA'},
				    { name: 'COLORADO', abbreviation: 'CO'},
				    { name: 'CONNECTICUT', abbreviation: 'CT'},
				    { name: 'DELAWARE', abbreviation: 'DE'},
				    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
				    { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
				    { name: 'FLORIDA', abbreviation: 'FL'},
				    { name: 'GEORGIA', abbreviation: 'GA'},
				    { name: 'GUAM', abbreviation: 'GU'},
				    { name: 'HAWAII', abbreviation: 'HI'},
				    { name: 'IDAHO', abbreviation: 'ID'},
				    { name: 'ILLINOIS', abbreviation: 'IL'},
				    { name: 'INDIANA', abbreviation: 'IN'},
				    { name: 'IOWA', abbreviation: 'IA'},
				    { name: 'KANSAS', abbreviation: 'KS'},
				    { name: 'KENTUCKY', abbreviation: 'KY'},
				    { name: 'LOUISIANA', abbreviation: 'LA'},
				    { name: 'MAINE', abbreviation: 'ME'},
				    { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
				    { name: 'MARYLAND', abbreviation: 'MD'},
				    { name: 'MASSACHUSETTS', abbreviation: 'MA'},
				    { name: 'MICHIGAN', abbreviation: 'MI'},
				    { name: 'MINNESOTA', abbreviation: 'MN'},
				    { name: 'MISSISSIPPI', abbreviation: 'MS'},
				    { name: 'MISSOURI', abbreviation: 'MO'},
				    { name: 'MONTANA', abbreviation: 'MT'},
				    { name: 'NEBRASKA', abbreviation: 'NE'},
				    { name: 'NEVADA', abbreviation: 'NV'},
				    { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
				    { name: 'NEW JERSEY', abbreviation: 'NJ'},
				    { name: 'NEW MEXICO', abbreviation: 'NM'},
				    { name: 'NEW YORK', abbreviation: 'NY'},
				    { name: 'NORTH CAROLINA', abbreviation: 'NC'},
				    { name: 'NORTH DAKOTA', abbreviation: 'ND'},
				    { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
				    { name: 'OHIO', abbreviation: 'OH'},
				    { name: 'OKLAHOMA', abbreviation: 'OK'},
				    { name: 'OREGON', abbreviation: 'OR'},
				    { name: 'PALAU', abbreviation: 'PW'},
				    { name: 'PENNSYLVANIA', abbreviation: 'PA'},
				    { name: 'PUERTO RICO', abbreviation: 'PR'},
				    { name: 'RHODE ISLAND', abbreviation: 'RI'},
				    { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
				    { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
				    { name: 'TENNESSEE', abbreviation: 'TN'},
				    { name: 'TEXAS', abbreviation: 'TX'},
				    { name: 'UTAH', abbreviation: 'UT'},
				    { name: 'VERMONT', abbreviation: 'VT'},
				    { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
				    { name: 'VIRGINIA', abbreviation: 'VA'},
				    { name: 'WASHINGTON', abbreviation: 'WA'},
				    { name: 'WEST VIRGINIA', abbreviation: 'WV'},
				    { name: 'WISCONSIN', abbreviation: 'WI'},
				    { name: 'WYOMING', abbreviation: 'WY' }
				];

});
