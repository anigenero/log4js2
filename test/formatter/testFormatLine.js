const formatter = require('../../dist/es6/formatter');
const assert = require('assert');

describe('line', function () {

    it('%L', function () {

        let formatted = formatter.format('%L', { lineNumber : 20 });
        assert.equal(formatted, '20');

    });

    it('%line', function () {

        let formatted = formatter.format('%line', { lineNumber : 20 });
        assert.equal(formatted, '20');

    });

});