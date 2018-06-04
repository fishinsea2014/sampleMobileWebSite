var login = {
    init: function{
        //Advertising page
        showAdPage = (() => {
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
            }, 100);

            function login(){
                console.log("fade out count down");
                $("#count-down").fadeOut(800);
                // debugger;
            }
        })();
    },
    
    validateInput: function(type){
        let cur = $(this);
        let value = cur.val();
        let filter = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

    },

    checkText: function(cur, value, filter, messageType){

    }

}


$(function(){
    login.init();
})

$(function() {

    

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