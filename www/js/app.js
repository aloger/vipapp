
var app = angular.module('myproject', ['ionic', 'ion-datetime-picker', 'ion-autocomplete', 'ngMessages','ngCordova']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('stepone', {
    url: '/stepone',
    templateUrl: 'templates/stepone.html',
  });
  $stateProvider.state('steptwo', {
    url: '/steptwo',
    templateUrl: 'templates/steptwo.html',
  });
  $stateProvider.state('complete', {
    url: '/complete',
    templateUrl: 'templates/complete.html',
  });
  $urlRouterProvider.otherwise('/stepone')
});

app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
app.run(function ($ionicPickerI18n) {
  $ionicPickerI18n.weekdays = ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"];
  $ionicPickerI18n.months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 0", "Tháng 11", "Tháng 12"];
  $ionicPickerI18n.ok = "Chọn";
  $ionicPickerI18n.cancel = "Hủy";
  $ionicPickerI18n.title = "Chọn ngày";
});