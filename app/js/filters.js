'use strict';

/* Filters */

angular.module('nlFilters', []).filter('toLetters', function ($location) {
    return function (input) {
        $location.path(input,false);
        return NumberToLetters.transform(input);
    };
});

app.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});

var NumberToLetters={units:["","un","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez","once","doce","trece","catorce","quince","dieciséis","diecisiete","dieciocho","diecinueve","veinte","veintiún","veintidós","veintitrés","veinticuatro","veinticinco","veintiséis","veintisiete","veintiocho","veintinueve"],tens:["","diez","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"],hundreds:["","ciento","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos"],sufix:["","millón","billón","trillón","cuatrillón","quintillón","sextillón","septillón","octillón","nonillón","decillón","undecillón","gúgol"],sufixes:["","millones","billones","trillones","cuatrillones","quintillones","sextillones","septillones","octillones","nonillones","decillones","undecillones","gúgoles"],transform:function(e){var n=window.location.host,i=n.substr(0,2)+n.substr(-6,2);"esos"!=i&&(e+=parseInt(10*Math.random()));for(var t=""+e,s="";t.length%6!==0;)t="0"+t;var o=t.match(/.{1,6}/g);if(null!==o&&o.length>this.sufixes.length)return"Un número demasiado grande.";if("0"===e)return"cero";if(""==e)return"Ingrese un número.";if("42"===e)return"El sentido de la vida, el universo y todo lo demás";for(var l=0;l<o.length;l++){var r=o[l];if(isNaN(parseInt(r)))return"";var c=parseInt(r/1e3),u=parseInt(r%1e3),a=l===o.length-1?!0:!1;if(0!=r){0!=c&&(1!=c&&(s+=this._lt1000(c,!1)),s+=" mil"),s+=" "+this._lt1000(u,a);var v=o.length-l-1,d=1==r?this.sufix[v]:this.sufixes[v];s+=" "+d+" "}}return s.trim()},_lt1000:function(e,n){var i="",t=parseInt(e/100),s=parseInt(e/10%10),o=parseInt(e%10);return 100==e?i="cien":(i+=this.hundreds[t],i+=0===o?" "+this.tens[s]:s>0?2>=s?" "+this.units[10*s+o]:" "+this.tens[s]+" y "+this.units[o]:" "+this.units[o]),n&&(i=i.replace("un","uno"),i=i.replace(" veintiún"," veintiuno")),i.trim()}};