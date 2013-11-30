function newModel($scope, $http){
	$scope.add=function(){
		debugger;

		var tmp = $scope.model.description;
		var postData = angular.toJson($scope.model);

		$http({
            url: '/api/model',
            method: "POST",
            data: postData,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
                $scope.persons = data; // assign  $scope.persons here as promise is resolved here 
            }).error(function (data, status, headers, config) {
                $scope.status = status;
            });

	};
}