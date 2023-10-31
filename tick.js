/* CONSTANTES
*/      
const cMillisecondsPerSecond = 1000;
const cMillisecondsPerMinute = 60000;
const cMillisecondsPerHour   = 3600000;
const cMillisecondsPerDay    = 86400000;
const cSecondsPerMinute      = 60;
const cSecondsPerHour        = 3600;
const cSecondsPerDay         = 86400;
const cMinutesPerHour        = 60;
const cMinutesPerDay         = 1440;      
const cHoursPerDay           = 24;      

const teMillisecond = 0x00;
const teSecond      = 0x01;
const teMinute      = 0x02;
const teHour        = 0x04;
const teAllSplit    = 0xFE;      
const teAll         = 0xFF;

/* TICK RANDOMIZER 
*/      
class TTickRandomizer {
  constructor(){
    
  }
  
  static milliseconds(aMin, aMax)
  { 
    return Math.floor(Math.random() * (aMax - aMin +1)) + aMin; 
  }//end: milliseconds()
  
  static seconds(aMin, aMax)
  { 
    return this.randMilliseconds(aMin,aMax).value * cMillisecondsPerSecond; 
  }//end: seconds()
  
  static minutes(aMin, aMax)
  { 
    return this.randMilliseconds(aMin,aMax).value * cMillisecondsPerMinutes; 
  }//end: minutes()
  
  static hours(aMin, aMax)
  { 
    return this.randMilliseconds(aMin,aMax).value * cMillisecondsPerHours; 
  }// end: hours()
};//END: __TTickRand{}
    
/* TICK
*/      
class TTick {
  constructor(){
    this.startTime = 0;
    this.rand = new TTickRandomizer();
  }

  static now(/* nothing */)
  {
    return Math.round(performance.now());
  }// end: now()
  
  
  start(/* nothing or milliseconds int */)
  {
    let val = arguments.length === 0 ? TTick.now() : arguments[0];
    this.startTime = val;
    return this;
  }// end: start()
  
  left(/* nothing or milliseconds int */)
  {
    let val = arguments.length === 0 ? TTick.now() : arguments[0];
    return val - this.startTime;
  }// end: left()
  
  getAs(/* nothing return milliseconds or { element: teHour[, val: millisecond int] } */)
  {
    if(arguments.length === 0) return TTick.now();
    
    let aOptions = arguments[0];
    let options = {
      element : ('element' in aOptions) ? aOptions.element : teMillisecond,
      val : ('val' in aOptions) ? aOptions.val : TTick.now()
    };
    
    if(options.element == teHour)   return Math.round(options.val / cMillisecondsPerHour); 
    if(options.element == teMinute) return Math.round(options.val / cMillisecondsPerMinute); 
    if(options.element == teSecond) return Math.round(options.val / cMillisecondsPerSecond); 
    return this.now();
  }// end: getAs()
  
  getOnly(/* nothing return all elements splitted or { element: teHour[, val: millisecond int] } */)
  {
    if(arguments.length === 0) return this.getOnly({element: teAllSplit, val: TTick.now()});
    
    let aOptions = arguments[0];
    let options = {
      element : ('element' in aOptions) ? aOptions.element : teAllSplit,
      val : ('val' in aOptions) ? aOptions.val : TTick.now()
    };
    
    if(options.element == teHour)   return this.getAs({element: teHour,val: options.val}); 
    if(options.element == teMinute) return this.getAs({element: teMinute,val: options.val}) % cMinutesPerHour; 
    if(options.element == teSecond) return this.getAs({element: teSecond,val: options.val}) % cSecondsPerMinute; 
    if(options.element == teMillisecond) return this.getAs({element: teMillisecond,val: options.val}) % cMillisecondsPerSecond;
    
    return {
      h: this.getOnly({element: teHour, val: options.val}),
      m: this.getOnly({element: teMinute, val: options.val}),
      s: this.getOnly({element: teSecond, val: options.val}),
      z: this.getOnly({element: teMillisecond, val: options.val})
    };
  }// end: getOnly()

  toStr(/* nothing return full time h:mm:ss.zzz or {element: teAll[,val : millisecond int[, format: 'h:m:s.z']] }*/)
  {
    if(arguments.length === 0) return this.toStr({element: teAll, val: TTick.now()});
    
    let aOptions = arguments[0];
    let options = {
      element : ('element' in aOptions) ? aOptions.element : teAll,
      val : ('val' in aOptions) ? aOptions.val : TTick.now(),
      format: ('format' in aOptions) ? aOptions.format : 'h:m:s.z'
    };
    
    if(options.element == teAll){
      let s = this.toStr({element: teAllSplit, val: options.val});
      return options.format.replace('h', s.h).replace('m', s.m).replace('s', s.s).replace('z', s.z);
    }
    if(options.element == teAllSplit){
      let s = this.getOnly({element: teAllSplit, val: options.val});
      return {
        h : s.h.toString().padStart(2,'0'),
        m : s.m.toString().padStart(2,'0'),
        s : s.s.toString().padStart(2,'0'),
        z : s.z.toString().padStart(3,'0')
      };
    }
    if(options.element == teHour)         return this.getOnly(options).toString().startPad(2,'0');
    if(options.element == teMinute)       return this.getOnly(options).toString().startPad(2,'0');
    if(options.element == teSecond)       return this.getOnly(options).toString().startPad(2,'0');
    if(options.element == teMillisecond)  return this.getOnly(options).toString().startPad(3,'0');
    
    return this.getStr({element: teAll, val: TTick.now()});
  }// end: toStr()
}// end: TTick{}    

/* --------------------------------------------------------------------------------------- */      
function setText(aStr)
{
  let e = document.getElementById('content');
  e.innerHTML = aStr; 
}
   
var tick = new TTick();      
      
setInterval(()=>{
  setText( tick.toStr({element: teAll, format:'h:m:s.z'}) ); 
}, 250); 