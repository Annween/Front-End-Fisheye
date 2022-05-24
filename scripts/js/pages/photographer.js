// display photographer data dynamically for each photographer
function displayPhotographerData(photographer) {
    const photographersSection = document.getElementById('photograph_infos')
    const profileModel = photographerFactory(photographer)
    const profiles = profileModel.getProfilePage()
    photographersSection.appendChild(profiles)
};

// display photographer media data dynamically for each photographer
function displayMediaData(photographerMedias) {
    const photographersSection = document.getElementById('photograph_medias')

    photographersSection.innerHTML = ''

    photographerMedias.forEach((media) => {
        const profileModel = photographerFactory(media)
        const medias = profileModel.getMediaPage()
        photographersSection.appendChild(medias)
    })

    // calls factory function to loop all medias and display a total of like
    const totalLikeModel = photographerFactory(photographerMedias)
    totalLikeModel.getTotalLikes();

};

//set all interaction events
function setDOMInteraction(photographer) {
    let lightbox = document.querySelector('#lightbox');
    const main = document.querySelector('main')

    // add event listener to detect sorting request
    document.getElementById('dropdown-content').addEventListener('click', function (e) {
        document.getElementById('dropbtn').innerHTML = e.target.innerHTML + '<span class="fas fa-angle-up"></span><span class="fas fa-angle-down"></span>'

        let sortedMedias = photographer.getSortedMedias(e.target.id)
        displayMediaData(sortedMedias)
    })

    // foreach hearts' click..
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('incrementLike')) {
            photographer.incrementLike(e.target)
        }
    });

    document.addEventListener('keydown', function (e) {
        const enterIsPressed = e.key === "Enter"
       if(enterIsPressed) {
            if (e.target.classList.contains('incrementLike')) {
                //mise à jour
                document.querySelector('.compteurLikeTotal').innerHTML = parseInt(document.querySelector('.compteurLikeTotal').innerHTML) + 1 + " " + "<span class='fas fa-heart'></span>"
            }
        }
    })


    //detecte le click sur le coeur d'un média
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('incrementLike')) {
            //mise à jour
            document.querySelector('.compteurLikeTotal').innerHTML = parseInt(document.querySelector('.compteurLikeTotal').innerHTML) + 1 + " " + "<span class='fas fa-heart'></span>"
        }
    })


    document.querySelectorAll('.lightboxMedia')
        .forEach(function (media, index) {

            // je bind un click
            media.addEventListener('click', e => {

                if (e.target.classList.contains('lightboxMedia')) {
                    //je lui attribue une classe nommé active qui va permettre de l'afficher
                    lightbox.classList.add('active')

                    //j'appelle ma fonction pour afficher les médias
                    photographer.showMedia(index);

                }
            })

            // je bind un click
            media.addEventListener('keydown', e => {
                const enterIsPressed = e.key === "Enter"
                if (!enterIsPressed) {
                    return;
                } else {
                    //je lui attribue une classe nommé active qui va permettre de l'afficher
                    lightbox.classList.add('active')

                    //j'appelle ma fonction pour afficher les médias
                    photographer.showMedia(index);
                    //document.addEventListener("keydown", (e) => {
                    //    if (e.key === 'ArrowLeft') photographer.prevMedia()
                    //})
//
                    //document.addEventListener("keydown", (e) => {
                    //    if (e.key === 'ArrowRight') photographer.nextMedia()
                    //})
//
                    //document.addEventListener("keydown", (e) => {
                    //    if (e.key === 'Escape') photographer.closeLightbox()
                    //})


                }
            })


        });


        const elementList = document.querySelectorAll('*');
        photographer.focusTrap(elementList, lightbox);

        lightbox.addEventListener("keydown", (e) => {
            if (e.key === 'ArrowLeft') photographer.prevMedia()
        })

        lightbox.addEventListener("keydown", (e) => {
            if (e.key === 'ArrowRight') photographer.nextMedia()
        })

        lightbox.addEventListener("keydown", (e) => {
            if (e.key === 'Escape') photographer.closeLightbox()
        })





    document.addEventListener('keydown', function (e) {
        const enterIsPressed = e.key === "Enter"
        if (!enterIsPressed) {
            return;
        } else {
            if (e.target.classList.contains('incrementLike')) {

                photographer.incrementLike(e.target)
            }
        }

    })


    document.getElementById('dropbtn').addEventListener('keydown', function (e) {
        const enterIsPressed = e.key === "Enter"

        if (!enterIsPressed) {
            return;
        } else {
            //document.getElementById('dropbtn').innerHTML = ""
            document.getElementById('dropdown-content').style.display = 'block'
            document.getElementById('popularite').addEventListener('keydown', function (e) {
                if (!enterIsPressed) {
                    return;
                } else {
                    let sortedMedias = photographer.getSortedMedias('popularite')
                    displayMediaData(sortedMedias)
                }
            })
            document.getElementById('date').addEventListener('keydown', function (e) {
                if (!enterIsPressed) {
                    return;
                } else {
                    let sortedMedias = photographer.getSortedMedias('date')
                    displayMediaData(sortedMedias)
                }

            })

            document.getElementById('titre').addEventListener('keydown', function (e) {
                if (!enterIsPressed) {
                    return;
                } else {
                    let sortedMedias = photographer.getSortedMedias('titre')
                    displayMediaData(sortedMedias)
                }
            })

        }
    })

    document.getElementById('close').addEventListener('click', (e) => {
        photographer.closeLightbox();
    })

    document.querySelector("#nextMedia").addEventListener("click", (e) => {
        photographer.nextMedia()
    })
    document.querySelector("#previousMedia").addEventListener("click", (e) => {

        photographer.prevMedia()
    })

}

// return all info about photographer
async function loadPhotographer() {
    //get id param
    const params = new URLSearchParams(window.location.search)
    const id = parseInt(params.get("id"));

    //get photographer's info and media
    const photographerData = await getPhotographerById(id)
    const medias = await getMediaByPhotographerId(id)
    const photographer = new Photographer(photographerData, medias)

    //display photographer's info and media
    displayPhotographerData(photographer.getInfos())
    //set default sorting (popularity)
    let sortedMedias = photographer.getSortedMedias('popularite')
    displayMediaData(sortedMedias)

    return photographer

}

//init all functions
async function init() {

    const photographer = await loadPhotographer();

    setDOMInteraction(photographer);


};

(function () {
    init()
})()

