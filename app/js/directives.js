'use strict';

/* Directives */
app.directive('isNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope) {
            scope.$watch('nlnumber', function (newValue, oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0)
                    return;
                if (arr.length === 1 && (arr[0] === '.'))
                    return;
                if (arr.length === 2)
                    return;
                if (isNaN(newValue)) {
                    scope.nlnumber = oldValue;
                }
            });
        }
    };
});

app.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});

app.directive('selectOnClick', function ($window) {
    var selectElement;

    if ($window.document.selection) {
      selectElement = function(element) {
        var range = $window.document.body.createTextRange();
        range.moveToElementText(element[0]);
        range.select();
      };
    } else if ($window.getSelection) {
      selectElement = function(element) {
        var range = $window.document.createRange();
        range.selectNode(element[0]);
        $window.getSelection().addRange(range);
      };
    }

    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(){
          selectElement(element);
        });
      }
    };
  });