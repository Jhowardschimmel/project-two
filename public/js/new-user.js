$("#signUpButton").click(function () {
    console.log(`button clicked`);
    $("#signUp-modal").html(`<div class='modal-dialog' role='document'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='exampleModalLabel'>Sign Up</h5>
        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div class='modal-body'>
      <div class='input-group mb-3'>
                    <div class='input-group-prepend'>
                        <span class='input-group-text'><i class='far fa-envelope'></i></span>
                    </div>
                    <input type='text' id='signUp-email' class='form-control' placeholder='Email Address' aria-label='email' aria-describedby='basic-addon1'>
                </div>
                <div class='input-group mb-3'>
                    <div class='input-group-prepend'>
                        <span class='input-group-text'><i class='fas fa-user'></i></span>
                    </div>
                    <input type='text' id='signUp-user' class='form-control' placeholder='Username' aria-label='Username' aria-describedby='basic-addon1'>
                </div>
      </div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>
        <button type='button' class='btn btn-primary'>Sign Up</button>
      </div>
    </div>
    </div>
    </div>`)
});
