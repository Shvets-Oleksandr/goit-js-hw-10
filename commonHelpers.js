import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as h,i as f}from"./assets/vendor-77e16229.js";const s=document.querySelector("#datetime-picker"),e=document.querySelector("button[data-start]"),y=document.querySelector("[data-days]"),S=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),E=document.querySelector("[data-seconds]");let a="";e.disabled=!0;h(s,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const n=new Date;t[0]<n?(f.error({position:"topRight",title:"Error",message:"Please choose a date in the future"}),e.disabled=!0):(a=t[0],e.disabled=!1,console.log(a))}});const C=()=>{e.disabled=!0,s.disabled=!0;const t=setInterval(()=>{const n=Date.now(),r=a.getTime()-n;if(r<=0){clearInterval(t),s.disabled=!1,u({days:"00",hours:"00",minutes:"00",seconds:"00"});return}const d=b(r);u(d)},1e3)};e.addEventListener("click",C);function b(t){const c=o(Math.floor(t/864e5)),i=o(Math.floor(t%864e5/36e5)),l=o(Math.floor(t%864e5%36e5/6e4)),m=o(Math.floor(t%864e5%36e5%6e4/1e3));return{days:c,hours:i,minutes:l,seconds:m}}function o(t){return String(t).padStart(2,"0")}function u(t){y.textContent=t.days,S.textContent=t.hours,p.textContent=t.minutes,E.textContent=t.seconds}
//# sourceMappingURL=commonHelpers.js.map
