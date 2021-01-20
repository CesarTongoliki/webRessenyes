var url;
function initialView(){
    $('#noExisteix').hide();
}

$(document).ready(function(){
    initialView();
    url = 'http://localhost:3000/api/'
    $("input.newUser").click(function(e){
        let username = $('#nomUser').val();
        let password = $('#passwordUser').val();
        $.ajax({
            dataType: "json",
            type: "POST",
            url: 'http://localhost:3000/login',
            data: {
                name : username,
                password: password
            }
        })
        e.preventDefault();
        if (username != "" && password != ""){
            $.ajax({
                dataType: "json",
                url: url + 'usuaris/' + username + '/' + password
            })
            .done(function(res){
                if (res.response.length === 0){
                    $('.loginbox').animate({height:'450px'}); 
                    $('#noExisteix').show();
                    setTimeout(function(){
                        $('#noExisteix').hide();
                        $('.loginbox').css("height","420px");
                    },2000);
                }else{
                    window.location.href='../home';
                }
            })
            .catch(error => {
                res.json({
                    message: "Error!"
                })
            })
        }
    });
});