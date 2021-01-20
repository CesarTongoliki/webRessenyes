var url = "";
var ressenyes = [];
var card;
var ressenyaText = "";
var usuari = "";
var valoracio;
var dia = "";
var hora = "";
var time;
var header;
var idRessenya;
var otherCard;
var otherCardVal;
var val;

function getRangeBar(){
    slider = document.getElementById("myRange");
    output = document.getElementById("demo");
    valoracio = slider.value
    output.innerHTML = valoracio + " / 10";
    slider.oninput = function() {
        valoracio = slider.value
        output.innerHTML = valoracio + " / 10";
        otherCard = document.getElementsByClassName("otherCard");
        otherCardVal = document.getElementsByClassName("valCard");
        for (var i=0; i<otherCardVal.length; i++){
            val = otherCardVal[i].innerHTML
            val = val.split(" ")[1];
            val = val.split("/")[0];
            val=parseInt(val)
            valoracio=parseInt(valoracio)
            console.log(val+"<="+valoracio);
            if (val <= valoracio){
                console.log("entra");
                otherCard[i].style.display = "none";
            }else{
                otherCard[i].style.display = "block";
            }
        }
    }
}

function getTitleUppercase(){
    header = document.getElementById("filmUpper");
    header.innerHTML = header.innerHTML.toUpperCase();
}
function getDirector(){
    url="http://localhost:3000/api/films/"+nomFilm
    $.ajax({
        dataType: "json",
        url: url
    })
    .done(function(res){
        film = res.response
        if (film.length === 1) $('#director').text("Per "+film[0].director)
    })
    .catch(error => {
        res.json({
            message: "error!"
        })
    })
}
function getValues(){
    url="http://localhost:3000/api/ressenyes/"+nomFilm;
    url = url.replace(/\s/g, "%20") 
    $.ajax({
        dataType: "json",
        url: url
    })
    .done(function(res){
        ressenyes = res.response;
        if (ressenyes.length > 0){
            $('#noExisteixen').hide()
            createView();
        } 
    })
    .catch(error => {
        res.json({
            message: "error!"
        })
    })
}


function createView(){
    ressenyes.forEach(element => {
        if (element.usuari != username){
            usuari = element.usuari
            ressenyaText = element.text
            valoracio = element.valoracio
            time = element.createdAt
            dia = time.split("T")[0]
            hora = time.split("T")[1]
            hora = hora.substring(0,5)
            var card = `  	
            <div class="otherCard myCard card">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h5 class="cardHeader card-title">@${usuari}</h5>
                            <h6 class="valCard card-subtitle mb-2 text-muted">Valoració: ${valoracio}/10</h6>
                            <p class="card-text">${ressenyaText}</p>
                        </div>
                    </div>
                    <div class="date row">
                        <div class="col col-9"></div>
                        <div class="col self-align-end">
                            <h6>${dia} a les ${hora}h</h5>
                        </div>
                    </div>
                </div>
            </div>`
            $("#addCards").append(card);
        } else {
            $("#mevaRessenya").show()
            idRessenya = element._id
            ressenyaText = element.text
            valoracio = element.valoracio
            time = element.createdAt
            dia = time.split("T")[0]
            hora = time.split("T")[1]
            hora = hora.substring(0,5)
            var card = `  	
                                <div class="myCard card mb-3" id="myCard">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="cardHeader card-title">@${username}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">Valoració: ${valoracio}/10</h6>
                                    <p class="card-text">${ressenyaText}</p>
                                </div>
                            </div>
                            <div class="date row">
                                <div class="col col-9"></div>
                                <div class="col self-align-end">
                                    <h6>${dia} a les ${hora}h</h5>
                                </div>
                            </div>
                            <div class="row justify-content-md-center">
                                <div class="col-4">
                                    <a onclick="deleteButton()" id="deleteBut" class="btn btn-danger"><b>Eliminar ressenya</b></a>
                                </div>
                            </div>
                        </div>
                    </div>`
            $("#addRessenyaPropia").append(card);
        }
    });
}

function deleteButton(){
    url="http://localhost:3000/api/ressenyes/"+idRessenya;
    Swal.fire({
        title: 'Estàs segur?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#956352',
        cancelButtonColor: '#3B0918',
        confirmButtonText: 'Sí, esborra!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                dataType : "json",
                type : "DELETE",
                url : url
            })
            .then( function(res){
                Swal.fire({
                    title: 'Esborrat!',
                    text: 'La ressenya ha estat eliminada',
                    icon : 'success',
                    confirmButtonColor: '#956352',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = ""
                    }
                })
            })
            .catch( error => {
                res.json({
                    message: "error!"
                })
            })
        }
    })
}

$(document).ready(function(){
    getRangeBar();
    getTitleUppercase();
    getDirector();
    getValues();
});
