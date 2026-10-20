const phpFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
});

export function formatCurrency(amount) {
    return phpFormatter.format(amount);
}
