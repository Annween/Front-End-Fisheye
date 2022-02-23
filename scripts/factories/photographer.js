function photographerFactory(data) {
    const  { id, name, city, country, tagline, price, portrait, image, likes  } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM(qualifiedName) {
        const ahref = document.createElement('a');
        ahref.setAttribute('class', 'link')
        ahref.setAttribute('href', 'photographer.html?id='+ id);
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const villePays = document.createElement('span');
        const bio = document.createElement('p');
        const prix = document.createElement('div')
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        villePays.textContent = city.concat(', ', country);
        bio.textContent = tagline;
        prix.setAttribute("class", "prix");
        prix.textContent = price + "€ /jour";
        ahref.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(villePays);
        article.appendChild(bio);
        article.appendChild(prix);
        return (ahref);
    }



    function getProfilePage()
    {
        const picture = `samplePhotos/${image}/`;

        const section = document.createElement("section");
        const photograph_header = document.createElement('div');
        photograph_header.setAttribute("class", "photograph-header");

        const mainInfos = document.createElement('div');
        mainInfos.setAttribute('class', 'mainInfos');

        const nomPrenom = document.createElement('h1');
        nomPrenom.setAttribute("class", "names");
        nomPrenom.textContent = name;

        const location = document.createElement('div');
        location.setAttribute('class', 'location');
        const villePays = document.createElement('span');
        villePays.textContent = city.concat(', ', country);
        const bio = document.createElement('p');
        bio.textContent = tagline;

        const contact_button = document.createElement('button');
        contact_button.setAttribute('id', 'contact_button');
        contact_button.setAttribute('class', 'contact_button');
        contact_button.setAttribute('onclick', 'displayModal()');
        contact_button.textContent = "Contactez-moi";

        const profileImg = document.createElement('img');
        profileImg.setAttribute('src', `assets/photographers/${portrait}`);
        profileImg.setAttribute('alt', 'profilePic');

        const price_likes = document.createElement('div');
        price_likes.setAttribute('class', 'price');
        const likes = document.createElement("span");
        likes.textContent = "283 983 ";
        const heart = document.createElement('i');
        heart.setAttribute('aria-label', 'likes');
        heart.setAttribute('class', 'fas fa-heart');
        const priceDay = document.createElement('span');
        priceDay.textContent = price + "€ /jour";



        section.appendChild(photograph_header);
        photograph_header.appendChild(mainInfos);
        mainInfos.appendChild(nomPrenom);
        mainInfos.appendChild(location);
        location.appendChild(villePays);
        location.appendChild(bio);
        photograph_header.appendChild(contact_button);
        photograph_header.appendChild(profileImg);
        section.appendChild(price_likes);
        price_likes.appendChild(likes);
        likes.appendChild(heart);
        price_likes.appendChild(priceDay);


        return (section);

    }


    function getMediaPage()
    {


        const section = document.createElement("section");
        section.setAttribute('class', 'gallery');



        const album = document.createElement("div");
        album.setAttribute('class', 'album');
        const img = document.createElement('img');
        img.setAttribute('class', 'lightbox');
        img.setAttribute('src', `/samplePhotos//${image}`);
        const caption = document.createElement('div');
        caption.setAttribute('class', 'caption');
        const albumTitle = document.createElement('h4');
        albumTitle.textContent = "Arc-en-ciel";
        const like = document.createElement('p');
        like.setAttribute('class', 'like');
        like.textContent = likes;
        const compteur = document.createElement('span');
        compteur.setAttribute('class', 'compteur');
        const heart = document.createElement('i');
        heart.setAttribute('aria-label', 'likes');
        heart.setAttribute('class', 'fas fa-heart');



        section.appendChild(album);
        album.appendChild(img);
        album.appendChild(caption);
        caption.appendChild(albumTitle);
        caption.appendChild(like);
        like.appendChild(compteur);
        like.appendChild(heart);

        return(section);


    }

    return { getUserCardDOM, getProfilePage, getMediaPage }

}
