const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    const len = +lenEl.value;
    const hasUpper = upperEl.checked;
    const hasLower = lowerEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    const typesArr = [
        { enabled: hasUpper, func: getUppercase },
        { enabled: hasLower, func: getLowercase },
        { enabled: hasNumber, func: getNumber },
        { enabled: hasSymbol, func: getSymbol }
    ].filter(item => item.enabled);

    if (typesArr.length === 0) {
        pwEl.innerText = "Select at least one option";
        return;
    }

    let password = "";

    // Ensure at least one character from each selected type
    typesArr.forEach(type => {
        password += type.func();
    });

    // Fill the rest
    for (let i = password.length; i < len; i++) {
        const randType = typesArr[Math.floor(Math.random() * typesArr.length)];
        password += randType.func();
    }

    // Shuffle password to prevent predictable patterns
    password = shuffle(password);

    pwEl.innerText = password;
}

function shuffle(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

generateEl.addEventListener('click', generatePassword);

copyEl.addEventListener("click", () => {
    const password = pwEl.innerText;

    if (!password || password.startsWith("Select")) return;

    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();

    alert("Password copied to clipboard");
});
