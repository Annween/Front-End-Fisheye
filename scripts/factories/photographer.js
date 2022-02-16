function photographerFactory(data) {
    const  { id, name, city, country, tagline, price, portrait } = data || {};

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
           const photograph_header = document.createElement('div');
            photograph_header.setAttribute("class", "photographer-header");
            const nomPrenom = document.createElement("h1");
            nomPrenom.textContent = name;
            return (photograph_header);


    }

    return { id, getUserCardDOM, getProfilePage }

}
