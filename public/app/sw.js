/* EYEPEK service worker: caches the app shell so it opens fast and works offline. */
var CACHE="eyepek-v1";
var SHELL=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL)}));
  self.skipWaiting();
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}));
  }));
  self.clients.claim();
});
self.addEventListener("fetch",function(e){
  var r=e.request;
  if(r.method!=="GET")return;
  var u=new URL(r.url);
  if(u.origin!==location.origin)return;
  if(r.mode==="navigate"){
    e.respondWith(fetch(r).then(function(res){
      var copy=res.clone();caches.open(CACHE).then(function(c){c.put("./index.html",copy)});return res;
    }).catch(function(){return caches.match("./index.html")}));
    return;
  }
  e.respondWith(caches.match(r).then(function(hit){
    return hit||fetch(r).then(function(res){
      var copy=res.clone();caches.open(CACHE).then(function(c){c.put(r,copy)});return res;
    });
  }));
});
