//const photographersSection = document.querySelector("#main");
let mediaArray;

//get each photographer identify by their id
async function getPhotographer() {

    //je récupère l'id dans l'URL
    const id = window.location.search.split('id=')[1];

    // je récupère mes données Json
    const photographerData = await (
        fetch('./data/photographers.json')
            .then((response) => response.json())
    );

    photographerData.photographers = photographerData.photographers.filter((photographer) => photographer.id == id)[0];
    photographerData.media = photographerData.media.filter((media) => media.photographerId == id);

    return photographerData;
}

//display data dynamically for each photographer
function displayPhotographerData(photographer) {

    const photographersSection = document.getElementById("photographeInfos");
    const profileModel = photographerFactory(photographer);
    const profiles = profileModel.getProfilePage();
    photographersSection.appendChild(profiles);

};

//display media data dynamically for each photographer
function displayMediaData(photographerData) {

    const photographersSection = document.getElementById("photographeMedias");
    
    photographerData.forEach((media) => {
        const profileModel = photographerFactory(media);
        const medias = profileModel.getMediaPage();
        photographersSection.appendChild(medias);
    });

};

async function init() {

    // Récupère les datas des photographes
    const photographerData = await getPhotographer();

    // je remplis mon tableau de média avec les médias issus du JSON
    mediaArray = photographerData.media;

    displayPhotographerData(photographerData.photographers);
    
    displayMediaData(mediaArray);
    
};




init();











