const connection = require("../config/db");
const bcrypt = require("bcrypt");

class ArtistController{

//Muestra el formulario de registro

showRegisterForm = (req, res) => {
    res.render("registerArtist")
};

//Recoge la informacion del formulario

saveArtist = (req, res) => {
    let {artist_name, artist_surname, nick, email, password, description, phone_number} = req.body;
    bcrypt.hash(password, 10, (error,hash) => {
        if(error) throw error;
        let sql = `INSERT INTO artist (artist_name, artist_surname, nick, email, password, description, phone_number) VALUES ("${artist_name}", "${artist_surname}","${nick}","${email}","${hash}","${description}",${phone_number})`
        if(req.file != undefined){
            let artist_img = req.file.filename;
            sql= `INSERT INTO artist (artist_name, artist_surname, nick, email, password, description, phone_number, artist_img) VALUES ("${artist_name}", "${artist_surname}","${nick}","${email}","${hash}","${description}",${phone_number}, "${artist_img}")`
            }

        connection.query(sql, (error, result) => {
            if(error) throw error;
            res.redirect("/artist");
        });
    });
    };

//Muestra el formulario de login
    showFormLogin = (req, res) => {
    res.render("login");
    }


// Recoge la informacion del login
    login = (req, res) => {
        let{email, password} = req.body;
        let sql = `SELECT * FROM artist WHERE email = "${email}"`;
        connection.query(sql, (error, result) => {
            if(error) throw error;
            if(result.length == 1){
                let encryptedPass = result[0].password;
                bcrypt.compare(password, encryptedPass, (err, resultCompare) =>{
                    if(resultCompare){
                        let artist_id = result[0].artist_id
                        res.redirect("/artist");
                    }else{
                        res.send("Contraseña incorrecta");
                    }
                })
            }else {
                res.send("Error en el email");
            };
        });
    };

// Renderizar a todos los artistas con todas sus obras

getAll = (req,res) => {
    let sqlArtists = `SELECT * FROM artist`;
    let sqlWorks = `SELECT * FROM work`;

    connection.query(sqlArtists, (error, resultArtists) =>{
        if(error) throw error;
        connection.query(sqlWorks, (err, resultWorks) =>{
            if(err) throw err;
            res.render("index", {resultArtists, resultWorks});
        });
    });
    };



  // Muestra la vista de perfil de un artista y sus obras

    showOneArtist = (req, res) => {
        let artist_id = req.params.artist_id;
        let sql = `SELECT * FROM artist WHERE artist_id = ${artist_id}`;
        let sql2 = `SELECT * FROM work WHERE artist_id = ${artist_id}`;

        connection.query(sql, (error, resultArtists)=>{
            if(error)throw error;
            connection.query(sql2, (err, resultWorks) =>{
                if(err) throw err;
                res.render("oneArtist", {resultArtists, resultWorks});
            });
        });
    }


};


module.exports = new ArtistController();