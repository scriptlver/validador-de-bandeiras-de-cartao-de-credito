const cardIssuers = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
    DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    EnRoute: /^2(?:014|149)[0-9]{11}$/,
    Voyager: /^8699[0-9]{11}$/,
    HiperCard: /^606282\d{10}(\d{3})?$/,
    Aura: /^50[0-9]{14,17}$/
};

function validateCreditCardNumber(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
}

function getCardIssuer(cardNumber) {
    for (let issuer in cardIssuers) {
        if (cardIssuers[issuer].test(cardNumber)) {
            return issuer;
        }
    }
    return 'unknown';
}

function validateAndDiscoverCard(cardNumber) {
    if (!validateCreditCardNumber(cardNumber)) {
        return { valid: false, bandeira: null };
    }
    const bandeira = getCardIssuer(cardNumber);
    return { valid: true, bandeira: bandeira };
}

const cardNumber = '5012801294992181'; 
const result = validateAndDiscoverCard(cardNumber);
console.log(result);