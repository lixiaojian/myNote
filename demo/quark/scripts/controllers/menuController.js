/**
 * Created by lixj(872458899@qq.com) on 15/6/22.
 */
;(function(app){
    app.controller('menuCtr',['$scope','menuService',function($scope,menuService){
        //获取菜单列表
        $scope.options = {
            'data-drag-enabled':false
        };
        $scope.collapsed = true;
        $scope.selectedItem = {};
        $scope.toggle = function(scope) {
            scope.toggle();
        };
        $scope.menuList = [];
        $scope.menuHandle = function(menu, permissions){
        	var menuRole = new Array();
        	for(var i=0; i<menu.length; i++){
        		if(menu[i].items.length > 0){
            		menu[i].items = $scope.menuHandle(menu[i].items, permissions);
            		if(menu[i].items.length > 0){
            			menuRole.push(menu[i]);
            		}
            	}else{
            		if(menu[i].menuCode){
                    	var hasRole = false;
                    		for(var j=0; j<permissions.length; j++){
                    			if(permissions[j] == menu[i].menuCode){
                    				hasRole = true;
                    				break;
                    			}
                    		}
                    		if(hasRole){
                				menuRole.push(menu[i]);
                			}
                    	}
            	}
        	}
        	return menuRole;
        	
        }
        menuService.getMenus({},function(data){
        	menuService.getPermissions({}, function(permissions){
        		data = $scope.menuHandle(data, permissions);
        		for(var i=0;i<data.length;i++){
                    $scope.menuList.push(data[i]);
                }
        	})
            
        });
    }]);
}(angular.module('backStage')));