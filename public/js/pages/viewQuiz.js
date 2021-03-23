const result = document.querySelector('.result');

export const showResults = () => {
    const storageResults = localStorage.getItem('result');
    result.textContent = storageResults;

    // Borrar el localStorage
    localStorage.removeItem('answers');
}