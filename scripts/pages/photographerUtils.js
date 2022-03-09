class photographerUtils {
    // sort media switch criteria
    sortMedia() {


        const dropdown = document.getElementById("dropdown");
        //const p  = dropdown.querySelectorAll("p");
        //console.log(p);

        if (document.getElementById("titre").innerText == "titre") {

            mediaArray = mediaArray.sort();
            displayMediaData(mediaArray);
        }

        if (document.getElementById("date").innerText == "date") {

            mediaArray = mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
            displayMediaData(mediaArray);
        }

        if (document.getElementById("popularite").innerText == "popularite") {
            mediaArray = mediaArray.sort(function (a, b) { return a.likes - b.likes })
        }

        //si orderBy = date
        // je tri le tableau media par date

        // si orderBy = ......

        //displayMediaData(media);

    }

    // ajoute 1 au coeur d'un média
    incrementLike() {

        const x = document.getElementById("#photographeMedias");
        const hearts = x.querySelectorAll(".fa-heart"); //je pars de l'icone
        const heartParent = hearts.parentNode; //je remonte au parent

        const compteur = heartParent.querySelectorAll('.compteur'); //depuis le parent je prend le compteur

        const compteurValue = parseInt(compteur.textContent); // je parse sa valeur
        console.log(compteurValue);


        //const lastChild = hearts.lastChild;

        // étape 1 : à partir de l'icone, remonter au parent avec une recherche Google : js get parent element
        // étape 2 : à partir du parent, descendre vers l'enfant ayant la classe que l'on cible (chez nous, compteur) : Google : js get child with class
        // étape 3 : récupérer la value du span compteur, lui ajouter 1, et le réécrire

    }




}

const select = document.getElementById("dropdown");

const photo = new photographerUtils;

// evenement qui detecte le "change" sur le select
select.addEventListener('click', function () {
    photo.sortMedia();
});

const x = document.getElementById("photographeMedias");
const hearts = x.querySelectorAll(".compteur");
//const fin = hearts.lastElementChild;
//const lastChild = hearts.lastChild;
console.log(hearts);



hearts.forEach(heart => heart.addEventListener('click', function () {
    console.log('ok')
    photo.incrementLike(this);

}));

// evenement qui deteche un "click" sur tous les coeurs

// etape 1 : déclarer l'évènement
// étape 2 : s'assurer que l'event fonctionne puis lancer la fonction d'increment des likes ( photographUtil.incrementlike(this) )