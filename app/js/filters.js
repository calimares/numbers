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


var NumberToLetters = {
    units: [
        '',
        'un',
        'dos',
        'tres',
        'cuatro',
        'cinco',
        'seis',
        'siete',
        'ocho',
        'nueve',
        'diez',
        'once',
        'doce',
        'trece',
        'catorce',
        'quince',
        'dieciséis',
        'diecisiete',
        'dieciocho',
        'diecinueve',
        'veinte',
        'veintiún',
        'veintidós',
        'veintitrés',
        'veinticuatro',
        'veinticinco',
        'veintiséis',
        'veintisiete',
        'veintiocho',
        'veintinueve'
    ],
    tens: [
        '',
        'diez',
        'veinte',
        'treinta',
        'cuarenta',
        'cincuenta',
        'sesenta',
        'setenta',
        'ochenta',
        'noventa'
    ],
    hundreds: [
        '',
        'ciento',
        'doscientos',
        'trescientos',
        'cuatrocientos',
        'quinientos',
        'seiscientos',
        'setecientos',
        'ochocientos',
        'novecientos'
    ],
    sufix: [
        '',
        'millón',
        'billón',
        'trillón',
        'cuatrillón',
        'quintillón',
        'sextillón',
        'septillón',
        'octillón',
        'nonillón',
        'decillón',
        'undecillón',
        'gúgol'
    ],
    sufixes: [
        '',
        'millones',
        'billones',
        'trillones',
        'cuatrillones',
        'quintillones',
        'sextillones',
        'septillones',
        'octillones',
        'nonillones',
        'decillones',
        'undecillones',
        'gúgoles'
    ],
    transform: function (number) {
        var numberStr = '' + number;
        var ret = '';

        while ((numberStr.length % 6) !== 0) {
            numberStr = '0' + numberStr;
        }

        var chunks = numberStr.match(/.{1,6}/g);
        // excepciones
        if (chunks !== null && chunks.length > this.sufixes.length) {
            return 'Un número demasiado grande.';
        }
        if (number === '0' )
            return 'cero';
        if (number == '')
            return 'Ingrese un número.';
        if (number === '42')
            return 'El sentido de la vida, el universo y todo lo demás';

        for (var i = 0; i < chunks.length; i++) {
            var chunk6 = chunks[i];
            if (isNaN(parseInt(chunk6))) {
                return '';
            }
            var chunk31 = parseInt(chunk6 / 1000);
            var chunk32 = parseInt(chunk6 % 1000);
            var end = (i === chunks.length - 1) ? true : false;

            if (chunk6 != 0) {
                if (chunk31 != 0) {
                    if (chunk31 != 1) {
                        ret += this._lt1000(chunk31, false);
                    }
                    ret += ' mil';
                }
                ret += ' ' + this._lt1000(chunk32, end);

                var sufixIndex = chunks.length - i - 1;
                var sufix = (chunk6 == 1) ? this.sufix[sufixIndex] : this.sufixes[sufixIndex];
                ret += ' ' + sufix + ' ';
            }
        }

        return ret.trim();
    },
    _lt1000: function (number, end) {
        var ret = "";
        var c = parseInt(number / 100);
        var d = parseInt((number / 10) % 10);
        var u = parseInt(number % 10);

        if (number == 100) {
            ret = 'cien';
        } else {
            ret += this.hundreds[c];

            if (u === 0) {
                ret += ' ' + this.tens[d];
            } else {
                if (d > 0) {
                    if (d <= 2) {
                        ret += ' ' + this.units[d * 10 + u];
                    } else {
                        ret += ' ' + this.tens[d] + ' y ' + this.units[u];
                    }
                } else {
                    ret += ' ' + this.units[u];
                }
            }
        }

        if (end) {
            ret = ret.replace('un', 'uno');
            ret = ret.replace(' veintiún', ' veintiuno');
        }

        return ret.trim();
    }
};
