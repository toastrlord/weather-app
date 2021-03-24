(()=>{"use strict";const t=async function(){try{const t=await fetch("api_key.txt");return`&appid=${await t.text()}`}catch(t){console.log(t)}}(),e=async function(){try{const t=await fetch("city.list.json",{mode:"cors"});return await t.json()}catch(t){console.log(t)}}(),n=async function(){try{const t=await fetch("country_codes.json");return await t.json()}catch(t){console.log(t)}}();const a={clear:"01d",clouds:"02d","scattered clouds":"03d","broken clouds":"04d","shower rain":"09d",rain:"10d",thunderstorm:"11d",snow:"13d",mist:"50d"};function c(t,e,n){return`${t} ${e}°${n}`}const o=document.querySelector("#submit-button"),r=document.querySelector("#city-name"),d=document.querySelector("#display"),s=document.querySelector("form");function i(){for(;d.firstChild;)d.firstChild.remove()}async function l(e){i();try{const n=await async function(e){try{const n=`https://api.openweathermap.org/data/2.5/onecall?lat=${e.coord.lat}&lon=${e.coord.lon}&exclude=minutely,hourly&units=imperial${await t}`,a=await fetch(n,{mode:"cors"});return(await a.json()).daily.map((t=>{return{weatherDescription:(e=t).weather[0].main,clouds:e.clouds,humidity:e.humidity,rain:e.rain,maxTemp:Math.round(parseFloat(e.temp.max)),minTemp:Math.round(parseFloat(e.temp.min))};var e}))}catch(t){console.log(t)}}(e),o=document.createElement("div");o.classList.add("flex-container"),n.forEach(((t,e)=>{const n=function(t,e){const n=document.createElement("div");n.classList.add("weather-data-display");const o=document.createElement("div");o.classList.add("weekday"),o.textContent=function(t){const e=(new Date).getDay();if(0===t)return"Today";switch((e+t)%7){case 0:return"Sunday";case 1:return"Monday";case 2:return"Tuesday";case 3:return"Wednesday";case 4:return"Thursday";case 5:return"Friday";case 6:return"Saturday"}}(e),n.appendChild(o);const r=document.createElement("img");r.src=function(t){if(a.hasOwnProperty(t))return`http://openweathermap.org/img/wn/${a[t]}@2x.png`;console.log(`No icon found for ${t}`)}(t.weatherDescription.toLowerCase()),n.appendChild(r);const d=document.createElement("div");d.textContent=t.weatherDescription,n.appendChild(d);const s=document.createElement("div");s.classList.add("temperature-container");const i=document.createElement("div");i.textContent=c("Hi:",t.maxTemp,"F"),i.classList.add("temperature"),s.appendChild(i);const l=document.createElement("div");return l.textContent=c("Lo:",t.minTemp,"F"),l.classList.add("temperature"),s.appendChild(l),n.appendChild(s),n}(t,e);o.appendChild(n)})),d.appendChild(o)}catch(t){console.log(t)}}o.addEventListener("click",(()=>{r.checkValidity()&&async function(t){i();const a=await async function(t){const a=t.toLowerCase().trim();try{const t=(await e).filter((t=>t.name.toLowerCase()===a)),c=await n;return(await t).map((t=>{const e=c[t.country];return{name:t.name,state:t.state,country:e,coord:t.coord}}))}catch(t){console.log(t)}}(t);if(0===a.length)!function(t){const e=document.createElement("div");e.classList.add("error-message"),e.textContent="No cities found!",d.appendChild(e)}();else if(1===a.length)l(a[0]);else{const t=document.createElement("div");t.classList.add("city-message"),t.textContent=`${a.length} cities found! Select one:`,d.appendChild(t);const e=document.createElement("div");e.classList.add("flex-container"),d.appendChild(e),a.forEach((t=>{const n=function(t){const e=document.createElement("div");e.classList.add("city-data-display");const n=document.createElement("div");if(n.textContent=t.name,e.appendChild(n),t.hasOwnProperty("state")){const n=document.createElement("div");n.textContent=t.state,e.appendChild(n)}if(t.hasOwnProperty("country")){const n=document.createElement("div");n.textContent=t.country,e.appendChild(n)}return e}(t);e.appendChild(n),n.addEventListener("click",(()=>{l(t)}))}))}}(r.value)})),s.addEventListener("keydown",(t=>{"Enter"===t.key&&o.click()}))})();