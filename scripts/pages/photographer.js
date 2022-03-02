//const photographersSection = document.querySelector("#main");

//get each photographer identify by their id
async function getPhotographer()  { 

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
async function displayPhotographerData(photographer) { 

    const photographersSection = document.getElementById("photographeInfos");
    const profileModel = photographerFactory(photographer);
    const profiles = profileModel.getProfilePage();
    photographersSection.appendChild(profiles);

};

//display media data dynamically for each photographer
async function displayMediaData(photographerData) {
    const photographersSection = document.getElementById("photographeMedias");
    photographerData.forEach((media) => {
        const profileModel = photographerFactory(media);
        const profiles = profileModel.getMediaPage();
        photographersSection.appendChild(profiles);
    });

};

async function init() {

    // Récupère les datas des photographes
    const {photographers, media} = await getPhotographer();
    await displayPhotographerData(photographers);
    await displayMediaData(media);
};


class photographerBuilder
{
    // sort media switch criteria
   //public sortMedia(orderBy){


    //si orderBy = date
    // je tri le tableau media par date

    // si orderBy = ......

    //displayMediaData(media);

//}



// evenement qui appelle sortMedia


   //public incrementLikes() {
   //    let counter = 0;
   //    const hearts = document.querySelectorAll('i.fa-heart');
   //    console.log(hearts);
   //    hearts.addEventListener('click', function (e) {
   //        e.preventDefault();
   //        counter++;
   //        const compteurs = document.querySelectorAll('.compteur');


   //        for (const compteur of compteurs) {

   //            compteur.innerHTML = counter;

   //        }

   //    });

   //}

}

//document.getElementById("sort").addEventListener("onchange", function() {
//    this.sortMedia();
//});


init();











