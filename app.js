//déclaration des variables et recupération des element avec leur IDS
let formulaire = document.getElementById("project-form");
let nom = document.getElementById("name");
let dateDebut = document.getElementById("date-début");
let dateFin = document.getElementById("date-fin");
let projetList = document.getElementById("projet-list");
// affectation d'un tableau vide pour le remplissage de projet
let projets = [];
let projetEnModification = null;

//BOM

let dimensions = document.getElementById("dimensions");
let navigateur = document.getElementById("navigateur");
let tempsChargement = document.getElementById("temps-chargement");

//largeur de la fenetre et hauteur de la fenetre
dimensions.textContent = "largeur :" + window.innerWidth + "px - Hauteur : " + window.innerHeight + "px";
//infomation sur le navigateur et le systeme d'exploitation utilisé par l'utilisateur
navigateur.textContent = "Navigateur : " + navigator.userAgent;
//temps de chargement de la page
tempsChargement.textContent = "Temps de chargement : " + (performance.now() / 1000).toFixed(2) + " s";

let temps = performance.now();

let nombreProjets = document.getElementById("nombre-projets");


let messageErreur = document.getElementById("message-erreur");
//déclencheur d'évènements 

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();
  messageErreur.textContent = "";

  if (nom.value.trim() === "") {
    messageErreur.textContent = "Veuillez saisir le nom du projet.";
    messageErreur.style.color = "red";
    return;
}
if (dateDebut.value === "" || dateFin.value === "") {
    messageErreur.textContent = "Veuillez renseigner les deux dates.";
    messageErreur.style.color = "red";
    return;
}

  if (dateFin.value < dateDebut.value) {
    messageErreur.textContent = "La date de fin doit être après la date de début.";
    messageErreur.style.color = "red";
  return;
}
  if(
    projetEnModification !== null
  )
  {
      projetEnModification.nom = nom.value;
      projetEnModification.dateDebut = dateDebut.value;
      projetEnModification.dateFin = dateFin.value;
      projetEnModification = null;
    }
  //déclaration de l'objet projet ,ce qui va permettre de faire le remplissage 
  else {
    let projet = {
    nom:nom.value,
    dateDebut:dateDebut.value,
    dateFin: dateFin.value
  };
  //ajout de l'objet projet au tableau projets
  projets.push(projet);
}
  //afficher les projets
  afficherProjets();
  formulaire.reset();

  messageErreur.textContent = "Projet enregistré avec succès.";
  messageErreur.style.color = "#035603";  

});

//fonction de recupération des données du fichier 

function afficherProjets(){
  projetList.innerHTML="";
  projets.forEach(function(projet){
    let element = document.createElement("div");
    element.innerHTML = `<h3>${projet.nom}</h3>
     <p>Date de début : ${projet.dateDebut}</p>
     <p>Date de fin : ${projet.dateFin}</p>
     <button class="supprimer">Supprimer</button>
     <button class="modifier">Modifier</button>`
    ;
    //ajout d'un evenement pour le bouton supprimer
    let supprimerBtn = element.querySelector(".supprimer");
    supprimerBtn.addEventListener("click", function () {
      //suppression du projet du tableau projets à partir de sa position dans le tableau
      let index = projets.indexOf(projet);
      //supprime le projet à cette position 
      projets.splice(index, 1);
      //affiche la liste mise à jour des projets
      afficherProjets();
    });

    let modificationBtn = element.querySelector(".modifier");
    modificationBtn.addEventListener("click",function(){
      nom.value = projet.nom;
      dateDebut.value = projet.dateDebut;
      dateFin.value = projet.dateFin;
      projetEnModification = projet;
    })

    
    projetList.appendChild(element);

  });

  nombreProjets.textContent = "Nombre de projets : " + projets.length;
}

