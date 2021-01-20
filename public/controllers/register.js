var url;
function initialView(){
    $('#afegitBe').hide();
    $('#noExisteix').hide();
    $('#emailInvalid').hide();
}

function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$(document).ready(function(){
    initialView();
    url = 'http://localhost:3000/api/usuaris/'
    $("#nomUser").keypress(function(e) {
        if(e.which === 32) 
            return false;
    });
    $("#passwordUser").keypress(function(e) {
        if(e.which === 32) 
            return false;
    });
    $("#emailUser").keypress(function(e) {
        if(e.which === 32) 
            return false;
    });
    $("input.newUser").click(function(e){
        let username = $('#nomUser').val();
        let password = $('#passwordUser').val();
        let email = $('#emailUser').val();
        let edat = $('#edatUser').val();
        if (!validateEmail(email)){
            $('.loginbox').animate({height:'598px'}); 
            $('#emailInvalid').show();
            setTimeout(function(){
                $('#emailInvalid').hide();
                $('.loginbox').css("height","540px");
            },1400);
        }else{
            $.ajax({
                dataType: "json",
                type: "POST",
                url: 'http://localhost:3000/register',
                data: {
                    name : username,
                    password: password,
                    email: email,
                    edat: edat
                }
            })
            if (username != "" && password != "" && email != "" && edat != ""){
                let dataUser = {
                    nom: username,
                    contrasenya: password,
                    email: email,
                    edat: edat
                }
                e.preventDefault();
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: url,
                    data: dataUser
                })
                .done(function(res){
                    if (res.message === "Usuari afegit correctament"){
                        $('.loginbox').animate({height:'598px'}); 
                        $('#afegitBe').show();
                        setTimeout(function(){
                            window.location.href='../home';
                        },1400);
                    }else{
                        $('.loginbox').animate({height:'598px'}); 
                        $('#noExisteix').show();
                        setTimeout(function(){
                            $('#noExisteix').hide();
                            $('.loginbox').css("height","540px");
                        },2000);
                    }
                })
                .catch(error => {
                    res.json({
                        message: "Error!"
                    })
                })
            }
        }
    });
});