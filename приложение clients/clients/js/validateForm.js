export const validateClientForm = () => {
    const userName = document.getElementById('floatingName');
    const userSurname = document.getElementById('floatingSurname');
    const userLastName = document.getElementById('floatingLastName');
    const unacceptablelettere = document.getElementById('unacceptablelettere');
    const writeName = document.getElementById('writeName');
    const writeSurname = document.getElementById('writeSurname');
    const writeLastName = document.getElementById('writeLastName');
    const requiredValue = document.getElementById('requiredValue');
    const validateArray = [unacceptablelettere, writeLastName, writeName, writeSurname, requiredValue];
    const regexp = /[^а-яА-ЯёЁ]+$/g;

    const onInputValue = input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--color-gray-suit)';
            for (const item of validateArray) {
                item.textContent = ``;
            }
        });

        input.oncut = input.oncopy = input.onpaste = () => {
            input.style.borderColor = 'var(--color-gray-suit)';
            for (const item of validateArray) {
                item.textContent = ``;
            };
        };

        input.onchange = () => {
            input.style.borderColor = 'var(--color-gray-suit)';
            if (userLastName.value && userName.value && userSurname.value) {
                for (const item of validateArray) {
                    item.textContent = ``;
                };
            }
        }
    }

    onInputValue(userLastName);
    onInputValue(userName);
    onInputValue(userSurname);

    const chekeRequiredName = (input, message, name) => {
        if (!input.value) {
            input.style.borderColor = 'var(--color-burnt-sienna)';
            message.textContent = `Введите ${name} клиента`;
            return false;
        } else {
            message.textContent = ``;
        }

        return true;
    };

    const chekeByRegexp = (input, regexp) => {
        if (regexp.test(input.value)) {
            input.style.borderColor = 'var(--color-burnt-sienna)';
            unacceptablelettere.textContent = `Недопустимые символы.`;
            return false;
        }

        return true;
    };

    if (!chekeRequiredName(userLastName, writeLastName, 'Фамилию')) {return false };
    if (!chekeRequiredName(userName, writeName, 'имя')) {return false };
    if (!chekeRequiredName(userSurname, writeSurname, 'Отчество')) {return false };
    if (!chekeByRegexp(userLastName, regexp)) {return false };
    if (!chekeByRegexp(userName, regexp)) {return false };
    if (!chekeByRegexp(userSurname, regexp)) {return false };

    return true;
};