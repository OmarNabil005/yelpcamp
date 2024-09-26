maptilersdk.config.apiKey = maptilerApiKey;
const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element to render the map
    style: "https://api.maptiler.com/maps/landscape/style.json?key=" + maptilerApiKey, // Proper style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 14, // starting zoom
});

new maptilersdk.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)