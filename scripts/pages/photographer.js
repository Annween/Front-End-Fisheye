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


class photographerBuilder {
    // sort media switch criteria
    sortMedia() {

        const optionValue = document.getElementById("sortBy");

        // if (optionValue.value == "titre") {
        //     const array = displayMediaData();

        //     return array.sort();
        // }

        if (optionValue.value == "date") {

            mediaArray = mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
            displayMediaData(mediaArray);
        }

        //si orderBy = date
        // je tri le tableau media par date

        // si orderBy = ......

        //displayMediaData(media);

    }

    // ajoute 1 au coeur d'un média
    // incrementLike(icone){

        // étape 1 : à partir de l'icone, remonter au parent avec une recherche Google : js get parent element
        // étape 2 : à partir du parent, descendre vers l'enfant ayant la classe que l'on cible (chez nous, compteur) : Google : js get child with class
        // étape 3 : récupérer la value du span compteur, lui ajouter 1, et le réécrire

    // }




}

const select = document.getElementById("sortBy");

const photographBuilder = new photographerBuilder;

// evenement qui detecte le "change" sur le select
select.addEventListener('change', function () {
    photographBuilder.sortMedia();
});

// evenement qui deteche un "click" sur tous les coeurs

// etape 1 : déclarer l'évènement
// étape 2 : s'assurer que l'event fonctionne puis lancer la fonction d'increment des likes ( photographUtil.incrementlike(this) )

init();











