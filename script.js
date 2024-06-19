document.addEventListener('DOMContentLoaded', function() {
    const email = 'p.belayev@innopolis.university';
    const urlParams = new URLSearchParams({ email: email });
    const comicIdUrl = `https://fwd.innopolis.university/api/hw2?${urlParams.toString()}`;

    fetch(comicIdUrl)
        .then(response => response.json())
        .then(data => {
            const comicId = data;
            const comicUrl = `https://fwd.innopolis.university/api/comic?id=${comicId}`;

            return fetch(comicUrl);
        })
        .then(response => response.json())
        .then(comicData => {
            const titleElement = document.getElementById('comic-title');
            const imageElement = document.getElementById('comic-image');
            const dateElement = document.getElementById('comic-date');

            titleElement.textContent = comicData.safe_title;
            imageElement.src = comicData.img;
            imageElement.alt = comicData.alt;
            const date = new Date(comicData.year, comicData.month - 1, comicData.day);
            dateElement.textContent = date.toLocaleDateString();
        })
        .catch(error => {
            console.error('Error fetching comic data:', error);
        });
});