// export function initDB() {
//     return new Promise((resolve, reject) => {
//        const request = indexedDB.open('myDatabase', 1);
   
//        request.onupgradeneeded = function(event) {
//          const db = event.target.result;
//          if (!db.objectStoreNames.contains('Characters')) {
//            db.createObjectStore('Characters', { keyPath: 'id', autoIncrement: true });
//          }
//          if (!db.objectStoreNames.contains('Genres')) {
//            db.createObjectStore('', { keyPath: 'id', autoIncrement: true });
//          }
//        };
   
//        request.onsuccess = function(event) {
//          resolve(event.target.result);
//        };
   
//        request.onerror = function(event) {
//          reject(event.target.error);
//        };
//     });
//    }
   