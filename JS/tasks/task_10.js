const NAME_REGEX = /^([A-Z][a-z]*|[А-Я][а-я]*)/
const EMAIL_REGEX = /^[\w+\-.]{2,30}@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]{1,4}$/i;
const PHONE_REGEX = /^(\+7|8)?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\s]).{8,}$/

const addOptions = (options, selectObject) => {
    options.forEach(function(optionData) {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.text = optionData.label;
        selectObject.appendChild(option);
    });
}
// ivzhenko2014@gmail.com


const validations = {
    login: false,
    email: false,
    password: {
        valid: false,
        confirmed: false,
        },
    phone: false,
}

const validate = () => {
    for (const property in validations) {
        if (typeof validations[property] === 'object') {
            for (const prop in validations[property]) {
                if (!validations[property][prop]) return false
            }
        } else {
            if (!validations[property]) return false
        }
    }
    return true
}

export const createTask10 = () => {

    const container = document.createElement("div")
    container.classList.add('task9-form-container')
    container.id = "form-container-id"

    const form = document.createElement("form");
    form.classList.add('task9-form')

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Name";

    nameInput.addEventListener('input', ()=> {
        let currentInput = nameInput.value;

        if (NAME_REGEX.test(currentInput)) {
            validations.login = true
        } else {
            validations.login = false
        }
    });

    const emailInput = document.createElement("input");
    emailInput.placeholder = "E-mail";
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', 'emailInput');

    emailInput.addEventListener('input', () => {
        let currentInput = emailInput.value;
        if (currentInput.match(EMAIL_REGEX)) {
            validations.email = true
        } else {
            validations.email = false
        }
    });

    const passwordHints = [
        "Minimum length of 8 characters",
        "Must contain at least one uppercase letter",
        "Must contain at least one lowercase letter",
        "Must contain at least one digit",
        "Must contain at least one special character (such as @, #, or $)",
    ]

    const passwordHintContainer = document.createElement("div")
    passwordHintContainer.classList.add("password-hint-container")
    passwordHintContainer.style.display = 'none'

    passwordHints.forEach( hint => {
        const passwordHintLabel = document.createElement("label")
        passwordHintLabel.classList.add("password-hint-label")
        passwordHintLabel.textContent = hint

        passwordHintContainer.appendChild(passwordHintLabel)
    })


    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.placeholder = "Password";
    container.appendChild(passwordHintContainer)

    passwordInput.addEventListener('click', event => {
        const fieldRect = passwordInput.getBoundingClientRect();
        const x = event.clientX - fieldRect.left;
        passwordHintContainer.style.display = 'flex'
        passwordHintContainer.style.left = `${x}px`
    })

    passwordInput.addEventListener('input', ()=> {
        let currentInput = passwordInput.value;

        if (PASSWORD_REGEX.test(currentInput)) {
            validations.password.valid = true
        } else {
            validations.password.valid = false
        }
    });

    passwordInput.addEventListener('focusout', () => {
        passwordHintContainer.style.display = 'none'
    })

    const passwordConfirmInput = document.createElement("input");
    passwordConfirmInput.type = "password";
    passwordConfirmInput.name = "password";
    passwordConfirmInput.placeholder = "Confirm password";

    passwordConfirmInput.addEventListener('input', ()=> {
        let currentInput = passwordConfirmInput.value;

        if (currentInput === passwordInput.value) {
            validations.password.confirmed = true
        } else {
            validations.password.confirmed = false
        }
    });

    const phoneInput = document.createElement('input')
    phoneInput.classList.add("task9-input-phone");
    phoneInput.placeholder = "Phone number";
    phoneInput.setAttribute('type', 'phone');
    phoneInput.setAttribute('name', 'phoneInput');

    phoneInput.addEventListener('input', ()=> {
        let currentInput = phoneInput.value;

        if (PHONE_REGEX.test(currentInput)) {
            validations.phone = true
        } else {
            validations.phone = false
        }
        console.log(validate())
    });

    const birthDateContainer = document.createElement('div')
    birthDateContainer.classList.add("task9-birth-date-container")

    const dateInput = document.createElement('select')
    dateInput.classList.add("task9-select-st")
    dateInput.style.width = '100%'

    const dateOptions = Array.from({length: 31}, (_, i) =>
        ({ label: `${i + 1}`, value: `date-${i + 1}` })
    );

    addOptions(dateOptions, dateInput)

    const monthInput = document.createElement('select')
    monthInput.classList.add("task9-select-st")

    const monthOptions = Array.from({length: 12}, (_, i) =>
        ({ label: new Date(0, i).toLocaleString('default', { month: 'long' }), value: `month-${i + 1}` })
    );

    addOptions(monthOptions, monthInput)

    const yearInput = document.createElement('select')
    yearInput.classList.add("task9-select-st")

    const yearOptions = Array.from({length: 123}, (_, i) =>
        ({ label: `${new Date().getFullYear() + i - 123}`, value: `year-${new Date().getFullYear() + i - 123}` })
    );

    addOptions(yearOptions, yearInput)

    birthDateContainer.appendChild(dateInput)
    birthDateContainer.appendChild(monthInput)
    birthDateContainer.appendChild(yearInput)

    const facultyInput = document.createElement("input");
    facultyInput.type = "faculty";
    facultyInput.name = "faculty";
    facultyInput.placeholder = "Faculty";

    const languageSelect = document.createElement("select");
    languageSelect.classList.add("task9-form-lang")
    languageSelect.classList.add("task9-select-st")
    languageSelect.name = "language";

    const languageOptions = [
        { label: "Programming Language", value: "" },
        { label: "JS", value: "js" },
        { label: "Ruby", value: "ruby" },
        { label: "C++", value: "cpp" },
        { label: "Python", value: "python" },
    ];

    addOptions(languageOptions, languageSelect)

// Create submit button
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.classList.add('submit-button')
    button.disabled = true
    button.textContent = 'Submit';


// Добавляем все элементы в форму
    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(passwordConfirmInput);
    form.appendChild(phoneInput);
    form.appendChild(birthDateContainer);
    form.appendChild(facultyInput);
    form.appendChild(languageSelect)
    form.appendChild(button);

    form.childNodes.forEach(child => {
        child.classList.add("task9-fields-margin")
        child.classList.add("task9-font")
    })

    container.appendChild(form);



    return [container]
}