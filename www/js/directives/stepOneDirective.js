app.directive('checkCmnd', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if ((/(^(([a-zA-Z]?\d{8})|([a-zA-Z]{2}\d{7})|([a-zA-Z]{3}\d{6})|(\d{9})|(\d{12}))$)/.test(ngModelValue) && ngModelValue.length != 0)) {
                    ctrl.$setValidity('numberValidator', true);
                } else {
                    ctrl.$setValidity('numberValidator', false);
                }
                // if (ngModelValue.length === 9 || ngModelValue.length === 12) {
                //     ctrl.$setValidity('cmndValidator', true);
                // } else {
                //     ctrl.$setValidity('cmndValidator', false);
                // }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})


// app.directive('fileModel', ['$parse', 'finacialSrv', function ($parse, finacialSrv) {
//     return {
//         restrict: 'A',
//         link: function (scope, element) {
//             element.bind('change', function () {
//                 scope.$apply(function () {
//                     if (element[0].files != undefined) {
//                         finacialSrv.pushfile(element[0].files[0]);
//                     }
//                 });
//             });
//         }
//     };
// }]);
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files);
                });
            });
        }
    };
}]);

app.directive('checkLastname', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('lastnamerequired', false);
                } else {
                    ctrl.$setValidity('lastnamerequired', true);
                }
                if (ngModelValue.length > 50) {
                    ctrl.$setValidity('lastnamelength', false);
                } else {
                    ctrl.$setValidity('lastnamelength', true);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})

app.directive('checkFirstname', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('firstnamerequired', false);
                } else {
                    ctrl.$setValidity('firstnamerequired', true);
                }
                if (ngModelValue.length > 50) {
                    ctrl.$setValidity('firstnamelength', false);
                } else {
                    ctrl.$setValidity('firstnamelength', true);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})

app.directive('checkIdissuedby', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('idissuedbyrequired', false);
                } else {
                    ctrl.$setValidity('idissuedbyrequired', true);
                }
                if (ngModelValue.length > 200) {
                    ctrl.$setValidity('idissuedbylength', false);
                } else {
                    ctrl.$setValidity('idissuedbylength', true);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})

app.directive('checkSchool', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('schoolrequired', false);
                } else {
                    ctrl.$setValidity('schoolrequired', true);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})
app.directive('checkDOB', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('dobrequired', false);
                } else {
                    ctrl.$setValidity('dobrequired', true);
                }
                if (ngModelValue.val() >= new Date()) {
                    ctrl.$setValidity('doblessthantoday', false);
                } else {
                    ctrl.$setValidity('doblessthantoday', true);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})