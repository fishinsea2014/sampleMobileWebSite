$(function() {
    console.log('Login start');
    var num = $("#count-down span b").text();
    var timer;
    $(".jump").click(() =>{
        login();
    })

    timer = setInterval(() => {
        if  ( num>1 ) {
            num--;
            $("#count-down span b").text(num);            
        } else {
            clearInterval(timer);
            login();
        }
    }, 1000);

    function login(){
        console.log("fade out count down");
        $("#count-down").fadeOut(800);
        // debugger;
    }


    //Login
    
	$("#submit").click(() => {
        
		let _mobile = $.trim($(".mobile").val()),
            _psd = $.trim($(".password").val());
        let data ={
            mobile:_mobile,
            psd:_psd
        };
        debugger;

        if(!_mobile|| !_psd|| $(".error-tip").is(":visible")) {
        	if($(".msg-tip").css("right")>='0') return;
            $(".msg-tip").animate({'right':'0'},300);
            debugger;
        }else {
            // window.location.href='index.html';
            debugger;
            //Post mobile and password to server and get the result.
            $.ajax({
                type: "POST", 
                url: "http://localhost:3000/user_request", 
                async: true, 
                data: data,  
                dataType: 'json', 
                success: function (msg) {
                    console.log(msg);
                    if(msg.code =='200'){
                        window.location.href=`index.html?id="${msg.result[0].id}"&name="${msg.result[0].name}"`;
                    }
                    debugger;
                    
                },
                error: function (msg) {
                    console.log(msg);
                    alert('user name or password incorrect.')
                }
            });
        }   
	});
})