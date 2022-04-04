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

  // initialise la lightbox
  initLightbox () {

    // création lightbox
    //const lightbox = document.createElement('div')
   // lightbox.setAttribute('id', 'lightbox')
    //document.body.appendChild(lightbox)

    const lightbox = document.getElementById('lightbox');

    // pour chaque media de la page...
    const allMedia = document.querySelectorAll('.lightboxMedia')
    const util = this;
    console.log(allMedia)
    
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

      document.getElementById('lightbox').appendChild(container)
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


      document.getElementById('lightbox').appendChild(container)
      container.appendChild(video)
      video.appendChild(source)
      container.appendChild(caption)
    }

    // création curseur pour fermer
    const closeCursor = document.createElement('span')
    closeCursor.setAttribute('id', 'close')
    closeCursor.setAttribute('aria-label', 'Close dialog')
    closeCursor.addEventListener('click', e => {
      
      document.getElementById('lightbox').classList.remove('active')
      
    })
    closeCursor.innerHTML = '&times;'

    // création flèche précédent
    const prev = document.createElement('a');
    prev.setAttribute('id', 'previousMedia')
    prev.setAttribute('class', 'prev')
    prev.setAttribute('aria-label', 'Previous image')
    prev.innerHTML = '&#10094;';

    prev.addEventListener('click', e => {

      if(index === 0)
      {
        util.showMedia(allMedia.length - 1)
      }else {
        util.showMedia(index - 1)
      }

    })

    // création flèche suivant
    const next = document.createElement('a');
    next.setAttribute('id', 'nextMedia')
    next.setAttribute('class', 'next')
    next.setAttribute('aria-label', 'Next image')
    next.innerHTML = '&#10095;';
    next.addEventListener('click', e => {
      //si on dépasse alors on revient à 0

      if(index === allMedia.length - 1)
      {
        util.showMedia(0)
      }else{

        util.showMedia(index + 1)

      }

    })


    // insertion dans le dom
    document.getElementById('lightbox').appendChild(closeCursor)
    document.getElementById('lightbox').appendChild(prev)
    document.getElementById('lightbox').appendChild(next)

  }

  arrowKey() {
    document.addEventListener('keydown', function (event) {
      event.preventDefault(); //prevent default arrow key behavior
      const allMedia = document.querySelectorAll('.lightboxMedia')
      const key = event.key; // "ArrowRight", "ArrowLeft"

      switch (event.key) {
        case "ArrowLeft":
          //simule un clique sur l'élément défini
         document.getElementById('previousMedia').click()
          break;
        case "ArrowRight":
          document.getElementById('nextMedia').click()
          break;
      }
    });


  }

}
