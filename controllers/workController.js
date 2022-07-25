const connection = require("../config/db");

class WorkController{

//Renderizar un formulario para crear una obra

    showRegisterWork = (req, res) =>{
    let artist_id = req.params.artist_id
    res.render("registerWork", {artist_id});
    }     

//Guarda una nueva obra desde artista
    saveWork = (req, res) => {
        let artist_id = req.params.artist_id;
        let {work_name, description} = req.body;

        let sql = `INSERT INTO work (work_name, description, artist_id) VALUES ("${work_name}","${description}",${artist_id},)`;

        if(req.file != undefined){
            let img = req.file.filename;
            sql = `INSERT INTO work (work_name, description, artist_id, work_img ) VALUES ("${work_name}", "${description}",${artist_id},"${img}")`;
        }

        connection.query(sql, (error, result) =>{
        if(error) throw error;
        res.redirect(`/artist/oneArtist/${artist_id}`);
        });
    };

// Mostrar un formulario para guardar una obra desde el navbar
workGallery = (req,res) => {
    let sql = `SELECT * FROM artist`;

    connection.query(sql, (error, result) =>{
        if(error) throw error;
        res.render("workGallery", {result});
        });
    };

// Guardar la informacion del formulario

getWorkGallery = (req, res) => {
    
    let {work_name, description, artist_id} = req.body;

    let sql = `INSERT INTO work (work_name, description, artist_id) VALUES ("${work_name}","${description}",${artist_id},)`;

    if(req.file != undefined){
        let img = req.file.filename;
        sql = `INSERT INTO work (work_name, description, artist_id, work_img ) VALUES ("${work_name}", "${description}",${artist_id},"${img}")`;
    }
        connection.query(sql, (error, result) =>{
        if(error) throw error;
        res.redirect(`/artist/oneArtist/${artist_id}`);
        });
};

//Muestra el formulario de editar Obra
showEditWork = (req, res) => {
    let work_id = req.params.work_id;
    let sql = `SELECT * FROM work WHERE work_id = ${work_id}`
    connection.query(sql, (error, resultado) => {
        if(error) throw error;
        res.render("editWork", {resultado});
    })
};

// Guarda la modificacion de una obra
    saveEditWork = (req, res) => {
    let {work_id, artist_id} = req.params;
    let {work_name, description} = req.body;
    let sql = `UPDATE work SET work_name = "${work_name}", description = "${description}", artist_id = ${artist_id} WHERE work_id = ${work_id}`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        res.redirect(`/artist/oneArtist/${artist_id}`);
    });
};

// Eliminar un plato 
deleteWork = (req, res) => {
    let {work_id, artist_id} = req.params;
    let sql = `Delete from work WHERE work_id = ${work_id}`;
    connection.query(sql,(error, result) => {
       if(error) throw error;
        res.redirect(`/artist/oneArtist/${artist_id}`)
    })

}


};

module.exports = new WorkController();