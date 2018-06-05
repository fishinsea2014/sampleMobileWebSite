var login = {
    init: function() {
        this.showAdPage();
        this.bind();
        this.checkUser();
    },
    //Advertising page
    showAdPage: () => {
            console.log('Login start');
            var num = $("#count-down span b").text();
            var timer;
            $(".jump").click(() =>{
                // debugger;
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
        },
    
        //Validate the input of mobile number and password
        bind: () =>{
        $(".login-content .panel input").on('focus', (e) => {
            $(e.target).siblings(".error-tip").hide;
            $(".msg-tip").animate({'right':'-50%'},300);
        })

        $(".login-content .panel input").on('blur', (e) => {
            let name, reg;
            switch ($(e.target).attr('name')){
                case "mobile":
                    name = 'Mobile';
                    reg = /(^\([0]\d{2}\))(\d{6,7}$)/;
                    // reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                    break;
                case "password":
                    name = 'Password';
                    reg = /^[a-zA-Z]\w{5,17}$/;
                    break;
            }
            // debugger;
            login.validateText($(e.target), $(e.target).val(), reg, name);
        })
    },    
    validateText: function(cur, value, filter, messageType) {
        // debugger;
        if(value == '') {
            cur.siblings(".error-tip").slideDown().text(messageType+' cannot be empty.');
        }else if (!filter.test(value)) {
            cur.siblings(".error-tip").slideDown().text(messageType+' is invalid.');
        }else {
            cur.siblings(".error-tip").slideUp();
        };
    },
    
    //Check the user name and password in server
    checkUser: function() {
        $("#submit").click(() => {
            debugger;
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
    }

}

//When loading the login page
$(function(){
    login.init();
})

