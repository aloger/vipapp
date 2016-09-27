app.controller('stepTwoCtrl', function ($http, $scope, $ionicPopup, $state, finacialSrv, $ionicLoading, $ionicHistory) {
    var stepOneData = finacialSrv.getStepOne();
    finacialSrv.getListProvinces().then(function (response) {
        $scope.listProvince = response.data.ResponseData
    })
    if (stepOneData != null && stepOneData.lenght != 0) {
        finacialSrv.getPackage(stepOneData[0].OfficerId).then(function (response) {
            if (response.data.ResponseData.length != 0) {
                $scope.package = response.data.ResponseData[0];
            } else {
                $scope.package = [];
            }
        });
    } else {
        $scope.package = [];
    }
    finacialSrv.getPositions().then(function (response) {
        $scope.positions = response.data.ResponseData
    })
    finacialSrv.getSchoolName(stepOneData[0].SchoolId).then(function (response) {
        $scope.schoolNameTmp = response.data.ResponseData[0];
    })
    $scope.getDistrict = function (provinceId) {
        if (provinceId === null || provinceId == undefined || provinceId === "") {
            $scope.districts = [{
                'Id': '',
                "Name": "Chọn quận huyện"
            }];
        } else {
            finacialSrv.getDistrict(provinceId).then(function (response) {
                $scope.districts = response.data.ResponseData;
            }, function (error) {
                $scope.districts = [{
                    'Id': '',
                    "Name": "Chọn quận huyện"
                }];
            })
        }
    }
    $scope.getDistrictcurrent = function (provinceId) {
        if (provinceId === null || provinceId == undefined || provinceId === "") {
            $scope.districtscurrent = [{
                'Id': '',
                "Name": "Chọn quận huyện"
            }];
        } else {
            finacialSrv.getDistrict(provinceId).then(function (response) {
                $scope.districtscurrent = response.data.ResponseData;
            }, function (error) {
                $scope.districtscurrent = [{
                    'Id': '',
                    "Name": "Chọn quận huyện"
                }];
            })
        }
    }
    $scope.listMaritalStatus =
        [
            {
                'Id': '',
                'Name': 'Chọn tình trạng hôn nhân'
            },
            {
                'Id': '0',
                'Name': 'Độc thân'
            },
            {
                'Id': '1',
                'Name': 'Đã kết hôn'
            },
            {
                'Id': '2',
                'Name': 'Khác'
            }];
    $scope.listHome =
        [
            {
                'Id': '',
                'Name': 'Chọn loại nhà sở hữu'
            },
            {
                'Id': '0',
                'Name': 'Nhà riêng'
            },
            {
                'Id': '1',
                'Name': 'Nhà thuê'
            },
            {
                'Id': '2',
                'Name': 'Nhà bố mẹ'
            },
            {
                'Id': '3',
                'Name': 'Mua trả góp'
            },
            {
                'Id': '4',
                'Name': 'Khác'
            }
        ];
    $scope.laborcontracts =
        [
            {
                'Id': '',
                'Name': 'Chọn loại hợp đồng'
            },
            {
                'Id': '0',
                'Name': 'Hợp đồng dưới 1 năm'
            },
            {
                'Id': '1',
                'Name': 'Hợp đồng 1-3 năm'
            },
            {
                'Id': '2',
                'Name': 'Hợp đồng không thời hạn'
            },
            {
                'Id': '3',
                'Name': 'Khác'
            }
        ];
    $scope.formofwage =
        [
            {
                'Id': '',
                'Name': 'Chọn hình thức nhận lương'
            },
            {
                'Id': '0',
                'Name': 'Tiền mặt'
            },
            {
                'Id': '1',
                'Name': 'Chuyển khoản qua BIDV'
            },
            {
                'Id': '2',
                'Name': 'Chuyển khoản qua ngân hàng khác'
            }
        ];
    $scope.insurrance =
        [
            {
                'Id': '',
                'Name': 'Chọn loại đăng ký bảo hiểm'
            },
            {
                'Id': '0',
                'Name': 'Bảo hiểm tai nạn'
            },
            {
                'Id': '1',
                'Name': 'Bảo hiểm nhân thọ'
            },
            {
                'Id': '2',
                'Name': 'Tham gia loại trên 2 năm'
            },
            {
                'Id': '3',
                'Name': 'Không tham gia bảo hiểm'
            }
        ];
    var showAlert = function (messenger) {
        finacialSrv.hideLoading($ionicLoading);
        var alertPopup = $ionicPopup.alert({
            title: 'Thông báo',
            template: messenger
        });
        alertPopup.then(function (res) {
        });
    };
    $scope.completeRegister = function () {
        finacialSrv.showLoading($ionicLoading);
        finacialSrv.clearDataStepTwo();
        if ($scope.LoanAmount === "" || $scope.LoanAmount === null || $scope.LoanAmount === undefined || $scope.LoanAmount < 1000000) {
            showAlert("Bạn phải chọn mức vay");
            return;
        }
        if ($scope.ResidentAddress === "" || $scope.ResidentAddress === null || $scope.ResidentAddress === undefined) {
            showAlert("Địa chỉ thường trú không được bỏ trống");
            return;
        };
        if ($scope.Province === "" || $scope.Province === null || $scope.Province === undefined) {
            showAlert("Tỉnh/Thành phố thường trú không được bỏ trống");
            return;
        }
        if ($scope.District === "" || $scope.District === null || $scope.District === undefined) {
            showAlert("Quận/Huyện thường trú không được bỏ trống");
            return;
        }

        if ($scope.CurrentAddress === "" || $scope.CurrentAddress === null || $scope.CurrentAddress === undefined) {
            showAlert("Địa chỉ hiện tại không được bỏ trống");
            return;
        }
        if ($scope.ProvinceCurrent === "" || $scope.ProvinceCurrent === null || $scope.ProvinceCurrent === undefined) {
            showAlert("Tỉnh/Thành phố hiện tại không được bỏ trống");
            return;
        }
        if ($scope.DistrictCurrent === "" || $scope.DistrictCurrent === null || $scope.DistrictCurrent === undefined) {
            showAlert("Quận/Huyện hiện tại không được bỏ trống");
            return;
        }
        if (($scope.YearAddress !== "" && $scope.YearAddress !== null && $scope.YearAddress !== undefined) && !(/^[0-9]+$/.test($scope.YearAddress))) {
            showAlert("Năm cư trú phải là số");
            return;
        }
        if (($scope.MonthAddress !== "" && $scope.MonthAddress !== null && $scope.MonthAddress !== undefined) && !(/^[0-9]+$/.test($scope.MonthAddress))) {
            showAlert("Tháng cư trú phải là số");
            return;
        }
        if (0 > $scope.MonthAddress || $scope.MonthAddress > 11) {
            showAlert("Tháng cư trú không được lớn hơn 11");
            return;
        }
        var stepOneData = finacialSrv.getStepOne();
        if ($scope.YearAddress > ((new Date().getFullYear()) - stepOneData[0].DOB.getFullYear())) {
            showAlert("Thời gian cư trú không được lớn hơn số tuổi");
            return;
        }
        if ($scope.Phone === "" || $scope.Phone === null || $scope.Phone === undefined) {
            showAlert("Số điện thoại không được bỏ trống"); return;
        } else if (!(/^(((\+|0)\d{2,3}\s?\d{7})|((\+|0)\d{12,14}))|(\(?\d{2,3}\)?\s?\d{7,9})$/.test($scope.Phone))) {
            showAlert("Số điện thoại không đúng"); return;
        }
        if ($scope.Email === "" || $scope.Email === null || $scope.Email === undefined) {
            showAlert("Email không được bỏ trống");
            return;
        } else if (!(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i.test($scope.Email))) {
            showAlert("Email không đúng");
            return;
        }
        if ($scope.MaritalStatus === "" || $scope.MaritalStatus === null || $scope.MaritalStatus === undefined) {
            showAlert("Tình trạng hôn nhân không được bỏ trống");
            return;
        }
        if (($scope.NumberDepent !== "" && $scope.NumberDepent !== null && $scope.NumberDepent !== undefined) && !(/^[0-9]+$/.test($scope.NumberDepent))) {
            showAlert("Số người phụ thuộc tài chính phải là số");
            return;
        }
        if ($scope.HomeStatus === "" || $scope.HomeStatus === null || $scope.HomeStatus === undefined) {
            showAlert("Loại nhà sở hữu không được bỏ trống");
            return;
        }
        if ($scope.SecrectQuestion === "" || $scope.SecrectQuestion === null || $scope.SecrectQuestion === undefined) {
            showAlert("Câu hỏi bảo mật không được bỏ trống");
            return;
        } else if (!(/^[^~@#$%^&*+=$<>]*$/.test($scope.SecrectQuestion))) {
            showAlert("Câu hỏi bảo mật không đúng");
            return;
        }
        if ($scope.Formofwage === "" || $scope.Formofwage === null || $scope.Formofwage === undefined) {
            showAlert("Hình thức nhận lương không được bỏ trống");
            return;
        }
        if ($scope.Insurrance === "" || $scope.Insurrance === null || $scope.Insurrance === undefined) {
            showAlert("Bảo hiểm không được bỏ trống");
            return;
        }
        if ($scope.Contract === "" || $scope.Contract === null || $scope.Contract === undefined) {
            showAlert("Hợp đồng lao động không được bỏ trống");
            return;
        }
        if ($scope.YearSeniority === "" || $scope.YearSeniority === null || $scope.YearSeniority === undefined) {
            showAlert("Năm thâm niên không được bỏ trống");
            return;
        } else if (!(/^[0-9]+$/.test($scope.YearSeniority))) {
            showAlert("Năm thâm niên không đúng");
            return;
        }
        if ($scope.MonthSeniority === "" || $scope.MonthSeniority === null || $scope.MonthSeniority === undefined || 0 > $scope.MonthSeniority || $scope.MonthSeniority > 11) {
            showAlert("Tháng thâm niên không được bỏ trống");
            return;
        } else if (!(/^[0-9]+$/.test($scope.MonthSeniority))) {
            showAlert("Tháng thâm niên không đúng");
            return;
        }
        if ($scope.YearSeniority === "" || $scope.YearSeniority === null || $scope.YearSeniority === undefined) {
            showAlert("Năm thâm niên không được bỏ trống");
            return;
        } else if (!(/^[0-9]+$/.test($scope.YearSeniority))) {
            showAlert("Năm thâm niên không đúng");
            return;
        }
        if ($scope.YearSeniority > ((new Date().getFullYear()) - stepOneData[0].DOB.getFullYear())) {
            showAlert("Thâm niên không được lớn hơn số tuổi");
            return;
        }

        var validFormats = ['jpg', 'jpge', 'png', 'gif', 'pdf', 'doc', 'docx'];
        if (($scope.fileone !== "" && $scope.fileone !== null && $scope.fileone !== undefined) && $scope.fileone.length !== 0) {
            if ((validFormats.indexOf(/[^.]+$/.exec($scope.fileone[0].name)[0].toLowerCase()) === -1)) {
                showAlert("Chỉ chấp nhận file có định dạng: 'jpg', 'jpge', 'png', 'gif', 'pdf', 'doc', 'docx'");
                return;
            }
        }
        if (($scope.filetwo !== "" && $scope.filetwo !== null && $scope.filetwo !== undefined) && $scope.filetwo.length !== 0) {
            if (validFormats.indexOf(/[^.]+$/.exec($scope.filetwo[0].name)[0].toLowerCase()) === -1) {
                showAlert("Chỉ chấp nhận file có định dạng: 'jpg', 'jpge', 'png', 'gif', 'pdf', 'doc', 'docx'");
                return;
            }
        }
        if (($scope.filethree !== "" && $scope.filethree !== null && $scope.filethree !== undefined) && $scope.filethree.length !== 0) {
            if (validFormats.indexOf(/[^.]+$/.exec($scope.filethree[0].name)[0].toLowerCase()) === -1) {
                showAlert("Chỉ chấp nhận file có định dạng: 'jpg', 'jpge', 'png', 'gif', 'pdf', 'doc', 'docx'");
                return;
            }
        }



        var listDistrict = $scope.listProvince;
        var ProvinceName = "";
        angular.forEach(listDistrict, function (value, key) {
            if ($scope.Province == value.Id) {
                ProvinceName = value.Name;
            }
        });
        var ProvinceCurrent = "";
        angular.forEach(listDistrict, function (value, key) {
            if ($scope.ProvinceCurrent == value.Id) {
                ProvinceCurrent = value.Name;
            }
        });

        var Position = "";

        var id = stepOneData[0].OfficerId;
        angular.forEach($scope.positions, function (value, key) {
            if (id == value.Id) {
                Position = value.Name;
            }
        });
        var SchoolName = "";

        SchoolName = $scope.schoolNameTmp;
        $scope.data = {
            ResidentAddress: $scope.ResidentAddress + ' ' + $scope.District + ' ' + $scope.Province,
            TempResideantAddress: $scope.ResidentAddress + ', ' + $scope.District + ', ' + ProvinceName,
            DOB: stepOneData[0].DOB.getDate() + "/" + stepOneData[0].DOB.getMonth() + "/" + stepOneData[0].DOB.getFullYear(),
            TempCurrentAddress: $scope.CurrentAddress + ', ' + $scope.DistrictCurrent + ', ' + ProvinceCurrent,
            TempSchool: SchoolName,
            IdIssuedDate: stepOneData[0].IdIssuedDate.getDate() + "/" + stepOneData[0].IdIssuedDate.getMonth() + "/" + stepOneData[0].IdIssuedDate.getFullYear(),
            CurrentAddress: $scope.CurrentAddress + ' ' + $scope.DistrictCurrent + ' ' + $scope.ProvinceCurrent,
            TempPosition: Position,
            YearAddress: $scope.YearAddress,
            MonthAddress: $scope.MonthAddress,
            Phone: $scope.Phone,
            Email: $scope.Email,
            MaritalStatus: $scope.MaritalStatus,
            NumberDepent: $scope.NumberDepent,
            Ownhouses: $scope.HomeStatus,
            PrimarySchool: $scope.SecrectQuestion,
            Formsofwage: $scope.Formofwage,
            Typeofwork: $scope.Insurrance,
            Laborcontracts: $scope.Contract,
            PackageId: $scope.package.Id,
            LoanAmount: $scope.LoanAmount,
            YearSeniority: $scope.YearSeniority,
            MonthSeniority: $scope.MonthSeniority,
            ServiceInternet: $scope.BIDVOnline,
            ServiceMobile: $scope.BIDVMobile
        }

        var data = {
            LastName: stepOneData[0].LastName,
            FirstName: stepOneData[0].FirstName,
            Gender: stepOneData[0].Gender,
            OfficerId: stepOneData[0].OfficerId,
            IdentityId: stepOneData[0].IdentityId,
            IdIssuedDate: stepOneData[0].IdIssuedDate.getDate() + "/" + stepOneData[0].IdIssuedDate.getMonth() + "/" + stepOneData[0].IdIssuedDate.getFullYear(),
            IdIssuedBy: stepOneData[0].IdIssuedBy,
            DOB: stepOneData[0].DOB.getDate() + "/" + stepOneData[0].DOB.getMonth() + "/" + stepOneData[0].DOB.getFullYear(),
            SchoolId: stepOneData[0].SchoolId,
            Aboutsalary: stepOneData[0].Aboutsalary,

            ResidentAddress: $scope.data.ResidentAddress,
            CurrentAddress: $scope.data.CurrentAddress,
            LoanAmount: $scope.data.LoanAmount,
            PackageId: $scope.data.PackageId,
            YearAddress: $scope.data.YearAddress,
            MonthAddress: $scope.data.MonthAddress,
            Phone: $scope.data.Phone,
            Email: $scope.data.Email,
            MaritalStatus: $scope.data.MaritalStatus,
            NumberDepent: $scope.data.NumberDepent,
            Ownhouses: $scope.data.Ownhouses,
            PrimarySchool: $scope.data.PrimarySchool,
            Formsofwage: $scope.data.Formsofwage,
            Typeofwork: $scope.data.Typeofwork,
            Laborcontracts: $scope.data.Laborcontracts,
            YearSeniority: $scope.data.YearSeniority,
            MonthSeniority: $scope.data.MonthSeniority,
            ServiceInternet: $scope.data.ServiceInternet,
            ServiceMobile: $scope.data.ServiceMobile,
            EnclosedFile: "",
            Citizenship: "",
            RefCitizenship: ""
        }

        //Upload File
        if (($scope.fileone !== "" && $scope.fileone !== null && $scope.fileone !== undefined) && $scope.fileone.length !== 0) {
            var name = new Date();
            var fileone = "" + name.getFullYear() + name.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + name.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + name.getHours() + name.getMinutes() + name.getMilliseconds();
            var file = $scope.fileone;
            fileone = fileone + "." + /[^.]+$/.exec(file[0].name);
            finacialSrv.uploadFileToUrl(file, fileone);
            if (/[^.]+$/.exec(file.name) == "doc" || /[^.]+$/.exec(file.name) == "pdf")
                data.EnclosedFile = "/Uploads/PDF/" + fileone;
            else
                data.EnclosedFile = "/Uploads/EnclosedFiles/" + fileone;
        }
        if (($scope.filetwo !== "" && $scope.filetwo !== null && $scope.filetwo !== undefined) && $scope.filetwo.length !== 0) {
            var name = new Date();
            var filetwo = "" + name.getFullYear() + name.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + name.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + name.getHours() + name.getMinutes() + name.getMilliseconds();
            var file = $scope.filetwo;
            filetwo = filetwo + "." + /[^.]+$/.exec(file[0].name);
            finacialSrv.uploadFileToUrl(file, filetwo);
            if (/[^.]+$/.exec(file.name) == "doc" || /[^.]+$/.exec(file.name) == "pdf")
                data.Citizenship = "/Uploads/PDF/" + filetwo;
            else
                data.Citizenship = "/Uploads/EnclosedFiles/" + filetwo;
        }
        if (($scope.filethree !== "" && $scope.filethree !== null && $scope.filethree !== undefined) && $scope.filethree.length !== 0) {
            var name = new Date();
            var filethree = "" + name.getFullYear() + name.getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + name.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + name.getHours() + name.getMinutes() + name.getMilliseconds();
            var file = $scope.filethree;
            filethree = filethree + "." + /[^.]+$/.exec(file[0].name);
            finacialSrv.uploadFileToUrl(file, filethree);
            if (/[^.]+$/.exec(file.name) == "doc" || /[^.]+$/.exec(file.name) == "pdf")
                data.RefCitizenship = "/Uploads/PDF/" + filetwo;
            else
                data.RefCitizenship = "/Uploads/EnclosedFiles/" + filethree;
        }

        finacialSrv.save(data).then(function (response) {
            if (response.data.ResponseCode == 0) {
                finacialSrv.saveStepTwo($scope.data);
                finacialSrv.hideLoading($ionicLoading);
                $state.go('complete')
            }
        });
    };
    $scope.formatCurrency = function (nStr) {
        if (nStr === undefined || nStr === "" || nStr.length == 0)
            return 0;
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    $scope.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
    $scope.myGoBack = function () {
        $state.go('stepone')
    };
});