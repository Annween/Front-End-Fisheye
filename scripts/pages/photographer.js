// get each photographer identify by their id
async function getPhotographer () {
  // je récupère l'id dans l'URL
  const id = window.location.search.split('id=')[1]

  // je récupère mes données Json
  const photographerData = await (
    fetch('./data/photographers.json')
      .then((response) => response.json())
  )

  photographerData.photographers = photographerData.photographers.filter((photographer) => photographer.id == id)[0]
  photographerData.media = photographerData.media.filter((media) => media.photographerId == id)

  return photographerData
}

// display data dynamically for each photographer
function displayPhotographerData (photographer) {
  const photographersSection = document.getElementById('photographeInfos')
  const profileModel = photographerFactory(photographer)
  const profiles = profileModel.getProfilePage()
  photographersSection.appendChild(profiles)
};

// display media data dynamically for each photographer
function displayMediaData (photographerMedias) {
  const photographersSection = document.getElementById('photographeMedias')

  photographersSection.innerHTML = ''

  photographerMedias.forEach((media) => {
    const profileModel = photographerFactory(media)
    const medias = profileModel.getMediaPage()
    photographersSection.appendChild(medias)
  })

  // je vais appeler une fonction de la factory pour boucler sur tous les médias et afficher le nombre total de like dans l'info barre
  const totalLikeModel = photographerFactory(photographerMedias)
  totalLikeModel.getTotalLikes();
  
};

async function init () {
  // Récupère les datas des photographes
  const photographerData = await getPhotographer()

  // création de l'objet utilitaire
  const photographerUtils = new PhotographerUtils()

  // je remplis mon tableau de média avec les médias issus du JSON
  let mediaArray = photographerData.media

  // affichage des parties HTML de la page
  displayPhotographerData(photographerData.photographers)
  mediaArray = photographerUtils.sortMedia('popularite', mediaArray)
  displayMediaData(mediaArray)



  // evenement qui detecte la demande de tri des médias
  document.getElementById('dropdown').addEventListener('click', function (e) {
  document.getElementById('sort-button-content').innerHTML = e.target.innerHTML



    mediaArray = photographerUtils.sortMedia(e.target.id, mediaArray)
    displayMediaData(mediaArray)
  })

  // à chaque clic sur un coeur...
  document.addEventListener('click', function (e) {

    if (e.target.classList.contains('incrementLike')) {
      photographerUtils.incrementLike(e.target)
    }
  }, false);

  // appel de la fonction initLightbox qui initialise la lightbox au clic
  // rendre le click rétroactif

  document.addEventListener('click', function (e) {

    if (e.target.classList.contains('lightboxMedia')) {
      photographerUtils.initLightbox()
      photographerUtils.arrowKey()
    }

  })

  //appel à la fonction de navigation avec les flèches du clavier
  



};

(function () {
  init()
})()
