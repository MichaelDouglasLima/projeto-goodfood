const $msgError = document.querySelector('#msgError');
const $emailError = document.querySelector('#emailError');
const $passwordError = document.querySelector('#passwordError');

let emails = [];

// Onload
// loadEmails();
// loadNutritionists();
// loadNutritionists();
// loadNutritionists();

function loadEmails() {
    $.getJSON("http://localhost:8080/users", (response) => {
        for (let user of response) {
            emails.push(user.email);
            console.log(user.email);
        }
    });
}

function login() {
    let emailUser = document.getElementById("inputEmail").value;
    let passwordUser = document.getElementById("inputPassword").value;
    let validUser = false;


    $.getJSON("http://localhost:8080/users", (response) => {
        for (let user of response) {
            if (user.email == emailUser && user.password == passwordUser) {
                validUser = true;

                if (user.category.name == "Cliente") {
                    window.location.href = 'home-client.html';
                } else if (user.category.name == "Nutricionista") {
                    window.location.href = 'home-nutritionist.html';
                }
                
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
    let emailUser = document.getElementById("inputEmail").value;
    let passwordUser = document.getElementById("inputPassword").value;
    let confirmPasswordlUser = document.getElementById("inputConfirmPassword").value;
    let categoryUser;
    let newUser;

    if (validateEmail(emailUser, emails)) {
        $emailError.textContent = "*Email já cadastrado!";
        return;
    }

    if (!validatePassword(passwordUser, confirmPasswordlUser)) {
        $passwordError.textContent = "*As senhas são diferentes!";
        return;
    }

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
            alert("Cadastrou com Sucesso!");
            emails.push(newUser.email);
            window.location.href = 'index.html';
        }
    });
}

function validatePassword(password, confirmPassword) {
    if (password == confirmPassword) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(emailValidation, arrayEmails) {
    return arrayEmails.includes(emailValidation);
}

function loadNutritionists() {
    $.getJSON("http://localhost:8080/users", (response) => 
    {   
        for (var n of response) {
            if (n.category.name == "Nutricionista") {
                document.getElementById("nutritionistProfiles").innerHTML += 

            `
                <div class="card m-auto mt-4 p-3 pt-1 col-3" style="width: 18rem;">
                    <div class="card-body text-center">
                        <i class="bi bi-person-circle fs-1"></i>
                        <h5 class="card-title">${n.name}</h5>
                        <p>${n.description}</p>
                        <i class="bi bi-whatsapp"> ${n.telephone}</i>
                    </div>
                </div>
            `;
            }
        }      
    }
 );
}