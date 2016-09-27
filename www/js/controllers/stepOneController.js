
app.controller('stepOneCtrl', function ($scope, $state, $ionicPopup, finacialSrv, $cordovaFileTransfer) {



    $scope.IdIssuedDate = "";
    $scope.school = "";

    $scope.clickedValueModel = "";
    $scope.removedValueModel = "";
    $scope.gender =
        [
            {
                'Id': '',
                'Name': 'Chọn giới tính'
            },
            {
                'Id': '0',
                'Name': 'Nam'
            },
            {
                'Id': '1',
                'Name': 'Nữ'
            }
        ];
    var items;
    finacialSrv.getListSchools().then(function (response) {
        items = response.data.ResponseData
    })
    $scope.getTestItems = function (query) {
        if (query) {
            return items.filter(function (item) {
                return (item.Id.indexOf(query) != -1 || item.Name.toLowerCase().indexOf(query.toLowerCase()) != -1)
            });
        }
        return { "Id": "", "Name": "Không tìm thấy" };
    }
    $scope.itemsClicked = function (callback) {
        $scope.clickedValueModel = callback;
    };
    $scope.itemsRemoved = function (callback) {
        $scope.removedValueModel = callback;
    };
    var showAlert = function (messenger) {
        var alertPopup = $ionicPopup.alert({
            title: 'Thông báo',
            template: messenger
        });
        alertPopup.then(function (res) {
        });
    };
    //Handle event clicked.
    $scope.GotoStep2 = function () {
        finacialSrv.clearDataStepOne();
        if ($scope.LastName === "" || $scope.LastName === null || $scope.LastName === undefined) {
            showAlert("Họ và tên đệm không được bỏ trống"); return;
        } else if (!(/^[^~@#$%^&*+=$<>]*$/.test($scope.LastName))) {
            showAlert("Họ và tên đệm không đúng"); return;
        }
        if ($scope.FirstName === "" || $scope.FirstName === null || $scope.FirstName === undefined) {
            showAlert("Tên không được bỏ trống"); return;
        } else if (!(/^[^~@#$%^&*+=$<>]*$/.test($scope.FirstName))) {
            showAlert("Tên không đúng"); return;
        }
        if ($scope.Gender === "" || $scope.Gender === null || $scope.Gender === undefined) {
            showAlert("Giới tính không được bỏ trống"); return;
        }
        if ($scope.Position === "" || $scope.Position === null || $scope.Position === undefined) {
            showAlert("Chức vụ không được bỏ trống"); return;
        }
        if ($scope.IdentityId === "" || $scope.IdentityId === null || $scope.IdentityId === undefined) {
            showAlert("CMND/Hộ chiếu không được bỏ trống"); return;
        } else if (!(/(^(([a-zA-Z]?\d{8})|([a-zA-Z]{2}\d{7})|([a-zA-Z]{3}\d{6})|(\d{9})|(\d{12}))$)/.test($scope.IdentityId) && $scope.IdentityId.length != 0)) {
            showAlert("CMND/Hộ chiếu không đúng"); return;
        }
        if ($scope.IdIssuedDate === "" || $scope.IdIssuedDate === null || $scope.IdIssuedDate === undefined) {
            showAlert("Ngày cấp không được bỏ trống"); return;
        }
        if ($scope.IdIssuedBy === "" || $scope.IdIssuedBy === null || $scope.IdIssuedBy === undefined) {
            showAlert("Nơi cấp không được bỏ trống"); return;
        } else if (!(/^[^~@#$%^&*+=$<>]*$/.test($scope.IdIssuedBy))) {
            showAlert("Nơi cấp không đúng"); return;
        }
        if ($scope.DOB === "" || $scope.DOB === null || $scope.DOB === undefined) {
            showAlert("Ngày sinh không được bỏ trống"); return;
        }
        var date1 = new Date()
        if ($scope.DOB > date1.setYear(date1.getFullYear() - 16)) {
            showAlert("Độ tuổi không phù hợp"); return;
        }
        if ($scope.school === "" || $scope.school === null || $scope.school === undefined) {
            showAlert("Đơn vị công tác không được bỏ trống"); return;
        }
        $scope.data = {
            LastName: $scope.LastName,
            FirstName: $scope.FirstName,
            Gender: $scope.Gender,
            OfficerId: $scope.Position,
            IdentityId: $scope.IdentityId,
            IdIssuedDate: $scope.IdIssuedDate,
            IdIssuedBy: $scope.IdIssuedBy,
            DOB: $scope.DOB,
            SchoolId: $scope.school,
            Aboutsalary: $scope.aboutsalary,
        }
        finacialSrv.saveStepOne($scope.data);
        $state.go('steptwo')
    };

    //Positions
    finacialSrv.getPositions().then(function (response) {
        $scope.positions = response.data.ResponseData
    })

    var name = new Date();
    var fileone = "" + name.getFullYear() + name.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + name.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + name.getHours() + name.getMinutes() + name.getMilliseconds();

    //Upload File
    $scope.uploadFile = function () {
        var file = $scope.myFile;
        fileone = fileone + "." + /[^.]+$/.exec(file[0].name);
        finacialSrv.uploadFileToUrl(file, fileone);
    };

    $scope.myGoBack = function () {
        $state.go('stepone')
    };
    // $scope.filetransfer = function () {
    //     var file = $scope.myFile;
    //     if(file !== undefined || file.size > 0)
    //     {
    //         var fileName = cordova.file.documentsDirectory+ file.name;
    //         console.log(cordova.file.documentsDirectory);
    //         finacialSrv.fileTransfer($cordovaFileTransfer,fileName);
    //     }
    //     // finacialSrv.fileTransfer($cordovaFileTransfer,file.name);
    // }
});
