"use strict";var precacheConfig=[["/cloud-music/index.html","9996e9769d7ad656913a84ac3a173801"],["/cloud-music/static/css/main.6036954d.css","f62e1b11890d6b7e09f981d70aa53dfc"],["/cloud-music/static/js/main.c0defe47.js","bed515b2aee94f651f34e65cdf14fed3"],["/cloud-music/static/media/a20.9.1aa927ec.png","1aa927ec4be7cc4b07b4768a82234ed7"],["/cloud-music/static/media/acg.8dc9dbba.png","8dc9dbba7b61e3fcdb56001912a76348"],["/cloud-music/static/media/ae2.f8ee94d3.png","f8ee94d366e68fc3a3e2463d640b5201"],["/cloud-music/static/media/aea.c496a4f0.png","c496a4f09de484b35494a60640f9d917"],["/cloud-music/static/media/aixintao.43416e57.jpg","43416e57c5421e683763572f474ed561"],["/cloud-music/static/media/album_default.60465e38.png","60465e3840ade4c3835799ba11076a10"],["/cloud-music/static/media/bt_girl.28635978.jpg","28635978f49a2b4d1c62dc667f7adb8f"],["/cloud-music/static/media/comm_hear.140af774.png","140af774f92ae0bc655f0984a9e11859"],["/cloud-music/static/media/empty.b921eb38.bin","b921eb388e8a979b51b5d92ac2e8393c"],["/cloud-music/static/media/ww.46ec2d97.jpg","46ec2d978c31d238603d86b9cd1833d2"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var c=new URL(e);return a&&c.pathname.match(a)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),c=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var c="/cloud-music/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});