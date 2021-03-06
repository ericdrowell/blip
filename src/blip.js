(function() {
  // utility for getting type
  var getType = function(a) {
    var toString,
        typeOf = typeof a;

    // objects
    if (typeOf === 'object') {
      toString = Object.prototype.toString.call(a);

      if (toString === '[object Object]') {
        return 'object';
      }
      else if (toString === '[object Array]') {
        return 'array';
      }
      else if (toString === '[object Null]') {
        return 'null';
      }
    }
    // primitives
    else {
      return typeOf;
    }
  };

  var blip = function(a) {      
    var processedObjects = [],
        // counts
        objectCount = 0,
        objectKeyCount = 0,
        arrayCount = 0,
        arrayElementCount = 0,
        stringCount = 0,
        numberCount = 0,
        booleanCount = 0,

        // sizes
        stringSize = 0,
        numberSize = 0,
        booleanSize = 0,
        totalSize = 0;

    function addKeys(keys) {
      var len = keys.length;

      keys.forEach(function(key) {
        addThing(key);
      });

      objectKeyCount += len;
    }

    function addThing(val) {
      var type = getType(val);

      if (type === 'array') {
        addArray(val);
      }
      else if (type === 'object') {
        addObject(val);
      }
      else if (type === 'string') {
        stringCount++;
        // string characters take up 2 bytes via UTF-16
        stringSize += 2 * val.length;
      }
      else if (type === 'number') {
        numberCount++;
        
        // if int
        // integers take up between 1 and 4 bytes
        if (val % 1 === 0) {
          numberSize += 4;
        }
        // if float
        // floats take up between 4 and 8 bytes
        else {
          numberSize += 8;
        }
      }
      else if (type === 'boolean') {
        booleanCount++;
        // technically 1 bit, but the smallest you can store this in would be 1 byte
        booleanSize += 1;
      }
    }

    function addObject(obj) {
      var keys, len, key, n, type, val;

      // only process if we have not yet analyzed this object
      if (obj && !obj.__blip) {
        keys = Object.keys(obj);
        len = keys.length;
        objectCount++;

        addKeys(keys);

        // add crumb so that we do not double count the same object by reference
        obj.__blip = true;
        processedObjects.push(obj);

        if (len > 0) {
          for (key in obj) {
            if (key !== '__blip') {
              addThing(obj[key]);
            }
          }
        }
      }
    }

    function addArray(arr) {
      var len, n, type, val;

      // only process if we have not yet analyzed this array
      if (arr && !arr.__blip) {
        len = arr.length;
        arrayCount++;

        // add crumb so that we do not double count the same object by reference
        arr.__blip = true;
        processedObjects.push(arr);

        if (len > 0) {
          arrayElementCount += len;

          for (n=0; n<len; n++) {
            addThing(arr[n]);
          }
        }
      }
    }

    function formatBytes(bytes, decimals) {
      if(bytes === 0) {
        return '0 Bl';
      }
       var k = 1024,
           dm = decimals || 1,
           sizes = ['Bl', 'KBl', 'MBl', 'GBl', 'TBl', 'PBl', 'EBl', 'ZBl', 'YBl'],
           i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // start traversing
    addThing(a);

    // cleanup
    processedObjects.forEach(function(obj) {
      delete obj.__blip;
    });

    totalSize = Math.ceil(stringSize + numberSize + booleanSize);

    return {
      // counts
      booleanCount: booleanCount,
      numberCount: numberCount,
      stringCount: stringCount,
      arrayCount: arrayCount,
      arrayElementCount: arrayElementCount,
      objectCount: objectCount,
      objectKeyCount: objectKeyCount,

      // sizes
      booleanSize: booleanSize,
      numberSize: numberSize,
      stringSize: stringSize,

      size: totalSize,
      formattedSize: formatBytes(totalSize)
    };
  };

  module.exports = blip;
})();