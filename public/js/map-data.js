/* eslint-disable max-len */
window.onload = function () {
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
          "<h5>" +
            mapdata[i].name +
            "</h5><h6>by " +
            mapdata[i].artist +
            "</h6><em>Posted by " +
            mapdata[i].User.username +
            "</em>"
        )
        .on("click", function(e) {
          console.log(e, mapdata[i].id);
          $("#art-info").html(
            "<h2 id='artNameDisplay'>" +
              mapdata[i].name +
              "</h2><hr>" +
              mapdata[i].artist +
              "</h6><small class='float-sm-right'>" +
              mapdata[i].User.username +
              "</small><hr><strong>Description: </strong><p>" +
              mapdata[i].description +
              "</p>"
          );
        });
    }
  });

  $("#enter-add-view").click(function() {
    console.log("button clicked");
    $("#new-art-modal").html(`
      <div class='modal-dialog' role='document'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h1 class='modal-title' id='exampleModalLabel'>New Art Submission</h1>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
            <small id='artHelp' class='form-text text-muted'>Can be left blank, will be listed as 'Untitled'</small>
              <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                  <span class='input-group-text'>
                    <i class='far fa-palette'></i>
                  </span>
                </div>
                <input id='artName' type='text' class='form-control' placeholder='Art Name' aria-label='artName' aria-describedby='artName'>
              </div>
              <small id='artistHelp' class='form-text text-muted'>Can be left blank, will be listed as 'Unknown Artist'</small>
              <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                  <span class='input-group-text' id='artistName'>
                    <i class='far fa-signature'></i>
                  </span>
              </div>
            <input type='text' class='form-control' placeholder='Artist Name' aria-label='artistName' aria-describedby='artistName'>
          </div>

          <div class='input-group'>
            <div class='input-group-prepend'>
              <span class='input-group-text'>
                  <i class='far fa-pencil-paintbrush'></i>
              </span>
            </div>
              <textarea class='form-control' placeholder='Description' aria-label='With textarea' id="artDescription"></textarea>
            </div>
            <br>
            <div class='input-group mb-3'>
              <div class='custom-file'>
                <input type='file' class='custom-file-input' id='inputGroupFile02'>
               <label class='custom-file-label' for='inputGroupFile02' aria-describedby='inputGroupFileAddon02'>Add photos of Art</label>
              </div>
            </div>

            <div class='input-group mb-3'>
              <div class='input-group-prepend'>
                <label class='input-group-text' for='inputGroupSelect01'><i class='far fa-paint-brush'></i>
                </label>
              </div>
              <select class='custom-select' id='inputGroupSelect01'>
                  <option selected>Category</option>
                  <option value='1'>Graffiti</option>
                  <option value='2'>Sculpture</option>
                  <option value='3'>Painting</option>
              </select>
            </div>
            <small class='form-text text-muted'>
              <i class='fas fa-long-arrow-left'></i>
              Be sure to select the piece's location on the map
            </small>
          </div>
          <div class='modal-footer'>
           <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>
           <button type='button' class='btn btn-success' id='artNextButton1'>Next</button>
          </div>
        </div>
      </div>
    `);

    $("#new-art-modal").modal({
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    });

    $("#artNextButton").click(function() {
      var artName = $("#artName").val();
      var artistName = $("#artistName").val();
      var artDescription = $("#artDescription").val();

      console.log(artName + "by " + artistName + ". The category is " + artDescription);
    });
  });
};
