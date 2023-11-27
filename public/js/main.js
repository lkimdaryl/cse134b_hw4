document.addEventListener('DOMContentLoaded', function () {
//    mouseGlow();

    const form = document.querySelector("#messageForm");
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#comments");
    const nameOutput = document.querySelector("#nameOutput");
    const emailOutput = document.querySelector("#emailOutput");
    const notification = document.querySelector("#notification");
    const charLeftOutput = document.querySelector("#char-info");
    const form_errors = [];


    function returnToDefaultState(inputElement, outputElement) {
        inputElement.classList.remove("invalid");
        outputElement.style.display = "none";
        outputElement.innerHTML = "";
    }
    function makeInvalid(inputElement, outputElement) {
        inputElement.className = "invalid";
        outputElement.style.display = "inline";
    }

    function fadeOut(element){
        element.style.opacity = "1";
        element.style.transition = "opacity 1s ease";
        element.style.opacity = "0";
    }

    function resetOpacity(element){
        element.style.transition = "none";
        element.style.opacity = "1";
    }

    form.noValidate = true;

    const charNameAllowed = /^[a-zA-Z ]+$/;
    name.addEventListener("input", (event) => {
        event.preventDefault();
        resetOpacity(nameOutput);

        if (name.value.length > 0 ) {
            if (!charNameAllowed.test(name.value)){
                nameOutput.innerHTML = "Name cannot have special characters or numbers."
                makeInvalid(name, nameOutput);
            }else {
                returnToDefaultState(name, nameOutput);
            }
        }else{
            returnToDefaultState(name, nameOutput);
        }
    });

    const localcharNotAllowed = /[()\\[\]:;<>",]/;
    const domainCharAllowed = /^[a-zA-Z0-9.\-]+$/;
    let local;
    let domain;
    let emailParts;
    email.addEventListener("input", (event) => {
        event.preventDefault();
        resetOpacity(emailOutput);

        if (email.value.includes('@')){
            emailParts = email.value.split('@');
            local = emailParts[0];
            domain = emailParts[1];
        }else {
            emailParts = undefined;
        }

        if (email.value.length > 0){
            if (emailParts !== undefined && emailParts.length > 2){
                emailOutput.innerHTML = "Email cannot have 2 or more @ symbols";
                makeInvalid(email, emailOutput);
            }else if (emailParts === undefined && localcharNotAllowed.test(email.value)){
                emailOutput.innerHTML = "Characters before the @ symbol cannot have @ ( ) [ \ ] : ; < > \" ,"
                makeInvalid(email, emailOutput);
            }else if (emailParts !== undefined && local.length === 0){
                emailOutput.innerHTML = "Email cannot start with @ symbol";
                makeInvalid(email, emailOutput);
            }else if (emailParts !== undefined && !domainCharAllowed.test(domain) && domain.length > 0){
                emailOutput.innerHTML = "Characters after the @ symbol cannot have any special characters.";
                makeInvalid(email, emailOutput);
            }else{
                returnToDefaultState(email, emailOutput);
            }
        }else{
            returnToDefaultState(email, emailOutput);
        }
    });

    let charLeft = 500;
    charLeftOutput.innerHTML = `There are ${charLeft} characters left to input.`
    charLeftOutput.style.fontSize = "0.8rem";
    message.addEventListener("input", (event) => {
       charLeft = 500 - message.value.length
       charLeftOutput.innerHTML = `There are ${charLeft} characters left to input.`
    });

    let timeout1, timeout2, timeout3, timeout4, timeout5;

    form.addEventListener("submit", (event) =>{
        event.preventDefault();

        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
        clearTimeout(timeout5);
        resetOpacity(nameOutput);
        resetOpacity(emailOutput);

        if (name.value.length === 0){
            nameOutput.innerHTML = "Name is missing"
            makeInvalid(name, nameOutput);
            timeout1 = setTimeout(() => fadeOut(nameOutput),2000);
            timeout2 = setTimeout(() => returnToDefaultState(name, nameOutput),2500);
        }else if (!charNameAllowed.test(name.value)){
            nameOutput.innerHTML = "Name cannot have special characters or numbers."
            makeInvalid(name, nameOutput);
            timeout1 = setTimeout(() => fadeOut(nameOutput),2000);
            timeout2 = setTimeout(() => returnToDefaultState(name, nameOutput),2500);
        }

        if (!email.checkValidity() && email.value.length > 0){
            emailOutput.innerHTML = "Email should be in the form example@email.com";
            makeInvalid(email, emailOutput);
            timeout3 = setTimeout(() => fadeOut(emailOutput),2000);
            timeout4 = setTimeout(() => returnToDefaultState(email, emailOutput),2500);
        }else if (email.value.length === 0){
            emailOutput.innerHTML = "Email is missing";
            makeInvalid(email, emailOutput);
            timeout3 = setTimeout(() => fadeOut(emailOutput),2000);
            timeout4 = setTimeout(() => returnToDefaultState(email, emailOutput),2500);
        }

        if (nameOutput.innerHTML || emailOutput.innerHTML) {

            const formErrors = [
                { field: 'name', error: nameOutput.innerHTML },
                { field: 'email', error: emailOutput.innerHTML },
            ];
            const formErrorsJSON = JSON.stringify(formErrors);
            const formData = new FormData(form);
            formData.append('form-errors', formErrorsJSON);
            fetch(form.action, {
                method: form.method,
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
        }
                if (name.checkValidity() && email.checkValidity() && message.checkValidity()){
            name.value = "";
            email.value = "";
            message.value = "";
            notification.style.display = "inline";
            timeout5 = setTimeout (() => {
                notification.style.display = "none";
            }, 5000);
        }else{
            name.value = "";
            email.value = "";
            message.value = "";
            notification.innerHTML = "Message Sending Failed"
            notification.style.display = "inline";
            notification.style.color = "red";
            timeout5 = setTimeout (() => {
                notification.style.display = "none";
            }, 2000);
        }
    });
});

function mouseGlow(){
    const glow = document.getElementById('glow');

    document.addEventListener('mousemove', (e) => {
        const x = e.pageX;
        const y = e.pageY;

        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;

        glow.style.display = 'block';
    });
};

