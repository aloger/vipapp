app.controller('completeCtrl', function ($http, $scope, $state,$ionicPopup,finacialSrv) {
    var showAlert = function (messenger) {
        var alertPopup = $ionicPopup.alert({
            title: 'Thông báo',
            template: "<p style='text-align:center;'>"+messenger+"</p>"
        });
        alertPopup.then(function (res) {
        });
    };
    showAlert("Bạn đã đăng ký thành công.<br/>Vui lòng kiểm tra lại thông tin bằng email mà bạn dùng để đăng ký.");
    $scope.stepOneData = finacialSrv.getStepOne();
    $scope.stepTwoData = finacialSrv.getStepTwo();

});