define(['angular','router', 'oclazyload'],function() {
    var app = angular.module("qiyepeixun", ['ui.router', 'oc.lazyLoad']);
    //定义全局变量
    app.config(function($controllerProvider,$compileProvider,$filterProvider,$provide){
        app.register = {
            //得到$controllerProvider的引用
            controller : $controllerProvider.register,
            //同样的，这里也可以保存directive／filter／service的引用
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            service: $provide.service
        };
    })
    app.config(["$ocLazyLoadProvider",function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            loadedModules: ['qiyepeixun'],
            asyncLoader: require,
            'debug': true, // For debugging 'true/false'
            'events': true,
            modules:[{
                name:'bbb',
                files:['js/controller/login/bbb.js']
            }]
        })
    }])

    app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/index");
        $stateProvider
            .state('index', {
                url: "/index",
                templateUrl: "view/login/login.html",
                controller:"appCtrl",
                resolve: {
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                            return $ocLazyLoad.load('bbb').then(function () {
                                return $ocLazyLoad.load('js/controller/login/appCtrl.js');
                            })

                    }]
                }
            });
    }]);
    return app
})
