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
    app.constant("Modules_Config",[
        {
            name:"ngTable",
            module:true,
            files:[
                "css/login.css"
            ]
        }
    ])
    app.config(['$ocLazyLoadProvider','$stateProvider','$urlRouterProvider',function($ocLazyLoadProvider,$stateProvider, $urlRouterProvider){
        $ocLazyLoadProvider.config({
            loadedModules: ['qiyepeixun'],
            jsLoader: require,
            modules:[ {
                name: 'aaa',
                module:true,
                files: ['css/login.css']
            }]
        })

        $urlRouterProvider.otherwise("/index");
        $stateProvider
            .state('index', {
                url: "/index",
                templateUrl: "view/login/login.html",
                controller:"appCtrl",
                resolve: {
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load("aaa").then(
                            function(){
                                return $ocLazyLoad.load('js/controller/login/appCtrl.js');
                            }
                        );
                    }]
                }
            });
    }]);
    return app
})
