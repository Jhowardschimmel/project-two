window.onload = function() {
  var map = L.map("map").setView([33.78, -84.35], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);

  map.on("click", function(event) {
    console.log(event.latlng);
  });

  $.ajax({
    url: "/api/art",
    type: "GET"
  }).then(function(data) {
    var mapdata = data;
    console.log(mapdata);
    for (let i = 0; i < mapdata.length; i++) {
      L.marker([mapdata[i].latitude, mapdata[i].longitude])
        .addTo(map)
        .bindPopup(
          "<p>id: " +
            mapdata[i].id +
            "</p><h5>" +
            mapdata[i].name +
            "</h5>" +
            "<h6>by " +
            mapdata[i].artist +
            "</h6><p>" +
            mapdata[i].description +
            "<p><br><em>Posted by " +
            mapdata[i].User.username +
            "</em>"
        )
        .on("click", function(e) {
          console.log(e, mapdata[i].id);
          $("#art-info").html(
            "<h1>" +
              mapdata[i].name +
              "</h1>" +
              "<h6>by " +
              mapdata[i].artist +
              "</h6><p>" +
              mapdata[i].description +
              "<p><br><em>Posted by " +
              mapdata[i].User.username +
              "</em>"
          );
        });
    }
  });
};
