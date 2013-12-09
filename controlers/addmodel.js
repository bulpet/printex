//inject angular bootstrap and file upload directives and service.
angular.module('prntx', ['ui.bootstrap','angularFileUpload']);

var newModel = function($scope, $modal, $http, $log){
    
    $scope.open = function () {
        var modalInstance = $modal.open({
          templateUrl: 'atachfile.html',
          controller: ModalInstanceCtrl,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
    }
    
    $scope.add=function(){
        //debugger;

        //var tmp = $scope.model.description;
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
};

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  //$scope.items = items;
  //$scope.selected = {
  //  item: $scope.items[0]
  //};

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};


var MyCtrl = [ '$scope', '$upload', function($scope, $upload) {
    debugger;
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $scope.upload = $upload.upload({
        url: '/api/upload', //upload.php script, node.js route, or servlet url
        method: 'POST',
        // headers: {'headerKey': 'headerValue'}, withCredential: true,
        data: {myObj: $scope.myModelObj},
        file: $file,
        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
        //fileFormDataName: myFile,
        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
        //formDataAppender: function(formData, key, val){} 
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress); 
    }
  };
}];
/*var app = angular.module('prntx', ['ui.bootstrap']);

app.controller('newModel', function newModel($scope, $http, $modal, $log){
    
    $scope.open = function () {
        var modalInstance = $modal.open({
          templateUrl: 'atachfile.html',
          controller: ModalInstanceCtrl,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
    }
    
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
});*/

