export default function addToArrayLS(name, element) {
    let array = window.localStorage.getItem(name);
    array = array ? array : [];
    console.log(array);
    array.push(element);
    localStorage.setItem(name, array);
}