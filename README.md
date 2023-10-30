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
```
Ms = z + ( s * 1000 ) + ( m * 60000 ) + ( h * 3600000 );
```

### splitted time to Seconds formula
```
S = s + ( m * 60 ) + ( h * 3600 );
```
```
S = Math.round( 0.001 * z ) + s + ( m * 60 ) + ( h * 3600 );
```

### splitted time to Minutes formula
```
M = m + ( h * 60 );
```
```
M = Math.round( 0.01 * ( Math.round( 0.001 * z ) + s ) ) + m + ( h * 60 );
```

---

### Raz() : [date object]
```js
let d = new Date();

let spt = d.RAZ().setTimeMs(4506).getSplittedTime();

console.log(spt);

/* spt output
{ h: 0, m: 0, s: 4, z: 506 }
*/
```

### setTimeMs( milliseconds integer [0*]) : [date object]
```
```

### nowMs() : milliseconds integer
```
```

### getHoursStr( lead zero [true*, false]) : string
```
```

### getMinutesStr( lead zero [true*, false]) : string
```
```

### getSecondsStr( lead zero [true*, false]) : string
```
```

### getMillisecondsStr( lead zero [true*, false]) : string
```
```

### getSplittedTime( as string or numeric [true, false*], string lead zero [true*, false] ) : [object {h,m,s,z}]
```
```
