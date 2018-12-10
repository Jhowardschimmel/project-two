/* eslint-disable max-len */
window.onload = function() {
  var map = L.map("map").locate({setView: true, maxZoom: 16});

  //With OpenStreets Base Map

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);

  //With Sat Base Map

  // mapLink = "<a href='http://www.esri.com/'>Esri</a>";
  // wholink =
  //   "i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";

  // L.tileLayer(
  //   "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  //   {
  //     attribution: `&copy; ${mapLink}, ${wholink}`
  //   }
  // ).addTo(map);

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
          `<h5>${mapdata[i].name}</h5>
          <h6>by ${mapdata[i].artist}</h6>
          <em>Posted by ${mapdata[i].User.username}</em>`
        )
        .on("click", function(e) {
          var imageHTML;
          console.log(mapdata[i].imageURL);
          switch (mapdata[i].imageURL) {
            case undefined:
              imageHTML = `
                <button class='image-add-button'>
                  <img class='card-img-top' src='${mapdata[i].imageURL}' alt='Card image cap'>
                </button>`;
              break;

            default:
              imageHTML = `<img class='card-img-top' src='https://images.pexels.com/photos/935785/pexels-photo-935785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='Card image cap'>`;
          }

          console.log(e, mapdata[i].id);
          $("#art-info").html(
            `${imageHTML}
              <hr>
              <h2 id='artNameDisplay'>${mapdata[i].name}</h2>
              <hr>
              <h6>${mapdata[i].artist}</h6>
              <hr>
              <strong>Description: </strong>
              <p>${mapdata[i].description}</p>
              <small class='float-sm-right'>Posted by ${mapdata[i].User.username}</small>`
          );

          //ImageURL update

          $(".image-add-button").click(function() {
            console.log("image add button clicked");
            $("#image-add-modal").html(`
              <div class='modal-dialog' role='document'>
                <div class='modal-content p-3'>
                  <div class='modal-header'>
                    <h1 class='modal-title' id='exampleModalLabel'>Add URL to Art Image</h1>
                    <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div class='input-group mb-3'>
                      <div class='input-group-prepend'>
                        <span class='input-group-text'>
                          <i class='fas fa-image'></i>
                        </span>
                      </div>
                      <input id='imageURL' type='text' class='form-control' placeholder='Image URL' aria-label='artName' aria-describedby='artName'>
                  </div>
                </div>
              </div>
            `);

            $("#image-add-modal").modal({
              backdrop: true,
              keyboard: true,
              focus: true,
              show: true
            });
          });
        });
    }
  });

  $("#enter-add-view").click(function() {
    console.log("button clicked");

    var selectLoc;
    var artName;
    var artistName;
    var artDescription;
    var imageUrl;

    // Art location input
    $("#new-art-modal").html(`
      <div class='modal-dialog' role='document'>
        <div class='modal-content p-3'>
          <div class='modal-header'>
            <h1 class='modal-title' id='exampleModalLabel'>New Art Submission</h1>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
          <h4>Where is the art located?</h4>
           <div id='newPostMap'></div>
          </div>
          <div class='modal-footer'>
           <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>
           <button type='button' class='btn btn-success' id='artNextButton1'>Next</button>
          </div>
        </div>
      </div>
    `);

    var newPostMap = L.map("newPostMap").locate({setView: true, maxZoom: 16});

    // L.tileLayer(
    //   "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    //   {
    //     attribution: `&copy; ${mapLink}, ${wholink}`
    //   }
    // ).addTo(newPostMap);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    }).addTo(newPostMap);

    newPostMap.on("click", function(event) {
      selectLoc = event.latlng;
      console.log(selectLoc);
      L.marker(selectLoc).addTo(newPostMap);
    });

    $("#artNextButton1").click(function() {
      // Art info input form
      $(".modal-content").html(`
        <div class='modal-header'>
          <h1 class='modal-title' id='exampleModalLabel'>New Art Submission</h1>
          <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        
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
                <span class='input-group-text'>
                  <i class='far fa-signature'></i>
                </span>
            </div>
          <input type='text' class='form-control' id='artistName' placeholder='Artist Name' aria-label='artistName' aria-describedby='artistName'>
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
              <div class='input-group-prepend'>
                <span class='input-group-text'>
                  <i class='fas fa-image'></i>
                </span>
              </div>
              <input id='imageURL' type='text' class='form-control' placeholder='Image URL' aria-label='artName' aria-describedby='artName'>
          </div>

          <div class='input-group mb-3'>
            <div class='input-group-prepend'>
              <label class='input-group-text' for='categorySelect'><i class='far fa-paint-brush'></i>
              </label>
            </div>
            <select class='custom-select' id='categorySelect'>
                <option selected>Category</option>
                <option value='Graffiti'>Graffiti</option>
                <option value='Sculpture'>Sculpture</option>
                <option value='Painting'>Painting</option>
            </select>
          </div>
        </div>
        <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>
        <button type='button' class='btn btn-success' id='submit-new-art'>Submit</button>
        </div>
      `);

      $("#submit-new-art").click(function() {
        artName = $("#artName").val();
        artistName = $("#artistName").val();
        artDescription = $("#artDescription").val();
        artCategory = $("#categorySelect option:selected").val();
        imageUrl = $("#imageURL").val();
        console.log(selectLoc);

        console.log(
          `${artName}, a piece of ${artCategory}, by ${artistName}. The description is ${artDescription}. The image URL is ${imageUrl}.`
        );

        $.ajax({
          url: "/api/art",
          type: "POST",
          data: {
            name: artName,
            artist: artistName,
            category: artCategory,
            description: artDescription,
            latitude: selectLoc.lat,
            longitude: selectLoc.lng
          }
        }).then(function() {
          console.log("Art posted!");
          window.location.reload();
        });
      });
    });

    $("#new-art-modal").modal({
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    });
  });

  $("#loginButton").click(function() {
    console.log("button clicked");
    $("#login-modal").html(`
      <div class='modal-dialog' role='document'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h1 class='modal-title' id='exampleModalLabel'>Sign In</h1>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
            <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                    <span class='input-group-text'><i class='fas fa-envelope'></i></span>
                </div>
                <input type='text' id='new-user-email' class='form-control' placeholder='Username' aria-label='Username' aria-describedby='basic-addon1'>
            </div>
            <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                    <span class='input-group-text'><i class='fas fa-user'></i></span>
                </div>
                <input type='text' id='new-username' class='form-control' placeholder='Username' aria-label='Username' aria-describedby='basic-addon1'>
            </div>
            <div class='modal-footer'>
                <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>
                <button type='button' class='btn btn-primary'>Login</button>
            </div>
          </div>
        </div>
    </div>`);

    $("#login-modal").modal({
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    });
  });
};
