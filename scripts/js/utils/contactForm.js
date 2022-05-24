//permet d'ouvrir la modale
let modal = document.getElementById("contact_modal");


document.querySelector('#contact_button').addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = "block";
    modal.focus();
    const main = document.getElementById('main')
    main.removeAttribute('aria-hidden');
    main.setAttribute('aria-hidden', 'true')

    modal.setAttribute('tabindex', -1)
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-hidden', 'false')
    document.getElementById('closeBtn').focus()
})

document.querySelector('#contact_button').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        modal.focus();
        document.getElementById('closeBtn').focus()
        const main = document.getElementById('main')
        main.removeAttribute('aria-hidden');
        main.setAttribute('aria-hidden', 'true')

        modal.setAttribute('tabindex', -1)
        modal.removeAttribute('aria-hidden')
        modal.setAttribute('aria-hidden', 'false')

    }
})


//permet de fermer la modale


document.getElementById('closeBtn').addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = "none";

    if (modal.style.display === 'none') {
        const main = document.getElementById('main')
        main.removeAttribute('aria-hidden');
        main.setAttribute('aria-hidden', 'false')
        modal.setAttribute('tabindex',)

        modal.removeAttribute('aria-hidden')
        modal.setAttribute('aria-hidden', 'true')
    }
})


document.addEventListener('keydown', function (e) {
    if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
        modal.style.display = "none";
    }
})


//permet d'afficher le contenu des champs du formulaire dans la console
document.getElementById('send').addEventListener('click', function (e) {
    e.preventDefault();
    console.log(document.getElementById('firstname').value, document.getElementById('lastname').value, document.getElementById('email').value)
})


