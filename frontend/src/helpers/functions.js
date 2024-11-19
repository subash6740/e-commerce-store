const convertImage = (image) => {
    const uint8Array = new Uint8Array(image.data);
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
}

const convertDate = (date) => {
    const dateNew = new Date(date);

    return dateNew.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

const capitalize = (sentence) => {
    const words = sentence.split(" ");

    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}

export { convertImage, convertDate, capitalize }