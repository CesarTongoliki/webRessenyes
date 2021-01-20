// Client

var url;
var films = [];
var card;
var resumLlargFilm = "";
var resumCurtFilm = "";

function searchFilter(){
    $('#filtreFilms').on("keyup", function(){
        var value = $(this).val().toLowerCase();        
        $(".cardHeader").filter(function(){
            if ($(this).text().toLowerCase().indexOf(value)>-1) $(this).parent().parent().parent().parent().show()
            else $(this).parent().parent().parent().parent().hide()
        });
    });
}
function getValues(){
    url='http://localhost:3000/api/films';
    $.ajax({
        dataType: "json",
        url: url
    })
    .done(function(res){
        films = res.response;
        createView();
    })
    .catch(error => {
        res.json({
            message: "error!"
        })
    })
}

function createView(){
    films.forEach(element => {
        resumLlargFilm = element.descripcio
        if (resumLlargFilm.length>170){
            resumCurtFilm = resumLlargFilm.substring(0,170)
            resumCurtFilm = resumCurtFilm + "..."
        }else{
            resumCurtFilm = resumLlargFilm
        }
        var card = `  	
        <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col col-lg-7">
                    <h5 class="cardHeader card-title">${element.nom} (${element.any})</h5>
                    <h6 class="card-subtitle mb-2 text-muted">By ${element.director}</h6>
                    <p class="card-text">${resumCurtFilm}</p>
                </div>
                <div class="col col-lg">
                    <a href="/home/${element.nom}/add" class="btn btn-light btn-lg btn-block"><b>Afegir nova ressenya</b></a>
                    <a href="/home/${element.nom}" class="btn btn-warning btn-lg btn-block"><b>Veure ressenyes del film</b></a>
                </div>
            </div>
            <div class="seeMore row">
                <div class="col col-4"></div>
                <div class="col col">
                    <button id="seeMoreA" class="btn btn-secondary btn-lg btn-block" data-toggle="modal" data-target=".readMoreModal"><b>+ Veure més</b></button>
                    <div class="modal fade readMoreModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">${element.nom} (${element.any})</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">${resumLlargFilm}</div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-4"></div>
            </div>
        </div>
    </div>`
        $("#addCards").append(card);
    });
}

$(document).ready(function(){
    searchFilter();
    getValues();
});
