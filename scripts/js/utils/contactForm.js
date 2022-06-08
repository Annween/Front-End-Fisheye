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
    //document.getElementById('closeBtn').focus()
})

document.querySelector('#contact_button').addEventListener('keydown',  (e) => {
    if (e.key === 'Enter') {
        document.getElementById('closeBtn').focus()
        const main = document.getElementById('main')
        main.removeAttribute('aria-hidden');
        main.setAttribute('aria-hidden', 'true')

        modal.setAttribute('tabindex', -1)
        modal.removeAttribute('aria-hidden')
        modal.setAttribute('aria-hidden', 'false')


        const focusableElements = 'input, button, img, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        modal.addEventListener('keydown',  (e) => {
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

    }
})


document.querySelector(' #closeBtn').addEventListener('keydown',  (e) => {

    if(e.key === 'Enter')
    {
        modal.style.display = "none";
    }
})


document.querySelector('#send').addEventListener('keydown',  (e) =>{

    if(e.key === 'Enter')
    {
        e.preventDefault();
        console.log(document.getElementById('firstname').value, document.getElementById('lastname').value, document.getElementById('email').value)
    }
})


//permet de fermer la modale


document.getElementById('closeBtn').addEventListener('click',  (e) => {
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


document.addEventListener('keydown',  (e) =>{
    if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
        modal.style.display = "none";
    }
})


//permet d'afficher le contenu des champs du formulaire dans la console
document.getElementById('send').addEventListener('click',  (e) => {
    e.preventDefault();
    console.log(document.getElementById('firstname').value, document.getElementById('lastname').value, document.getElementById('email').value)
})


