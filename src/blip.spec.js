var assert = require('assert');
var blip = require('./blip');

describe('blip', function() {
  describe('Numbers', function() {
    it('small integer', function() {
      var num = 5;
      var b = blip(num);

      assert.equal(b.numberCount, 1);
      assert.equal(b.size, 4);
      assert.equal(b.formattedSize, '4 Bl');
    });

    it('large integer', function() {
      var num = 123456789;
      var b = blip(num);

      assert.equal(b.numberCount, 1);
      assert.equal(b.size, 4);
      assert.equal(b.formattedSize, '4 Bl');
    });


    it('float', function() {
      var num = 1.123456789;
      var b = blip(num);

      assert.equal(b.numberCount, 1);
      assert.equal(b.size, 8);
      assert.equal(b.formattedSize, '8 Bl');
    });
  });

  describe('Arrays', function() {
    it('array of numbers', function() {
      var arr = [1,2,3,4];
      var b = blip(arr);

      assert.equal(b.arrayCount, 1);
      assert.equal(b.numberCount, 4);
      assert.equal(b.size, 16);
      assert.equal(b.formattedSize, '16 Bl');
    });

    it('array of strings', function() {
      var arr = ['a', 'b', 'c'];
      var b = blip(arr);
      
      assert.equal(b.arrayCount, 1);
      assert.equal(b.stringCount, 3);
      assert.equal(b.size, 6);
      assert.equal(b.formattedSize, '6 Bl');
    });

    it('array of booleans', function() {
      var arr = [true, false, true];
      var b = blip(arr);
      
      assert.equal(b.arrayCount, 1);
      assert.equal(b.booleanCount, 3);
      assert.equal(b.size, 3);
      assert.equal(b.formattedSize, '3 Bl');
    });

    it('mixed array', function() {
      var arr = [1, 2, 'b', 4, true, false];
      var b = blip(arr);

      console.log(b);

      assert.equal(b.arrayCount, 1);
      assert.equal(b.numberCount, 3);
      assert.equal(b.stringCount, 1);
      assert.equal(b.booleanCount, 2);
      assert.equal(b.size, 16);
      assert.equal(b.formattedSize, '16 Bl');
    });
  });

  describe('Objects', function() {
    it('simple object', function() {
      var obj = {
        a: 1,
        b: 2
      };
      var b = blip(obj);

      assert.equal(b.objectCount, 1);
      assert.equal(b.numberCount, 2);
      assert.equal(b.stringCount, 2);
      assert.equal(b.numberSize, 8);
      assert.equal(b.stringSize, 4);
      assert.equal(b.size, 4 + 8);
      assert.equal(b.formattedSize, '12 Bl');
    });

  });
});