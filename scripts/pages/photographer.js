//Mettre le code JavaScript lié à la page photographer.html
const getPhotographer = async () => { //get each photographer identify by their id

    //je récupère l'id dans l'URL
    const id = window.location.search.split('id=')[1];

    // je récupère mes données Json
    const photographerData = await (
        fetch('./data/photographers.json')
            .then((response) => response.json())
    );

    //je filtre
    //photographerData.photographers.filter((photographer) => photographer.id == id)[0];

    photographerData.photographers = photographerData.photographers.filter((photographer) => photographer.id == id)[0];
    photographerData.media = photographerData.media.filter((media) => media.photographerId == id)

    return photographerData;

}


async function displayPhotographerData(photographer) { //display data dynamically for each photographer

    const photographersSection = document.querySelector("#main");

        const profileModel = photographerFactory(photographer);
        const profiles = profileModel.getProfilePage();
        photographersSection.appendChild(profiles);


};

async function displayMediaData(media) { //display media data dynamically for each photographer

    const photographersSection = document.querySelector("#main");

    const profileModel = photographerFactory(media);
    const profiles = profileModel.getMediaPage();
    photographersSection.appendChild(profiles);


};


async function init() {
    // Récupère les datas des photographes

     const {photographers, media} = await getPhotographer();
     await displayPhotographerData(photographers);
     await displayMediaData(media);
};

init();
//partir sur une classe avec toutes les fonctions (PhotographBuilder)

let counter = 0;
function incrementLikes()
{
    const hearts = document.querySelectorAll('i.fa-heart');
    console.log(hearts);
    hearts.addEventListener('click', function (e)
    {
        e.preventDefault();
        counter++;
     const  compteurs = document.querySelectorAll('.compteur');


        for (const compteur of compteurs) {

            compteur.innerHTML = counter;

        }

    });

}






