//Classe utilitaire contenant toutes les fonctionnalités additionelles du site
class Photographer {
    constructor(photographer, medias) {

        this.photographer = photographer
        this.allMedia = medias
        this.openedMediaIndex = 0
    }

    getInfos() {
        return this.photographer;
    }


    nextMedia() {

        if (this.openedMediaIndex === this.allMedia.length - 1) {
            this.showMedia(0)
        } else {
            this.showMedia(this.openedMediaIndex + 1)
        }
    }

    prevMedia() {
        if (this.openedMediaIndex === 0) this.showMedia(this.allMedia.length - 1)
        else this.showMedia(this.openedMediaIndex - 1)
    }

    // sort media switch criteria
    getSortedMedias(tri) {
        if (tri === 'titre') {
            return this.allMedia.sort(function (a, b) {
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
            return this.allMedia.sort((a, b) => new Date(b.date) - new Date(a.date))
        }

        if (tri === 'popularite') {
            return this.allMedia.sort(function (a, b) {
                return b.likes - a.likes
            })
        }
    }


    // ajoute 1 au coeur d'un média
    incrementLike(coeurIcon) {
        const compteur = coeurIcon.parentNode.querySelectorAll('.compteur') // depuis le parent je prend le compteur
        compteur[0].innerHTML = parseInt(compteur[0].innerHTML) + 1 + ' ';
    }

    closeLightbox() {
        document.getElementById('lightbox').classList.remove('active')
        document.getElementById('main').removeAttribute('aria-hidden');
        document.getElementById('main').setAttribute('aria-hidden', 'false')
        document.getElementById('lightbox').removeAttribute('aria-hidden');
        document.getElementById('lightbox').setAttribute('aria-hidden', 'true')
    }

  /*  focusTrap(focusableElements, modal) {
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        modal.addEventListener('keydown', function (e) {
            console.log('ok');
            let isTabPressed = e.key === 'Tab';
            if (!isTabPressed) {
                return;
            }
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });

        firstFocusableElement.focus();
    } */


    // affiche le media à l'index demandé
    showMedia(index) {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.add('active')
        document.getElementById('main').removeAttribute('aria-hidden');
        document.getElementById('main').setAttribute('aria-hidden', 'true')
        document.getElementById('lightbox').removeAttribute('aria-hidden');
        document.getElementById('lightbox').setAttribute('aria-hidden', 'false')

        this.openedMediaIndex = index;
        //console.log(this.allMedia[])


        if (document.querySelector('#container') !== '') {
            document.querySelector('#container').innerHTML = "";
        }

        if (this.allMedia[index].image) {
            const container = document.getElementById("container")
            const img = document.createElement('img')
            img.src = "assets/images/" + this.allMedia[index].image
            const caption = document.createElement('h4');
            caption.setAttribute('class', 'title')
            caption.innerHTML = this.allMedia[index].title
            lightbox.appendChild(container)
            container.appendChild(img)
            container.appendChild(caption)


        } else if (this.allMedia[index].video) {
            const container = document.querySelector('#container')
            const videoTag = document.createElement('video')
            const source = document.createElement('source')
            videoTag.setAttribute('controls', '')
            source.src = "assets/images/" + this.allMedia[index].video
            source.setAttribute('type', 'video/mp4')
            const caption = document.createElement('h4');
            caption.setAttribute('class', 'title')
            caption.innerHTML = this.allMedia[index].title
            lightbox.appendChild(container)
            container.appendChild(videoTag)
            videoTag.appendChild(source)
            container.appendChild(caption)

        }


        const focusableElements = 'span, a, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = lightbox.querySelectorAll(focusableElements)[0];
        const focusableContent = lightbox.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        lightbox.addEventListener('keydown', function (e) {
            let isTabPressed = e.key === 'Tab';
            if (!isTabPressed) {
                return;
            }
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });

        firstFocusableElement.focus();

      // lightbox.addEventListener("keydown", (e) => {

      //     if (e.key === 'ArrowLeft') this.prevMedia()
      //     if (e.key === 'ArrowRight') this.nextMedia()
      //     if (e.key === 'Escape') this.closeLightbox()

      // })

    }
}


//trap the focus inside an element














