
// eslint-disable-next-line no-unused-vars
class PhotographerUtils {
  // sort media switch criteria
  sortMedia (tri, mediaArray) {
    if (tri == 'titre') {
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

    if (tri == 'date') {
      mediaArray = mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    if (tri == 'popularite') {
      mediaArray = mediaArray.sort(function (a, b) {
        return a.likes - b.likes
      })
    }

    return mediaArray
  }

  // ajoute 1 au coeur d'un média
  incrementLike (coeurIcon) {
    const compteur = coeurIcon.parentNode.querySelectorAll('.compteur') // depuis le parent je prend le compteur

    for (const compteurValue of compteur) {
      const nb = parseInt(compteurValue.innerText)
      compteurValue.innerHTML = nb + 1
    }

    // étape 1 : à partir de l'icone, remonter au parent avec une recherche Google : js get parent element
    // étape 2 : à partir du parent, descendre vers l'enfant ayant la classe que l'on cible (chez nous, compteur) : Google : js get child with class
    // étape 3 : récupérer la value du span compteur, lui ajouter 1, et le réécrire
  }
  // evenement qui deteche un "click" sur tous les coeurs

// etape 1 : déclarer l'évènement
// étape 2 : s'assurer que l'event fonctionne puis lancer la fonction d'increment des likes ( photographUtil.incrementlike(this) )
}
