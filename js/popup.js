/* 
* Author    : 9fury
* Facebook  : fb.com/sonvuhong9fury
*/

$("#shorten").on('click', function(){
	if($("#originLink").val() !== "" &&  $("#shorten").text() == "Shorten" ) {
        $("#shorten").text("Loading...");
        var originLink = $("#originLink").val();
        bitlyURL(originLink);
        // shortenUrl(originLink);
	}
})

function bitlyURL(originLink) {
    var xhr = new XMLHttpRequest();
    var accessToken = '96e01cbcdb36de3370580c1da154a8bc6402bd69';
    xhr.open("GET", "https://api-ssl.bitly.com/v3/user/link_save?access_token=" + accessToken + "&longUrl=" + originLink);
    xhr.onreadystatechange = function() { 
        if(xhr.readyState == 4) { 
            if(xhr.status==200) {
                var response = JSON.parse(xhr.responseText);
                $("#originLink").val(response.data.link_save.link);
                document.getElementById('titleInput').innerHTML = 'Shorten Link';
                $("#shorten").text("Copy");
                $("#shorten").on('click', function(){
                    if( $("#originLink").val() !== "") {
                        var shortenLink = $("#originLink").val();
                        $("#originLink").select();
                        document.execCommand("Copy");                           
                        $.bootstrapGrowl("<strong>Copied!</strong>", {
                            ele: 'body',
                            type: 'success',
                            width: 'auto',
                            delay: 2000,
                            allow_dismiss: false
                        });
                        // window.close();
                    }
                });     
            } else {
                $("#originLink").val("");
                $("#shorten").text("Shorten");
                alert("Error: Invalid Url !");
            }
        } 
    }
    xhr.send();
}