const getPhotographers = async () => {
  const { photographers } = await (
    fetch('./data/photographers.json')
      .then((response) => response.json())
  )
  return { photographers }
}

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
};

async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  await displayData(photographers)
};

init()
