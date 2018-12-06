window.onload = function() {
  var map = L.map("map").setView([33.7, -83.4], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);

  $.ajax({
    url: "/api/art",
    type: "GET"
  }).then(function(data){
    var mapdata = data;
    console.log(mapdata);
    for (i = 0; i < mapdata.length; i++){
      L.marker([mapdata[i].latitude, mapdata[i].longitude])
        .addTo(map)
        .bindPopup("<h3>" + mapdata[i].name + "</h3");
    }
  });
};
