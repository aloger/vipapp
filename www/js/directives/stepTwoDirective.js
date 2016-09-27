app.directive('checkResidentaddress', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('residentaddressrequired', false);
                } else {
                    ctrl.$setValidity('residentaddressrequired', true);
                }
                if (ngModelValue.length > 250) {
                    ctrl.$setValidity('residentaddresslength', false);
                } else {
                    ctrl.$setValidity('residentaddresslength', true);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})

app.directive('checkCurrentaddress', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('currentaddressrequired', false);
                } else {
                    ctrl.$setValidity('currentaddressrequired', true);
                }
                if (ngModelValue.length > 250) {
                    ctrl.$setValidity('currentaddresslength', false);
                } else {
                    ctrl.$setValidity('currentaddresslength', true);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})

app.directive('checkPhone', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('phonerequired', false);
                } else {
                    ctrl.$setValidity('phonerequired', true);
                }
                if (/(\+84|0)\d{9,10}/.test(ngModelValue)) {
                    ctrl.$setValidity('phonevalid', true);
                } else {
                    ctrl.$setValidity('phonevalid', false);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})
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
app.directive('checkEmail', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('emailrequired', false);
                } else {
                    ctrl.$setValidity('emailrequired', true);
                }
                if (/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i.test(ngModelValue)) {
                    ctrl.$setValidity('emailvalid', true);
                } else {
                    ctrl.$setValidity('emailvalid', false);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})

app.directive('checkNumberdepent', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length == 0 || /^[0-9]+$/i.test(ngModelValue)) {
                    ctrl.$setValidity('numberdepentvalid', true);
                } else {
                    ctrl.$setValidity('numberdepentvalid', false);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})

app.directive('checkSecrectquestion', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {

                if (ngModelValue.length === 0) {
                    ctrl.$setValidity('secrectquestionrequired', false);
                } else {
                    ctrl.$setValidity('secrectquestionrequired', true);
                }
                if (ngModelValue.length > 100) {
                    ctrl.$setValidity('secrectquestionlength', false);
                } else {
                    ctrl.$setValidity('secrectquestionlength', true);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
})

