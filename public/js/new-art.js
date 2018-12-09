window.onload = function (){


$("#postButton").click(function() {
  $("#new-art-modal").html(`
  <div class='modal-dialog' role='document'>
  <div class='modal-content'>
    <div class='modal-header'>
      <h5 class='modal-title' id='submissionHeader'>New Art Submission</h5>
      <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
    <div class='modal-body'>
        <small id='artHelp' class='form-text text-muted'>Can be left blank, will be listed as 'Untitled'</small>
        <div class='input-group mb-3'>
            <div class='input-group-prepend'>
                <span class='input-group-text' id='artName'>
                    <i class='far fa-palette'></i>
                </span>
            </div>
            <input type='text' class='form-control' placeholder='Art Name' aria-label='artName' aria-describedby='artName'>
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
            <textarea class='form-control' placeholder='Description' aria-label='With textarea'></textarea>
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
                <label class='input-group-text' for='inputGroupSelect01'><i class='far fa-paint-brush'></i></label>
            </div>
            <select class='custom-select' id='inputGroupSelect01'>
                <option selected>Category</option>
                <option value='1'>Graffiti</option>
                <option value='2'>Sculpture</option>
                <option value='3'>Painting</option>
            </select>
        </div>

        <small class='form-text text-muted'>
            <i class='fas fa-long-arrow-left'></i> Be sure to select the piece's location on the map</small>
    </div>
    <div class='modal-footer'>
      <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>
      <button type='button' class='btn btn-success' id='artSubmitButton'>Submit</button>
    </div>
  </div>
</div>
    `)

    $("new-art-modal").modal({
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true
    })
  });
};
