// récupération de chaque photographe identifiés par leur id
async function getPhotographer () {
    // je récupère l'id dans l'URL
    //const id = window.location.search.split('id=')[1]

    // je récupère mes données Json
    const photographerData = await (
        fetch('./data/photographers.json')
            .then((response) => response.json())
    )
    return photographerData
}

async function getPhotographerById(id)
{
    const photographerData = await getPhotographer()
    return photographerData.photographers.filter((photographer) => photographer.id === id)[0]
}


async function getMediaByPhotographerId(id)
{
    const photographerData =  await getPhotographer()
    return photographerData.media.filter((media) => media.photographerId === id)
}






