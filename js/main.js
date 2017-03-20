/**
 * Created by yhg97p on 2016/9/26.
 */
require.config({
    //baseUrl: 'js',
    paths: {
        'app': 'app',
        'angular': 'lib/angular.min',
        'router': 'lib/angular-ui-router',
        'oclazyload':'lib/oclazyload',
        'cookies': 'lib/angular-cookies',
        'jquery':'lib/jquery-3.1.0.min',

    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'jquery':{
            exports:'jquery'
        },
        'router': {
            deps: ['angular']
        },
        'app': {
            deps: ['router']
        }
    }
})
// 初始化myModule模块
require(['app'], function () {
    angular.bootstrap(document, ['qiyepeixun'])

})