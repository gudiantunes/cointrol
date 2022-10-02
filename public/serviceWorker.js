const CACHE_NAME = 'version-1';
const urlstoCache = ['index.html'];
const self = this;
// install sw
self.addEventListener('install', (e)=>{
    e.waitUntil(caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log('open cache')
            return cache.addAll(urlstoCache);
        }))
})

// listen for requests
self.addEventListener('fetch', (e)=>{
    e.respondWith(
        caches.match(e.request)
        .then(() => {
            return fetch(e.request)
            .catch(()=> caches.match('index.html'))
        })
    )
})

// activate sw
self.addEventListener('activate', (e)=>{
    const cachWhiteList = [];
    cachWhiteList.push(CACHE_NAME);
    e.waitUntil(caches.keys()
        .then((cacheNames)=>Promise.all(
            cacheNames.map((name)=>{
                if (!cachWhiteList.includes(name)) {
                    return caches.delete(name)
                }
            })
            )
        )
    )
})