$("#loginButton").click(function () {
    console.log(`button clicked`);
    $("#login-modal").html(`<div class='modal-dialog' role='document'>
    <div class='modal-content'>
        <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>Sign In</h5>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
            </button>
        </div>
        <div class='modal-body'>
            <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                    <span class='input-group-text'><i class='fas fa-envelope'></i></span>
                </div>
                <input type='text' id='login-email' class='form-control' placeholder='Username' aria-label='Username' aria-describedby='basic-addon1'>
            </div>
                </div>
                <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                    <span class='input-group-text'><i class='fas fa-user'></i></span>
                </div>
                <input type='text' id='login-user' class='form-control' placeholder='Username' aria-label='Username' aria-describedby='basic-addon1'>
            </div>
                </div>
                <div class='modal-footer'>
                    <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>
                    <button type='button' class='btn btn-primary'>Login</button>
                </div>
            </div>
        </div>
    </div>`)
});

