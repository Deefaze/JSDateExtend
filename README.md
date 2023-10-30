# JS Date Extend
Simple extention of Date object for Javascript

add functions tools for "new Date()"

---

## Memo values :

### Z
- milliseconds in second = 1000
- milliseconds in minute = 60 000
- milliseconds in hour = 3 600 000
- milliseconds in 24h  = 86 400 000

### S
- seconds in minute = 60
- seconds in hour = 3 600
- seconds in 24h = 86 400
- 
### M
- minutes in hour = 60
- minutes in 24h = 3 600

### H
- hour in 24h = :)

### splitted time to Milliseconds formula
```js
Ms = z + ( s * 1000 ) + ( m * 60000 ) + ( h * 3600000 );
```

### splitted time to Seconds formula
```js
S = s + ( m * 60 ) + ( h * 3600 );
```
```js
S = Math.round( 0.001 * z ) + s + ( m * 60 ) + ( h * 3600 );
```

### splitted time to Minutes formula
```js
M = m + ( h * 60 );
```
```js
M = Math.round( 0.01 * ( Math.round( 0.001 * z ) + s ) ) + m + ( h * 60 );
```

---
### Constants
- cHoursInDay
- cMinutesInHour
- cMinutesInDay
- cSecondsInMinute
- cSecondsInHour
- cSecondsInDay
- cMillisecondsInSecond
- cMillisecondsInMinute
- cMillisecondsInHour
- cMillisecondsInDay
- cMinTime
- cMaxTime


### Reset() : [date object]
ensure time set to 0 hours 0 minutes 0 seconds 0 milliseconds
```js
let d = new Date();

d.Reset();
d.setHours(3);
d.setMilliseconds(4506);

console.log(d.getSplittedTime());
// output : { h: 3, m: 0, s: 4, z: 506 }
```

### setTimeMs( milliseconds integer [0*]) : [date object]
```js
let d = new Date();

console.log( d.setTimeMs(4506).getSplittedTime() );
// output : { h: 0, m: 0, s: 4, z: 506 }
```

### nowMs() : milliseconds integer
```js
let d = new Date();
// exemple : 14h 42m 56s 012z

console.log( d.nowMs() );
// ouput : 52946012
```

### getHoursStr( lead zero [true*, false]) : string
```js
let d = new Date();
// exemple 4h 2m 6s 12z

console.log( d.getHoursStr() );
// output : 04

console.log( d.getHoursStr(false) );
// output : 4
```

### getMinutesStr( lead zero [true*, false]) : string
```js
let d = new Date();
// exemple 4h 2m 6s 12z

console.log( d.getMinutesStr() );
// output : 02

console.log( d.getMinutesStr(false) );
// output : 2
```

### getSecondsStr( lead zero [true*, false]) : string
```js
let d = new Date();
// exemple 4h 2m 6s 12z

console.log( d.getSecondssStr() );
// output : 06

console.log( d.getSecondsStr(false) );
// output : 6
```

### getMillisecondsStr( lead zero [true*, false]) : string
```js
let d = new Date();
// exemple 4h 2m 6s 12z

console.log( d.getMillisecondsStr() );
// output : 012

console.log( d.getMillisecondsStr(false) );
// output : 12
```

### getSplittedTime( as string or numeric [true, false*], string lead zero [true*, false] ) : [object {h,m,s,z}]
```js
let d = new Date();
// exemple 4h 2m 6s 12z

let dNum   = d.getSplittedTime()
console.log( dNum );
// output : { h: 4, m: 2, s: 6, z: 12 }

let dStr   = d.getSplittedTime(true);
console.log( dNum );
// output : { h: '04', m: '02', s: '06', z: '012' }

let dStrNP = d.getSplittedTime(true, false);
console.log( dNum );
// output : { h: '4', m: '2', s: '6', z: '12' }
```

### getXXXinXXX()
- #### getHoursInMinutes()
- #### getHoursInSeconds()
- #### getHoursInMilliseconds()
- #### getMinutesInSeconds()
- #### getMinutesInMilliseconds()
- #### getSecondsInMilliseconds()
- #### getTimeInMinutes()
- #### getTimeInSeconds()

