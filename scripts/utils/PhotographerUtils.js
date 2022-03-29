class PhotographerUtils {
  // sort media switch criteria
  sortMedia (tri, mediaArray) {
    if (tri === 'titre') {
      mediaArray.sort(function (a, b) {
        if (a.title < b.title) {
          return -1
        }
        if (a.title > b.title) {
          return 1
        }
        return 0
      })
    }

    if (tri === 'date') {
      mediaArray = mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    if (tri === 'popularite') {
      mediaArray = mediaArray.sort(function (a, b) {
        return b.likes - a.likes
      })
    }

    return mediaArray
  }

  // ajoute 1 au coeur d'un média
  incrementLike (coeurIcon) {
    const compteur = coeurIcon.parentNode.querySelectorAll('.compteur') // depuis le parent je prend le compteur
    compteur[0].innerHTML = parseInt(compteur[0].innerHTML) + 1
  }

  // ici, je met un commentaire pour expliquer la fonction
  initLightbox () {

    // création lightbox
    const lightbox = document.createElement('div')
    lightbox.setAttribute('id', 'lightbox')
    document.body.appendChild(lightbox)

    // pour chaque media de la page...
    const allMedia = document.querySelectorAll('.lightboxMedia')
    const util = this;
    
    allMedia.forEach(function (media, index){

      // je bind un click
      media.addEventListener('click', e => {

        lightbox.classList.add('active')

        util.showMedia(index);

        
      })

    });
  }

  // affiche le media à l'index demandé
  showMedia(index)
  {

    const util = this;
    
    // reset la lightbox
    document.getElementById('lightbox').innerHTML = ""

    const allMedia = document.querySelectorAll('.lightboxMedia')
    
    const source = allMedia[index].src

    // si le media est une image
    if (source.split('.').pop() === 'jpg') {

      const container = document.createElement('div')
      container.setAttribute('class', 'container')
      
      const img = document.createElement('img')
      img.src = allMedia[index].src

      const caption = document.createElement('h4');
      caption.setAttribute('class', 'title');
      caption.innerHTML = allMedia[index].alt

      lightbox.appendChild(container)
      container.appendChild(img)
      container.appendChild(caption)
    }

    // si le media est une vidéo
    else if (allMedia[index].querySelector('source').src.split('.').pop() === 'mp4') {


      const container = document.createElement('div')
      container.setAttribute('class', 'container')

      const video = document.createElement('video')
      const source = document.createElement('source')

      video.setAttribute('controls', '')
      source.src = allMedia[index].querySelector('source').src
      source.setAttribute('type', 'video/mp4')

      const captionContainer = document.createElement('div')
      captionContainer.setAttribute('class', 'captionContainer')

      const caption = document.createElement('h4');
      caption.setAttribute('class', 'title');
      caption.innerHTML = allMedia[index].parentNode.querySelector('h4').innerHTML


      lightbox.appendChild(container)
      container.appendChild(video)
      video.appendChild(source)
      container.appendChild(caption)
    }

    // création curseur pour fermer
    const closeCursor = document.createElement('span')
    closeCursor.setAttribute('id', 'close')
    closeCursor.addEventListener('click', e => {
      
      document.getElementById('lightbox').classList.remove('active')
      
    })
    closeCursor.innerHTML = '&times;'

    // création flèche précédent
    const prev = document.createElement('a');
    prev.setAttribute('class', 'prev')
    prev.innerHTML = '&#10094;';

    prev.addEventListener('click', e => {

      util.showMedia(index - 1)

        util.showMedia(0)
    })

    // création flèche suivant
    const next = document.createElement('a');
    next.setAttribute('class', 'next')
    next.innerHTML = '&#10095;';
    next.addEventListener('click', e => {

      util.showMedia(index +1)



    })

    // insertion dans le dom
    lightbox.appendChild(closeCursor)
    lightbox.appendChild(prev)
    lightbox.appendChild(next)

  }
}
