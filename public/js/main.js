document.addEventListener('DOMContentLoaded', function () {
//    mouseGlow();


    const form = document.querySelector("#messageForm");
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#comments");
    form.noValidate = true;

    email.addEventListener("input", (event) => {
//        console.log(email.checkValidity());
        if (email.value.length > 0) {
            if (!email.checkValidity()) {
                event.preventDefault();
                email.className = "invalid";
            }else {
                email.classList.remove("invalid");
            }
        }else {
            email.classList.remove("invalid");
        }
    });

    let timeout1;
    let timeout2;
    form.addEventListener("submit", (event) =>{
        event.preventDefault();
        let error = document.querySelector(".errorOutput");
//        console.log(errors);
//        console.log(errors[0]);
//        console.log(errors[0].style.transition);
        error.style.transition = "none";
        error.style.opacity = 1;
        error.innerHTML = "";
        error.style.display = "none";

        email.classList.remove("invalid");
        clearTimeout(timeout1);
        clearTimeout(timeout2);

        function removeError(){
                error.style.transition = 'opacity 1s ease';
                error.style.opacity = 0;
                timeout2 = setTimeout(() => {
                    error.innerHTML = "";
                    error.style.display = "none";
                    email.classList.remove("invalid");
                }, 500);
        }

        if (email.value.length === 0){
            email.classList.add("invalid");
            error.innerHTML = "Please input your email address."
            error.style.display = "inline";
            timeout1 = setTimeout(removeError, 3000);
        }else if (!email.checkValidity()) {
            email.classList.add("invalid");
            error.innerHTML = "Please input your email in this format: <br\>example@email.com";
            error.style.display = "inline-block";
            timeout1 = setTimeout(removeError, 3000);
        }else {
            error.innerHTML = "";
            error.style.display = "none";
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

