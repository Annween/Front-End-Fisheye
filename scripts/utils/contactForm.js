//permet d'ouvrir la modale
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

//permet de fermer la modale
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//permet d'afficher les champs du formulaire de contact dans la console
function showInputsValue()
{
    document.getElementById('send').addEventListener('click', function (e)
    {
        e.preventDefault();
        console.log(document.getElementById('firstname').value)
    })
}
