const request = window.indexedDB.open("Likes",1)

request.onerror = error => {
    console.log(error)
}

request.onsuccess = event => {
    const db = event.target.result
}