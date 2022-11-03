// display photographer data dynamically for each photographer
function displayPhotographerData(photographer) {
    const photographersSection = document.getElementById('photograph_infos')
    const profileModel = photographerFactory(photographer)
    const profiles = profileModel.getProfilePage()
    photographersSection.appendChild(profiles)
};

// display photographer media data dynamically for each photographer
function displayMediaData(photographer, mediaArray) {
    const photographersSection = document.getElementById('photograph_medias')
    //const index = photographer.openedMediaIndex
    photographersSection.innerHTML = ''
    //this.openedMediaIndex = index;
    mediaArray.forEach((media, index) => {
        const profileModel = mediaFactory(media)
        const medias = profileModel.getMediaPage()
        // je bind un click
        medias.querySelector('.lightboxMedia').addEventListener('click', e => {
            //console.log(photographer.showMedia(this.openedMediaIndex))
            //call showMedia method to constuct lightbox
            photographer.showMedia(index);
        })
        // je bind
        medias.querySelector('.lightboxMedia').addEventListener('keydown', e => {
            if (e.key === "Enter") {
                //call showMedia method to constuct lightbox
                photographer.showMedia(index);
            }
        })
        photographersSection.appendChild(medias)
    })
    // calls factory function to loop all medias and display a total of like
    const totalLikeModel = mediaFactory(mediaArray)
    totalLikeModel.getTotalLikes();
};

//creer une fonction pour aria hidden
function setAriaHiddenFalseLightbox()
{
    document.getElementById('main').removeAttribute('aria-hidden');
    document.getElementById('main').setAttribute('aria-hidden', 'true')
    document.getElementById('lightbox').removeAttribute('aria-hidden');
    document.getElementById('lightbox').setAttribute('aria-hidden', 'false')
    document.getElementById('lightbox').focus();

}


//set all interaction events
function setDOMInteraction(photographer) {

    //set default tabIndex when lightbox is closed


    // add event listener to detect sorting request
    document.getElementById('dropdown-content').addEventListener('click', (e) => {

        document.getElementById('dropbtn').innerHTML = e.target.innerHTML + '<span class="fas fa-angle-up"></span><span class="fas fa-angle-down"></span>'
        let sortedMedias = photographer.getSortedMedias(e.target.id)
        displayMediaData(photographer,sortedMedias)
    })

    // foreach hearts' click..
    //increase number of likes below media
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('incrementLike')) {
            photographer.incrementLike(e.target)
        }
    });

    //update the total amount of likes
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('incrementLike')) {
            document.querySelector('.compteurLikeTotal').innerHTML = parseInt(document.querySelector('.compteurLikeTotal').innerHTML) + 1 + " " + "<span class='fas fa-heart'></span>"
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            if (e.target.classList.contains('incrementLike')) {
                document.querySelector('.compteurLikeTotal').innerHTML = parseInt(document.querySelector('.compteurLikeTotal').innerHTML) + 1 + " " + "<span class='fas fa-heart'></span>"
            }
        }
    })




  document.getElementById('lightbox').addEventListener("keydown", (e) => {
        if (e.key === 'ArrowLeft') photographer.prevMedia()
        if (e.key === 'ArrowRight') photographer.nextMedia()
        if (e.key === 'Escape') photographer.closeLightbox()
    })

    document.querySelector("#nextMedia").addEventListener("keydown", (e) => {
        if (e.key === 'Enter')  photographer.nextMedia()
    })

    document.querySelector("#previousMedia").addEventListener("keydown", (e) => {
        if (e.key === 'Enter')  photographer.prevMedia()
    })

    document.querySelector("#close").addEventListener("keydown", (e) => {
        if (e.key === 'Enter')  photographer.closeLightbox()

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
    document.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            if (e.target.classList.contains('incrementLike')) {
                photographer.incrementLike(e.target)
            }
        }
    })
    const children = document.querySelectorAll('#dropdown-content p[role=listbox]');
    //sort media switch criteria on keydown
    document.getElementById('dropbtn').addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            children.forEach(child => {
                child.setAttribute('aria-expanded', 'true');
                child.setAttribute('aria-selected', 'true');

            })

            document.getElementById('dropbtn').tabIndex = -1;
            document.getElementById('dropbtn').ariaExpanded = true;
            document.getElementById('dropdown-content').style.display = 'block'
        }
        if (e.key === "Escape") {
            document.getElementById('dropdown-content').style.display = 'none'
        }
    })

    children.forEach(child => {
        child.addEventListener('keydown', function (e) {
            if (e.key === "Enter") {
                let sortedMedias = photographer.getSortedMedias(child.id)
                displayMediaData(photographer, sortedMedias)
                //document.getElementById('dropdown-content').style.display = 'none'
            }
        })
    })
}


async function loadPhotographer() {

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
    displayMediaData(photographer, sortedMedias)

    return photographer
}


async function init() {
    const photographer = await loadPhotographer();
    setDOMInteraction(photographer);

};

(function () {
    init()
})()

