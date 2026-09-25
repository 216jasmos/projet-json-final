objectifconst express = require("express");
const app = express();

app.use(express.json()); // permet de lire req.body en JSON

let objectif = [
  { id: 1, nom: "projet de fin d'année", organisation: "Terminal Ciel" },
  { id: 2, nom: "fdsfdsfsd", organisation: "dfgds" },
  { id: 3, nom: "sdfdf", organisation: "gsgds" },
  { id: 4, nom: "sgfsd", organisation: "sgdgdsgds" },
  { id: 5, nom: "sdfgg", organisation: "sdgdgd" },
  { id: 6, nom: "sdgdsdsgds", organisation: "sdgdsgs" }
];

// GET /objectif -> renvoie tout le tableau
app.get("/objectif", (req, res) => {
  if(req.query.nom){
    const nom = req.query.nom;

    if (nom) {
      const resultats = objectif.filter((p) => p.nom === nom);
      return res.json(resultats);
    }
  }else{
    res.json(objectif);
  }
});
  




// Route de test : GET /
app.get("/", (req, res) => {
  res.json({ message: "Mon API fonctionne" });
});

// On demarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
});


// GET /objectif/2 -> renvoie le produit dont l id vaut 2
app.get("/objectif/:id", (req, res) => {
  const id = Number(req.params.id);            // ":id" arrive en texte -> on convertit
  const produit = objectif.find((p) => p.id === id);
  if (!produit) {                              // rien trouve
    return res.status(404).json({ erreur: "Produit introuvable" });
  }
  res.json(produit);
});





// POST /objectif -> ajoute un produit envoye dans le corps de la requete
app.post("/objectif", (req, res) => {
  if (!req.body.nom) {                          // donnee obligatoire manquante
    return res.status(400).json({ erreur: "Le nom est obligatoire" });
  }
  const nouveau = {
    id: objectif.length + 1,
    nom: req.body.nom,
    organisation: req.body.organisation
  };
  objectif.push(nouveau);                       // on ajoute au tableau
  res.status(201).json(nouveau);                // 201 = cree
});



// DELETE /objectif/2 -> supprime le produit n 2
app.delete("/objectif/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = objectif.findIndex((p) => p.id === id);
  if (index === -1) {                           // -1 = pas trouve
    return res.status(404).json({ erreur: "Produit introuvable" });
  }
  objectif.splice(index, 1);                    // retire 1 element a cette position
  res.status(200).json({ message: "Produit supprime" });
});