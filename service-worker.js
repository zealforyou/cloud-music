"use strict";var precacheConfig=[["/cloud-music/index.html","e175d921746235bb5738549b564ae5ce"],["/cloud-music/static/css/main.40b99d30.css","04002e91e328ac07220f187fe1f3e163"],["/cloud-music/static/js/main.9c9f3881.js","c398e08254f5d5a0eeafcff75e593a87"],["/cloud-music/static/media/a20.9.1aa927ec.png","1aa927ec4be7cc4b07b4768a82234ed7"],["/cloud-music/static/media/acg.8dc9dbba.png","8dc9dbba7b61e3fcdb56001912a76348"],["/cloud-music/static/media/ae2.f8ee94d3.png","f8ee94d366e68fc3a3e2463d640b5201"],["/cloud-music/static/media/aea.c496a4f0.png","c496a4f09de484b35494a60640f9d917"],["/cloud-music/static/media/ff1.be022a7b.jpg","be022a7bb144858d3631a9f60892a9d2"],["/cloud-music/static/media/ff2.39ca8e9a.jpg","39ca8e9a0ef5141b94cf5d9935f3ed6d"],["/cloud-music/static/media/ff3.0a5aacd7.jpg","0a5aacd7f9141a3ec97bede5ba98fdf7"],["/cloud-music/static/media/iloveyou.720ab716.bin","720ab716d9a340fbebdfa1438179beb5"],["/cloud-music/static/media/psb.da3de548.png","da3de5483476e8e26a4fd1f0555fb9d4"],["/cloud-music/static/media/ww.46ec2d97.jpg","46ec2d978c31d238603d86b9cd1833d2"],["/cloud-music/static/media/偏偏喜欢你.6a73ddc8.bin","6a73ddc8403da1555bb4dbb2cc23a4cf"],["/cloud-music/static/media/全部都是你.db9b4c71.bin","db9b4c71bdc4da07430ba6c3b0edea65"],["/cloud-music/static/media/刚好遇见你.eed23658.bin","eed236589ecaba35722834f486c5c310"],["/cloud-music/static/media/小芳.ba26bcf0.bin","ba26bcf063d219a81ef054427f0304e1"],["/cloud-music/static/media/想把我唱给你听.cb9a18b1.bin","cb9a18b1b4a03050e8d3db8405964ada"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="/cloud-music/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});