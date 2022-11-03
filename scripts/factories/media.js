let tabindex = 7;
let tabIndexHeart = tabindex + 1;
function mediaFactory (data) {

    const { id, name, city, country, tagline, price, portrait, image, likes, title, video } = data

    const picture = `assets/photographers/${portrait}`

    // affiche les infos du photographe
    function getProfilePage () {

        const section = document.getElementById('photograph_header');
        const mainInfos = document.querySelector('.mainInfos');
        const nomPrenom = document.querySelector('.names')
        nomPrenom.textContent = name

        const location = document.querySelector('.location')

        const villePays = document.querySelector('span.city')
        villePays.textContent = city.concat(', ', country)

        const bio = document.querySelector('p.bio')
        bio.textContent = tagline

        const contact_button = document.getElementById('contact_button')


        const profileImg = document.createElement('img')
        profileImg.setAttribute('src', `assets/photographers/${portrait}`)
        profileImg.setAttribute('class', 'photographImg')
        profileImg.setAttribute('alt', 'profilePic')
        profileImg.ariaLabel = name;

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


        //section.appendChild(photograph_header)
        section.appendChild(mainInfos)
        mainInfos.appendChild(nomPrenom)
        mainInfos.appendChild(location)
        location.appendChild(villePays)
        location.appendChild(bio)
        section.appendChild(contact_button)
        section.appendChild(profileImg)

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
        compteur.textContent = likes +  ' ';
        const heart = document.createElement('span')
        heart.setAttribute('aria-label', 'likes')
        heart.setAttribute('class', 'fas fa-heart incrementLike')
        heart.setAttribute('tabindex', parseInt(tabIndexHeart++))

        // si le fichier contient l'extension JPG on l'affiche avec <img>
        if (jpg.split('.').pop() === 'jpg') {
            const img = document.createElement('img')
            img.setAttribute('class', 'lightboxMedia')
            img.setAttribute('src', jpg)
            img.setAttribute('tabindex', parseInt(tabindex++))
            img.setAttribute('aria-label', title)
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
            videoPlayer.setAttribute('tabindex', parseInt(tabindex++))
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

    // insert total amount of likes in footer bar and upadte itself when media is liked
    function getTotalLikes() {
        let totalLikes = 0
        data.forEach((media) => {
            totalLikes += media.likes;
        });
        document.querySelector('.compteurLikeTotal').innerHTML = totalLikes + " " + "<span class='fas fa-heart'></span>";
    }

    return { getProfilePage, getMediaPage, getTotalLikes }
}

