/* CONSTANTS
*/
const cDayPerWeek            = 7;
const cMonthsPerYear         = 12;

const cHoursPerDay            = 24;
const cHoursPerWeek           = 168;

const cMinutesPerHour         = 60;
const cMinutesPerDay          = 1440;
const cMinutesPerWeek          = 10080;

const cSecondsPerMinute       = 60;
const cSecondsPerHour         = 3600;
const cSecondsPerDay          = 86400;
const cSecondsPerWeek         = 604800;

const cMillisecondsPerSecond  = 1000;
const cMillisecondsPerMinute  = 60000;
const cMillisecondsPerHour    = 3600000;
const cMillisecondsPerDay     = 86400000;
const cMillisecondsPerWeek    = 604800000;

const cMinTime               = 0; 
const cMaxTime               = 86399;

const teMillisecond = 0x00;
const teSecond      = 0x01;
const teMinute      = 0x02;
const teHour        = 0x04;
const teAllSplit    = 0xFE;      
const teAll         = 0xFF;


/*
*/
Function.prototype.method = function(aName, aFunc){ 
   if (!this.prototype[aName]) { 
      this.prototype[aName] = aFunc; 
      return this; 
   }   
}; 

/* RAZ()
   set time to 00:00:00.000
   no arguments
   return : current date objet
*/
Date.method('Reset', function(){ 
  this.setHours(0,0,0,0); 
  return this; 
});

/* setTimeMs( aMilliseconds=0 )
  set time from milliseconds
  aMilliseconds : integer, default 0
  return : current date objet
*/
Date.method('setTimeMs', function(aMilliseconds=0){ 
  this.Reset().setMilliseconds(aMilliseconds); 
  return this; 
});
  
/* nowMs()
   return current time in milliseconds (limited to 24h)
   no arguments
   return : time in milliseconds
*/
Date.method('nowMs', function(){ 
  let t = this.getSplitedTime(); 
  return t.z + (t.s*cMillisecondsInSecond) + (t.m*cMillisecondsInMinute) + (t.h*cMillisecondsInHour); 
});

/* getHoursStr, getMinutesStr, getSecondsStr, getMillisecondsStr( aPad = true )
   return time element in string padded (01) or not (1)
   aPad : bool, true enable zero padding, false no zero padding, default true
   return : string
*/
Date.method('getHoursStr', function(aPad=true){ 
   return aPad ? this.getHours().toString().padStart(2,'0') : this.getHours().toString(); 
});
Date.method('getMinutesStr', function(aPad=true){ 
   return aPad ? this.getMinutes().toString().padStart(2,'0') : this.getMinutes().toString(); 
});
Date.method('getSecondsStr', function(aPad=true){ 
   return aPad ? this.getSeconds().toString().padStart(2,'0') : this.getSeconds().toString(); 
});
Date.method('getMillisecondsStr', function(aPad=true){ 
   return aPad ? this.getMilliseconds().toString().padStart(3,'0') : this.getMilliseconds().toString(); 
});

/* getSplittedTime( aString = false, aPad = true )
   return an object with splitted time elements in numeric format or string format padded or not
   aString : bool, true return strings, false return integer, default false
   aPag : bool, for aString=true, true return padded zero string, false return not padded zero string
   return : object { 
     h (hours) 
     m (minutes)
     s (seconds)
     z (milliseconds)
   }
*/
Date.method('getSplitedTime', function(aString=false, aPad=true){
  return {
    h: aString ? this.getHoursStr(aPad) : this.getHours(),
    m: aString ? this.getMinutesStr(aPad) : this.getMinutes(),
    s: aString ? this.getSecondsStr(aPad) : this.getSeconds(),
    z: aString ? this.getMillisecondsStr(aPad) : this.getMilliseconds()
  }; 
});

/*
*/
Date.method('getHoursInMinutes',        function(){ return this.getHours() * cMinutesPerHour; });
Date.method('getHoursInSeconds',        function(){ return this.getHours() * cSecondsPerHour; });
Date.method('getHoursInMilliseconds',   function(){ return this.getHours() * cMillisecondsPerHour; });

Date.method('getMinutesInSeconds',      function(){ return this.getMinutes() * cSecondsPerMinute; });
Date.method('getMinutesInMilliseconds', function(){ return this.getMinutes() * cMillisecondsPerMinute; });

Date.method('getSecondsInMilliseconds', function(){ return this.getSeconds() * cMillisecondsPerSecond; });

Date.method('getTimeInMinutes',         function(){ return this.getHoursInMinutes() + this.getMinutes(); });
Date.method('getTimeInSeconds',         function(){ return this.getHoursInSeconds() + this.getMinutesInSeconds() + this.getSeconds(); });

