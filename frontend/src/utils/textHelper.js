export const stripHtml = (html) => (html ? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '');

export const truncate = (str, n = 120) => (str && str.length > n ? str.slice(0, n) + '…' : str || '');

export const getInitials = (name = '') =>
    name
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || '?';


    // Simple HTML-safe highlighter for search result previews
export const highlightMatch = (text, query) => {
    if (!query) return text;

    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    return text.replace(new RegExp(`(${escaped})`, 'ig'), '<mark>$1</mark>');
};

