window.onload = function() {
  var map = L.map("map").setView([33.78, -84.35], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);

  $.ajax({
    url: "/api/art",
    type: "GET"
  }).then(function(data) {
    var mapdata = data;
    console.log(mapdata);
    for (i = 0; i < mapdata.length; i++) {
      L.marker([mapdata[i].latitude, mapdata[i].longitude])
        .addTo(map)
        .bindPopup(
          "<h5>" +
            mapdata[i].name +
            "</h5>" +
            "<h6>by " +
            mapdata[i].artist +
            "</h6><em>Posted by " +
            mapdata[i].User.username +
            "</em>"
        );
    }
  });
};
