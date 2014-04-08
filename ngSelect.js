$( document ).ready(function() {
    $('html').on('click',function(e){
        var ngSelect=$(e.target).parents('div.ngSelect');
        if(ngSelect.length>0){
           !ngSelect.children('select').is(':disabled') && ngSelect.toggleClass('active');
        }
        $('div.ngSelect').not(ngSelect).removeClass('active');        
    });
    $('select.ngSelect').each(function(){    	
        var select=$(this),
        	el=select.get(0),
        	scope = angular.element(el).scope(),
        	model=select.data("ng-model") || select.attr("ng-model"),
        	wrapper=$("<div class='ngSelect'></div>"),
        	loadingString="Loading...",
        	ngSelected=$("<div>"+loadingString+"</div>"),
        	ngSelections=$("<ul></ul>");        
        scope.$watch(function () {
           return select.children('option').length;
        }, function() { 
        	ngSelections.html('');
            select.children('option').each(function(index,o){
                var option=$(o);
                if(option.text()==''){
                	ngSelected.text(loadingString);
                	return false;
                }
                index==0 && ngSelected.text(option.text());
                var ngOption=$("<li>"+option.text()+"</li>");
                ngOption.on('click', function(){
                    var selected=$(this);
                    ngSelected.text(selected.text());
                    scope.$apply(function(){
                        scope[model]=selected.text();
                    });
                });
                ngSelections.append(ngOption);
            });
            select.parent().append(ngSelections);
        });      
        select.hide().wrap(wrapper).parent().append(ngSelected); 
    });
});