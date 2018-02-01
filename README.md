# blip

blip is a JavaScript library that estimates memory usage of your webapp in blips.  

### What's a blip?

A blip is a new memory unit for the web.  

### What's wrong with bits and bytes?

Well, nothing, except that it's incredibly difficult to reliably measure a web application's size in bytes via a JavaScript API.  Ultimately, the unit of bytes is irrelevant.  What most developers want to understand is relative sizing.  i.e. what is the size of page A relative to page B?  Developers are also interested in understanding how much memory an application uses over time.  By measuring your application size in terms of blips, it's really easy to capture memory metrics for your app over time to identify run time memory leaks for your users.

### How big is a blip compared to a byte?

Blips are on the same order of magnitude as a byte.  In fact, the blip library tries its best to estimate every part of a data structure in terms of pure bytes, irrespective of how browsers actually store the data structures.  Thus, the blip size will be somewhat close to the actual byte size in memory.  

### What's the blip notation?

```
1Bl = 1 blip
2kBl = 2 kilo blips
3MBl = 3 mega blips
4GBl = 4 giga blips
```

### API

```
var obj = {
  foo: 1,
  bar: [1, 2]
};

var size = blip(obj).size;
```

### All Properties

```
{
  numberCount: 3,
  stringCount: 2,
  booleanCount: 0,
  arrayCount: 1,
  arrayElementCount: 2,
  objectCount: 1,
  objectKeyCount: 2,

  booleanSize: 0,
  numberSize: 12,
  stringSize: 12,

  size: 24,
  formattedSize: "24 Bl"
}
```

### Build

```
gulp
```

### Tests

```
npm run test
```
