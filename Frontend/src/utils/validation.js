const validation = () => {
    const patterns = {
        firstName: /^[A-Z][a-z]{1,49}$/,
        lastName: /^([A-Z][a-z]{1,74}[ -]?)?([A-Z][a-z]{1,74})?$/,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/,
        username: /^[a-z\d]{10,50}$/i,
        password: /^[a-z\d!@#$%^&*]{20,50}$/i,
        profilePassword: /^([a-z\d!@#$%^&*]{20,50})?$/i,
    };
    const inputElements = document.querySelectorAll("input");
    let output = true;

    inputElements.forEach(input => {
        if (input.id !== "" && patterns[input.id].test(input.value)) {
            input.style.border = "2px solid black";
        }
        else if (input.id === "") {
            return output;
        }
        else {
            input.style.border = "2px solid red";
            output = false;
        }
    });

    return output;
}

export default validation;