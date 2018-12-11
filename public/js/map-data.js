/* eslint-disable max-len */
window.onload = function() {
  var map = L.map("map").locate({
    setView: true,
    maxZoom: 16
  });

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
    for (let i = 0; i < mapdata.length; i++) {
      L.marker([mapdata[i].latitude, mapdata[i].longitude])
        .addTo(map)
        .bindPopup(
          `<h5>${mapdata[i].name}</h5>
          <h6>by ${mapdata[i].artist}</h6>
          <em>Posted by ${mapdata[i].User.username}</em>`
        )
        .on("click", function(e) {
          var imageURL = mapdata[i].imageURL;
          var imageHTML;
          console.log(imageURL);
          switch (imageURL) {
            case null:
              imageHTML = `
                <button class='image-add-button'>
                  <img class='card-img-top' src='https://static.thenounproject.com/png/396915-200.png' alt='Card image cap'>
                </button>`;
              break;
            default:
              imageHTML = `<img class='card-img-top' src='${imageURL}' alt='Card image cap'>`;
          }

          console.log(e, mapdata[i].id);
          $("#art-info").html(
            `${imageHTML}
              <hr>
              <h2 id='artNameDisplay'>${mapdata[i].name}</h2>
              <hr>
              <h6>By ${mapdata[i].artist}</h6>
              <hr>
              <strong>Description: </strong>
              <p>${mapdata[i].description}</p>
              <small class='float-sm-right'>Posted by ${mapdata[i].User.username}</small>
              <br>`
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
                      <input id='addImageURL' type='text' class='form-control' placeholder='Image URL' aria-label='artName' aria-describedby='artName'>
                  </div>
                  <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>
                    <button type='button' class='btn btn-success' id='add-image-url'>Submit</button>
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

            $("#add-image-url").click(function() {
              $.ajax({
                url: "/api/art/" + mapdata[i].id,
                type: "PUT",
                data: {
                  imageURL: $("#addImageURL").val()
                }
              }).then(function() {
                console.log("adde image URL to" + mapdata[i].id);
                window.location.reload();
              });
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

    var newPostMap = L.map("newPostMap").locate({
      setView: true,
      maxZoom: 16
    });

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
        <br>
        <small class='text-muted float-right'>Leave blank if unknown</small>
            <div class='input-group mb-3'>
              <div class='input-group-prepend'>
                <span class='input-group-text'>
                  <i class='far fa-palette'></i>
                </span>
              </div>
              <input id='artName' type='text' class='form-control' placeholder='Art Name' aria-label='artName' aria-describedby='artName'>
            </div>
            <small class='text-muted float-right'>Leave blank if unknown</small>
            <div class='input-group mb-3'>
              <div class='input-group-prepend'>
                <span class='input-group-text'>
                  <i class='far fa-signature'></i>
                </span>
            </div>
          <input type='text' class='form-control' id='artistName' placeholder='Artist Name' aria-label='artistName' aria-describedby='artistName'>
        </div>
        <small class='text-muted float-right'>Required</small>
        <div class='input-group'>
          <div class='input-group-prepend'>
            <span class='input-group-text'>
                <i class='far fa-pencil-paintbrush'></i>
            </span>
          </div>
            <textarea class='form-control' placeholder='Description' aria-label='With textarea' id="artDescription"></textarea>
          </div>
          <br>
          <small class='text-muted float-right'>Can be left blank and added later</small>
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
                <option value='Mural'>Mural</option>
                <option value='Graffiti'>Graffiti</option>
                <option value='Sculpture'>Sculpture</option>
                <option value='Architecture'>Architecture</option>
                <option value='Fountains'>Fountains</option>
                <option value='Uncategorized'>Uncategorized</option> 
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
        artImageURL = $("#imageURL").val();
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
            longitude: selectLoc.lng,
            imageURL: artImageURL
          }
        }).then(function() {
          console.log("Art posted!");
          window.location.reload();
        });
      });
    });

    //     $.ajax({
    //       url: "/api/art",
    //       type: "POST",
    //       data: {
    //         name: artName,
    //         artist: artistName,
    //         category: artCategory,
    //         description: artDescription,
    //         latitude: selectLoc.lat,
    //         longitude: selectLoc.lng,
    //         imageURL: imageURL
    //       }
    //     }).then(function() {
    //       console.log("Art posted!");
    //       window.location.reload();
    //     });
    //   });
    // });

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
                <input type='text' id='new-user-email' class='form-control' placeholder='Email' aria-label='Username' aria-describedby='basic-addon1'>
            </div>
            <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                    <span class='input-group-text'><i class='fas fa-user'></i></span>
                </div>
                <input type='text' id='new-username' class='form-control' placeholder='Password' aria-label='Username' aria-describedby='basic-addon1'>
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
