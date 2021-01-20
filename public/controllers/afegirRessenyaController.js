var text = "";
var valoracio;
var url = "";
var slider;
var output;

function getRangeBar(){
    slider = document.getElementById("myRange");
    output = document.getElementById("demo");
    valoracio = Math.trunc(slider.value/100)
    output.innerHTML = Math.trunc(slider.value/100) + " / 10";
    slider.oninput = function() {
        valoracio = Math.trunc(slider.value/100)
        output.innerHTML = Math.trunc(this.value/100) + " / 10";
    }
}

function sendRessenya(){
    url = "http://localhost:3000/api/ressenyes/"
    $("#newRessenya").click(function(e){
        slider = document.getElementById("myRange");
        valoracio = Math.trunc(slider.value/100)
        text = $("#textRes").val();
        $.ajax({
            dataType : "json",
            url : url,
            type : 'post',
            data : {
                usuari:username,
                film:nomFilm,
                text:text,
                valoracio:valoracio
            }
        })
        .done(function(res){
            if (res.message === 'Ressenya afegida correctament'){
                Swal.fire({
                    title: 'Enhorabona!',
                    text: 'La ressenya ha estat afegida',
                    icon : 'success',
                    confirmButtonColor: '#956352',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../"+nomFilm
                    }
                })
            } else {
                Swal.fire({
                    title: 'Compte!',
                    text: 'Ja tens una ressenya sobre aquest film. El pots eliminar i refer de nou',
                    icon : 'warning',
                    confirmButtonColor: '#956352',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../"+nomFilm
                    }
                })
            }
        })
        .catch(error => {
            res.json({
                message: "error!"
            })
        })
    })
}

function ressenyaAfegida(){
    $(".divAlert").show();
}

$(document).ready(function(){
    $(".divAlert").hide();
    getRangeBar();
    sendRessenya();
});
