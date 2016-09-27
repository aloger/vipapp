app.factory("finacialSrv", function ($http) {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */


    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $http.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
    var baseService = 'http://sscteacher.greentech.net.vn/api/App';

    var stepone = angular.fromJson(window.localStorage['stepone'] || '[]');
    function stepOnePersist() {
        window.localStorage['stepone'] = angular.toJson(stepone);
    }
    var steptwo = angular.fromJson(window.localStorage['steptwo'] || '[]');
    function stepTwoPersist() {
        window.localStorage['steptwo'] = angular.toJson(steptwo);
    }
    return {
        getPositions: function () {
            return $http.get(baseService + '/GetPositions');
        },
        getListSchools: function () {
            return $http.get(baseService + '/GetSchoolList');
        },
        getSchoolName: function (schoolId) {
            return $http.get(baseService + '/GetSchoolName?schoolId=' + schoolId);
        },
        getListProvinces: function () {
            return $http.get(baseService + '/GetProvinceList');
        },
        getDistrict: function (provinceId) {
            return $http.get(baseService + '/GetDistrictByProvince?provinceId=' + provinceId);
        },
        getPackage: function (officerId) {
            return $http.get(baseService + '/GetPackage?officerId=' + officerId);
        },
        // uploadImage: function (myFile) {
        //     upload({
        //         url: $http.post(baseService + '/UploadImage'),
        //         data: {
        //             aFile: myFile, // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
        //         }
        //     }).then(
        //         function (response) {
        //             console.log(response.data); // will output whatever you choose to return from the server on a successful upload
        //         },
        //         function (response) {
        //             console.error(response); //  Will return if status code is above 200 and lower than 300, same as $http
        //         }
        //         );
        // },
        getStepOne: function () {
            return stepone;
        },
        saveStepOne: function (stepOneData) {
            stepone.push(stepOneData);
            stepOnePersist();
        },
        clearDataStepOne: function () {
            if (stepone != null && stepone != undefined && stepone.length != 0) {
                stepone.splice(0, 1);
                stepOnePersist();
            }
        },
        getStepTwo: function () {
            return steptwo;
        },
        saveStepTwo: function (stepTwoData) {
            steptwo.push(stepTwoData);
            stepTwoPersist();
        },
        clearDataStepTwo: function () {
            if (steptwo != null && steptwo != undefined && steptwo.length != 0) {
                steptwo.splice(0, 1);
                stepTwoPersist();
            }
        },
        save: function (data) {
            return $http.post(baseService + '/Register/',
                { Data: data });
        },
        // save: function (data) {
        //     return $http.post(baseService + '/UploadImage',{Data:data}, {
        //         transformRequest: angular.identity
        //     })
        //         .success(function () {
        //         })
        //         .error(function () {
        //         });
        // },
        showLoading: function ($ionicLoading) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        },
        hideLoading: function ($ionicLoading) {
            $ionicLoading.hide();
        },
        uploadFileToUrl: function (file,name) {
            var uploadUrl = baseService + '/UploadImage';
            var data = new FormData();
            angular.forEach(file, function (value, key) {
                data.append(key, value);
            });
            data.append('name', name);
            $http.post(uploadUrl, data, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
                // .success(function () {
                    
                // })
                // .error(function () {
                // });
        },
        fileTransfer: function ($cordovaFileTransfer, filePath) {
            $cordovaFileTransfer.upload(baseService + '/UploadImage', filePath)
                .then(function (result) {
                    // Success!
                }, function (err) {
                    // Error
                }, function (progress) {
                    // constant progress updates
                });
        }
    }
});

