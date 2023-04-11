
const EMAIL_REGEX = /^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/i;
const PHONE_REGEX = /^(\+7|8)?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/

const addOptions = (options, selectObject) => {
    options.forEach(function(optionData) {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.text = optionData.label;
        selectObject.appendChild(option);
    });
}
// ivzhenko2014@gmail.com

export const createTask9 = () => {

    const container = document.createElement("div")
    container.classList.add('task9-form-container')
    container.id = "form-container-id"

    const form = document.createElement("form");
    form.classList.add('task9-form')

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Name";
    nameInput.required = true;

    const emailInput = document.createElement("input");
    emailInput.placeholder = "E-mail";
    emailInput.required = true;
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', 'emailInput');

    emailInput.addEventListener('input', () => {
        let currentInput = emailInput.value;
        if (currentInput.match(EMAIL_REGEX)) {

            emailInput.setCustomValidity('');
        } else {
            emailInput.setCustomValidity('Please enter a valid email address');
        }
    });

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.placeholder = "Password";
    passwordInput.required = true;

    const phoneInput = document.createElement('input')
    phoneInput.classList.add("task9-input-phone");
    phoneInput.placeholder = "Phone number";
    phoneInput.required = true;
    phoneInput.setAttribute('type', 'phone');
    phoneInput.setAttribute('name', 'phoneInput');

    phoneInput.addEventListener('input', ()=> {
        let currentInput = phoneInput.value;

        if (PHONE_REGEX.test(currentInput)) {
            phoneInput.setCustomValidity('');
        } else {
            phoneInput.setCustomValidity('Please enter a valid phone number with country code');
        }
    });

    const birthDateContainer = document.createElement('div')
    birthDateContainer.classList.add("task9-birth-date-container")

    const dateInput = document.createElement('select')
    dateInput.classList.add("task9-birth-date")
    dateInput.classList.add("task9-select-st")
    dateInput.style.width = '100%'

    const dateOptions = Array.from({length: 31}, (_, i) =>
        ({ label: `${i + 1}`, value: `date-${i + 1}` })
    );

    addOptions(dateOptions, dateInput)

    const monthInput = document.createElement('select')
    monthInput.classList.add("task9-birth-date")
    monthInput.classList.add("task9-select-st")

    const monthOptions = Array.from({length: 12}, (_, i) =>
        ({ label: new Date(0, i).toLocaleString('default', { month: 'long' }), value: `month-${i + 1}` })
    );

    addOptions(monthOptions, monthInput)

    const yearInput = document.createElement('select')
    yearInput.classList.add("task9-birth-date")
    yearInput.classList.add("task9-select-st")

    const yearOptions = Array.from({length: 123}, (_, i) =>
        ({ label: `${new Date().getFullYear() + i - 123}`, value: `year-${new Date().getFullYear() + i - 123}` })
    );

    addOptions(yearOptions, yearInput)

    birthDateContainer.appendChild(dateInput)
    birthDateContainer.appendChild(monthInput)
    birthDateContainer.appendChild(yearInput)

    const genderSelect = document.createElement("select");
    genderSelect.classList.add("task9-form-gender")
    genderSelect.classList.add("task9-select-st")
    genderSelect.name = "gender";
    genderSelect.required = true;

    const genderOptions = [
        { label: "Gender", value: "" },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];

    addOptions(genderOptions, genderSelect)

    const languageSelect = document.createElement("select");
    languageSelect.classList.add("task9-form-lang")
    languageSelect.classList.add("task9-select-st")
    languageSelect.name = "language";
    languageSelect.required = true;

    const languageOptions = [
        { label: "Programming Language", value: "" },
        { label: "JS", value: "js" },
        { label: "Ruby", value: "ruby" },
        { label: "C++", value: "cpp" },
        { label: "Python", value: "python" },
    ];

    addOptions(languageOptions, languageSelect)

    const aboutYouTextField = document.createElement("textarea");
    aboutYouTextField.classList.add("task9-text-area")
    aboutYouTextField.name = "text_field";
    aboutYouTextField.placeholder = "About You";
    aboutYouTextField.style.resize = "none";
    aboutYouTextField.required = true;


// Create submit button
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.classList.add('submit-button')
    button.textContent = 'Submit';


// Добавляем все элементы в форму
    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(phoneInput);
    form.appendChild(birthDateContainer);
    form.appendChild(genderSelect);
    form.appendChild(languageSelect)
    form.appendChild(aboutYouTextField)
    form.appendChild(button);

    form.childNodes.forEach(child => {
        child.classList.add("task9-fields-margin")
        child.classList.add("task9-font")
    })

    container.appendChild(form);



    return [container]
}