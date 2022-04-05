function photographerFactory (data) {
  const { id, name, city, country, tagline, price, portrait, image, likes, title, video } = data

  const picture = `assets/photographers/${portrait}`

  // affiche les infos de tous les photographes
  function getUserCardDOM () {
    const ahref = document.createElement('a')
    ahref.setAttribute('class', 'link')
    ahref.setAttribute('href', 'photographer.html?id=' + id)
    const article = document.createElement('article')
    const img = document.createElement('img')

    const villePays = document.createElement('span')
    const bio = document.createElement('p')
    const prix = document.createElement('div')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    const h2 = document.createElement('h2')
    h2.textContent = name
    villePays.textContent = city.concat(', ', country)
    bio.textContent = tagline
    prix.setAttribute('class', 'prix')
    prix.textContent = price + '€ /jour'

    ahref.appendChild(article)
    article.appendChild(img)
    article.appendChild(h2)
    article.appendChild(villePays)
    article.appendChild(bio)
    article.appendChild(prix)
    return (ahref)
  }

  // affiche les infos du photographe
  function getProfilePage () {

    const section = document.createElement('section')
    const photograph_header = document.createElement('nav')
    photograph_header.setAttribute('class', 'photograph-header')

    const mainInfos = document.createElement('div')
    mainInfos.setAttribute('class', 'mainInfos')

    const nomPrenom = document.createElement('h3')
    nomPrenom.setAttribute('class', 'names')
    nomPrenom.textContent = name

    const location = document.createElement('div')
    location.setAttribute('class', 'location')
    const villePays = document.createElement('span')
    villePays.textContent = city.concat(', ', country)
    const bio = document.createElement('p')
    bio.textContent = tagline

    const contact_button = document.createElement('button')
    contact_button.setAttribute('id', 'contact_button')
    contact_button.setAttribute('class', 'contact_button')
    contact_button.setAttribute('onclick', 'displayModal()')
    contact_button.textContent = 'Contactez-moi'

    const profileImg = document.createElement('img')
    profileImg.setAttribute('src', `assets/photographers/${portrait}`)
    profileImg.setAttribute('class', 'photographImg')
    profileImg.setAttribute('alt', 'profilePic')

    // création de mon info barre dans le footer
    const price_likes = document.createElement('div')
    price_likes.setAttribute('class', 'price')
    const likesSpan = document.createElement('span')
    likesSpan.setAttribute('class', 'compteurLikeTotal')

    const heart = document.createElement('span')
    heart.setAttribute('aria-label', 'likes')
    heart.setAttribute('class', 'fas fa-heart')
    const priceDay = document.createElement('span')
    priceDay.textContent = price + '€ /jour'

    section.appendChild(photograph_header)
    photograph_header.appendChild(mainInfos)
    mainInfos.appendChild(nomPrenom)
    mainInfos.appendChild(location)
    location.appendChild(villePays)
    location.appendChild(bio)
    photograph_header.appendChild(contact_button)
    photograph_header.appendChild(profileImg)

    section.appendChild(price_likes)
    price_likes.appendChild(likesSpan)
    likesSpan.appendChild(heart)
    price_likes.appendChild(priceDay)

    return (section)
  }

  // affiche les médias du photographe
  function getMediaPage () {
    const jpg = `assets/images/${image}`
    const mp4 = `assets/images/${video}`

    // const section = document.createElement("section");
    // section.setAttribute('class', 'gallery');

    const album = document.createElement('article')
    album.setAttribute('class', 'album')

    const caption = document.createElement('div')
    caption.setAttribute('class', 'caption')
    const albumTitle = document.createElement('h4')
    if (title.length > 20) {
      albumTitle.textContent = title.substring(0, 24) + '...'
    } else {
      albumTitle.textContent = title
    }

    const like = document.createElement('p')
    like.setAttribute('class', 'like')

    const compteur = document.createElement('span')
    compteur.setAttribute('class', 'compteur')
    compteur.textContent = likes
    const heart = document.createElement('span')
    //heart.setAttribute('aria-label', 'likes')
    heart.setAttribute('class', 'fas fa-heart incrementLike')

    // si le fichier contient l'extension JPG on l'affiche avec <img>
    if (jpg.split('.').pop() === 'jpg') {
      const img = document.createElement('img')
      img.setAttribute('class', 'lightboxMedia')
      img.setAttribute('src', jpg)
      img.setAttribute('alt', title)

      album.appendChild(img)
      album.appendChild(caption)
      caption.appendChild(albumTitle)
      caption.appendChild(like)
      like.appendChild(compteur)
      like.appendChild(heart)
    }

    // si le fichier contient l'extension JPG on l'affiche avec <video>
    if (mp4.split('.').pop() === 'mp4') {
      const videoPlayer = document.createElement('video')
      videoPlayer.setAttribute('controls', '')
      videoPlayer.setAttribute('class', 'lightboxMedia')
      const source = document.createElement('source')
      source.setAttribute('src', mp4)
      source.setAttribute('type', 'video/mp4')
      source.setAttribute('class', 'lightboxImg')


      album.appendChild(videoPlayer)
      videoPlayer.appendChild(source)
      album.appendChild(caption)
      caption.appendChild(albumTitle)
      caption.appendChild(like)
      like.appendChild(compteur)
      like.appendChild(heart)
    }

    return (album)
  }

  // insère le total de like d'un photographe dans la footer barre
  function getTotalLikes() {

    let totalLikes = 0

    data.forEach((media) => {

      totalLikes += media.likes;

    });

    document.querySelector('.compteurLikeTotal').innerHTML = totalLikes + " " + "<span class='fas fa-heart'></span>";
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('incrementLike')) {
        document.querySelector('.compteurLikeTotal').innerHTML = parseInt(document.querySelector('.compteurLikeTotal').innerHTML) + 1 + " " + "<span class='fas fa-heart'></span>"
      }


    })
  }




  return { getUserCardDOM, getProfilePage, getMediaPage, getTotalLikes }
}
