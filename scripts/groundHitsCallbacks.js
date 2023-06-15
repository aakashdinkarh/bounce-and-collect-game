function updateGroundHits(hits = 0){
    groundHitsCount.innerHTML = 'Ground Hits : ' + hits;
}

function resetGroundHits() {
    groundHits = 0;
    updateGroundHits(groundHits);
}
