$( document ).ready(function() {
    $('html').on('click',function(e){
        var ngSelect=$(e.target).parents('div.ngSelect');
        if(ngSelect.length>0){
           !ngSelect.children('select').is(':disabled') && ngSelect.find('ul ul').toggleClass('active');
        }
        $('div.ngSelect ul ul').not(ngSelect.find('ul ul')).removeClass('active');
        
    });
    $('select.ngSelect').each(function(){
        var select=$(this);
        var el=select.get(0);        
        var scope = angular.element(el).scope();
        var model=select.data("ng-model") || select.attr("ng-model");
        var wrapper=$("<div class='ngSelect'></div>");
        var ngSelect=$("<ul></ul>");        
        scope.$watch(function () {
           return select.children('option').length;
        }, function() {    
            var ngChoices=$("<li></li>");
            var ngSelection=$("<span></span>");
            var ngOptions=$("<ul></ul>");
            ngSelect.html('');
            select.children('option').each(function(index,o){
                var option=$(o);
                index==0 && ngSelection.text(option.text()) && ngChoices.append(ngSelection);
                var ngOption=$("<li>"+option.text()+"</li>");
                ngOption.on('click', function(){
                    var selected=$(this);
                    ngSelection.text(selected.text());
                    scope.$apply(function(){
                        scope[model]=selected.text();
                    });
                });
                ngOptions.append(ngOption)
            });
            ngSelect.append(ngChoices.append(ngOptions));
        });
        wrapper.css({
            height:select.outerHeight(),
            width:select.outerWidth()
        });
        select.hide();
        select.wrap(wrapper).parent().append(ngSelect); 
    });
});