var express = require('express');
var router = express.Router();
const artistController = require("../controllers/artistController");
const uploadImage = require("../middleware/uploadImage")

//Ruta raiz del archivo localhost:3000/artist

//(Ver a los artistas)

// localhost:3000/artist
router.get("/", artistController.getAll);

// localhost:3000/artist/oneArtist/:artist_id
router.get("/oneArtist/:artist_id", artistController.showOneArtist);


//(Modificar a los artistas)



//(Reguistrar)

//locahost:3000/artist/registerArtist
router.get("/registerArtist", artistController.showRegisterForm);

//localhost:3000/artist/registerArtist
router.post("/registerArtist", uploadImage("artists"), artistController.saveArtist);


// (Loguear)
//localhost:3000/artist/login
router.get("/login", artistController.showFormLogin);

//localhost:3000/artist/login
router.post("/login", artistController.login);


module.exports = router;
