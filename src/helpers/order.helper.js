const crypto = require('crypto');

module.exports = {
    generateIdentifier: () => crypto.randomBytes(32).toString('hex'),
    generateCode: () => crypto.randomBytes(4).toString('hex').toUpperCase(),
    isRequiredVisa: (country) => {
        const countries = [
            'Indonesia', 'Brunei', 'Cambodia', 'Hong Kong',
            'Kazakhstan', 'Laos', 'Macau', 'Malaysia', 'Myanmar',
            'Philippines', 'Singapore', 'Taiwan', 'Thailand', 'Vietnam',
            'Timor-Leste', 'Uzbekistan', 'Qatar', 'Oman',
        ];
        return !countries.includes(country);
    }
};
