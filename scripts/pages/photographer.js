//Mettre le code JavaScript lié à la page photographer.html
const getPhotographer = async () => { //get each photographer identify by their id
    const {photographers} = await (
        fetch('./data/photographers.json')
            .then((response) => response.json())
    );

    const id = window.location.search.split('id=')[1];//search get url params & split get path of the searched element
    console.log(id);
    //const photographer =  photographers.filter(el => el.id === id);
    //return console.log(photographer); // cannot destructure property photographer

    return  photographers.filter(function (photographer) { // pas d'erreur mais ne retourne pas le HTML de la factory
            return photographer.id === id;
        }
    )
}



async function displayData(photographer) { //display data dynamically for each photographer

    const photographersSection = document.querySelector("#main");

        const profileModel = photographerFactory(photographer);
        const profiles = profileModel.getProfilePage();
        photographersSection.appendChild(profiles);


};


async function init() {
    // Récupère les datas des photographes
    const {photographer} = await getPhotographer();
    await displayData(photographer);
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






