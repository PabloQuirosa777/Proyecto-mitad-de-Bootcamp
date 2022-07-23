var express = require('express');
var router = express.Router();
const workController = require("../controllers/workController");
const uploadImage = require("../middleware/uploadImage");

//Ruta raiz del archivo localhost:3000/work


//localhost:3000/work/registerWork/:artist_id
router.get("/registerWork/:artist_id", workController.showRegisterWork);

//Registrar obra desde artista
//localhost:3000/work/saveWork/:artist_id
router.post("/saveWork/:artist_id", uploadImage("works"), workController.saveWork);

//Registrar obra desde el Nav
//localhost:3000/work/workgallery/
router.get("/workGallery", workController.workGallery);

//localhost:3000/work/workgallery/
router.post("/workGallery",uploadImage("works"), workController.getWorkGallery);

// Modificar la informacion de una obra

//localhost:3000/work/editWork/:work_id
router.get("/editWork/:work_id", workController.showEditWork);

// Modificar la informacion de una obra

//localhost:3000/work/editWork/:work_id/:artist_id
router.post("/editWork/:work_id/:artist_id", workController.saveEditWork);

// Eliminar una obra dentro del artista 
//localhost:3000/work/deleteWork/:work_id/:artist_id
router.get("/deleteWork/:work_id/:artist_id", workController.deleteWork);
module.exports = router;