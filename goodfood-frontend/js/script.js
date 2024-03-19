const $msgError = document.querySelector('#msgError');

function login() {
    let emailUser = document.getElementById("inputEmail").value;
    let passwordUser = document.getElementById("inputPassword").value;
    let validUser = false;


    $.getJSON("http://localhost:8080/users", (response) => {
        for (let user of response) {
            if (user.email == emailUser && user.password == passwordUser) {
                validUser = true;
                // window.open('teste.html');
                window.location.href = 'teste.html';
                break;
            } else {
                continue;
            }
        }

        if (validUser == false) {
            $msgError.innerHTML = "*Usuário/Senha inválidos";
        }
    });
}

function register() {

    // let nameUser = document.getElementById("inputName").value;
    // let emailUser = document.getElementById("inputEmail").value;
    // let passwordUser = document.getElementById("inputPassword").value;
    // let confirmPasswordlUser = document.getElementById("inputConfirmPassword").value;
    let categoryUser;
    let newUser;

    if (document.getElementById("flexRadioClient").checked) {
        categoryUser = "Cliente";
    } else if (document.getElementById("flexRadioNutritionist").checked) {
        categoryUser = "Nutricionista";
    }

    if (categoryUser == "Cliente") {
        newUser = {
            name: document.getElementById("inputName").value,
            email: document.getElementById("inputEmail").value,
            password: document.getElementById("inputPassword").value,
            category: {
                "id": 1,
                "name": "Cliente"
            }
        }
    } else {
        newUser = {
            name: document.getElementById("inputName").value,
            email: document.getElementById("inputEmail").value,
            password: document.getElementById("inputPassword").value,
            category: {
                "id": 2,
                "name": "Nutricionisa"
            }
        }
    }

    $.ajax({
        url: "http://localhost:8080/users",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(newUser),
        success: (newUser) => {
            alert("Cadastrou com Sucesso");
        }
    }); 
}

function validatePassword() {

}

function validateEmail() {
    
}