export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidUsername = (username) => /^[a-zA-Z0-9_.]{3,20}$/.test(username);

export const passwordStrength = (password) => {
    if (!password) {
        return { score: 0, label: '' };
    }

    let score = 0;

    if (password.length >= 6) score++;

    if (password.length >= 10) score++;

    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;

    if (/\d/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];

    return { score, label: labels[Math.min(score, labels.length - 1)] };
};

