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
    //increase number of likes below media
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('incrementLike')) {
            photographer.incrementLike(e.target)
        }
    });

    //update the total amount of likes
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('incrementLike')) {
            document.querySelector('.compteurLikeTotal').innerHTML = parseInt(document.querySelector('.compteurLikeTotal').innerHTML) + 1 + " " + "<span class='fas fa-heart'></span>"
        }
    })

    document.addEventListener('keydown', function (e) {
       if(e.key === "Enter") {
            if (e.target.classList.contains('incrementLike')) {
                document.querySelector('.compteurLikeTotal').innerHTML = parseInt(document.querySelector('.compteurLikeTotal').innerHTML) + 1 + " " + "<span class='fas fa-heart'></span>"
            }
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
               if(e.key === "Enter") {
                    //show lightbox by adding active class
                    lightbox.classList.add('active')
                    //call showMedia method to constuct lightbox
                    photographer.showMedia(index);
                }
            })
        });

    if (document.getElementById('lightbox').classList.contains('active')) {

        document.getElementById('main').removeAttribute('aria-hidden');
        document.getElementById('main').setAttribute('aria-hidden', 'true')
        lightbox.removeAttribute('aria-hidden');
        lightbox.setAttribute('aria-hidden', 'false')

    } else {
        document.getElementById('main').removeAttribute('aria-hidden');
        document.getElementById('main').setAttribute('aria-hidden', 'false')
        lightbox.removeAttribute('aria-hidden');
        lightbox.setAttribute('aria-hidden', 'true')
    }

    const elementList = 'span, a, [tabindex]:not([tabindex="-1"])';
    photographer.focusTrap(elementList, document.getElementById('lightbox'));

    document.getElementById('lightbox').addEventListener("keydown", (e) => {
        if (e.key === 'ArrowLeft') photographer.prevMedia()
        if (e.key === 'ArrowRight') photographer.nextMedia()
        if (e.key === 'Escape') photographer.closeLightbox()
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

    //increase number of likes below media on keydown
    document.addEventListener('keydown', function (e) {
        if( e.key === "Enter") {
            if (e.target.classList.contains('incrementLike')) {
                photographer.incrementLike(e.target)
            }
        }
    })

    //sort media switch criteria on keydown
    document.getElementById('dropbtn').addEventListener('keydown', function (e) {
        if(e.key === "Enter") {
            document.getElementById('dropdown-content').style.display = 'block'
            const children = document.querySelectorAll('#dropdown-content p[role=listbox]');
            children.forEach(child => {
                child.addEventListener('keydown', function (e) {
                    if (e.key === "Enter") {
                        let sortedMedias = photographer.getSortedMedias(child.id)
                        displayMediaData(sortedMedias)
                    }
                })
            })
        }
        if(e.key === "Escape")
        {
            document.getElementById('dropdown-content').style.display = 'none'
        }
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

