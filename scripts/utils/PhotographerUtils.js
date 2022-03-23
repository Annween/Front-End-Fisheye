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

    const lightbox = document.createElement('div')
    lightbox.setAttribute('id', 'lightbox')

    const closeCursor = document.createElement('span')
    closeCursor.setAttribute('id', 'close')
    closeCursor.setAttribute('onclick', 'closeLightBox()')
    closeCursor.innerHTML = '&times;'

    // pour chaque media de la page...
    const allMedia = document.querySelectorAll('.lightboxMedia')
    //console.log(allMedia)
    allMedia.forEach(media => {
      // je bind un click
      media.addEventListener('click', e => {
        lightbox.classList.add('active')

        // si le media est une image
        const extension = e.target.src
        if (extension.split('.').pop() === 'jpg') {
          const img = document.createElement('img')
          img.src = e.target.src

          const caption = document.createElement('h4');
          caption.setAttribute('class', 'title');
          caption.innerHTML = e.target.alt

          lightbox.appendChild(img)
          lightbox.appendChild(caption)
        }

        // si le media est une vidéo
        //const extensionVideo = e.target.querySelector('source').src
        if (e.target.querySelector('source').src.split('.').pop() === 'mp4') {
          const video = document.createElement('video')
          const source = document.createElement('source')

          video.setAttribute('controls', '')
          source.src = e.target.src
          source.setAttribute('type', 'video/mp4')

          const caption = document.createElement('h4');
          caption.setAttribute('class', 'title');
          caption.innerHTML = e.target.alt


          lightbox.appendChild(video)
          video.appendChild(source)
          lightbox.appendChild(closeCursor)
          lightbox.appendChild(caption)
        }




        //console.log(medias)


        // création de la flèche précédent
        // appel de la fonction this.showMedia(indexDuMediaAAfficher)


        // création de la flèche suivant
        // appel de la fonction this.showMedia(indexDuMediaAAfficher)
      })

    })
    const prev = document.createElement('a');
    prev.setAttribute('class', 'prev')
    prev.innerHTML = '&#10094;';

    const next = document.createElement('a');
    next.setAttribute('class', 'next')
    next.innerHTML = '&#10095;';
    prev.addEventListener('click', this.showMedia(-1))
    next.addEventListener('click', this.showMedia(1))




    document.body.appendChild(lightbox)
    lightbox.appendChild(closeCursor)

    lightbox.appendChild(prev)
    lightbox.appendChild(next)
  }

  showMedia(i)
  {
    const allMedia = document.querySelectorAll('.lightboxMedia')
    //retourne le nombre d'images présentes dans le tableau
    const nbSlides = allMedia.length


    allMedia[i].style.display = "none";

    //si i est < au nbTotal d'image on incrémente i de 1 pour chaque image
    if (i < nbSlides - 1 )
    {
      i++;
  }
    //une fois fini on revient au début
    else
    {
      i = 0;
    }

    allMedia.style.display = "block";
  }
}
