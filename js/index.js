var indexPage = {
    init: function() {
        console.log('index page');
        this.playBanner();
        this.showUser();
        this.showNews();
    },

    playBanner: function() {
        let index = 0,
            len = $(".banner img").length,
            circle = $(".banner-circle").width();
        $(".banner img").eq(0).show().siblings("img").hide();
        $(".banner-circle").css("margin-left", -(circle*0.5)+"px");
        setInterval(() => {
            index++;
            if (index == len) {
                index = 0;
            }
            $(".banner img").eq(index).show().siblings("img").hide();
            $(".banner-circle ul li").removeClass().eq(index).addClass("selected");
        },3000);        
    },

    showUser: function() {
        let url = location.search;
		let [id, name] = [url.split("%22")[1], url.split("%22")[3]]
		$("#user").append(`<p>Welcome ${name}, id:${id} </p>`);
    },

    showNews: function() {
        $.ajax({
            type:"get",
            url:"http://192.168.0.6:3000/news",
            async:true,
            dataType:"json",
            success:function(msg) {
                console.log(msg);
                if(msg.code == '200'){
					 var data = msg.result;
					//  debugger;

					 for (let item of data){
						// $("#newsContainer").append('<li class="blog-title"><a  href="#" class="pure-u-4-5">'+item.title+'</a><a href="#" class="pure-u-1-5">'+item.content+'</a></li>')
						
						$("#newsContainer").append(`
						<li class="lists">
							<div>
								<i class="iconfont list-icon">&#xe613;</i>
								<span class="list-text">${item.title}</span>							
							</div>
							<div class="news_item">${item.content}</div>
						</li>
						`)
					 }

                    //  $.each(data,function(index,item){
                    //      $(".list-l ul").append('<li class="blog-title"><a  href="#" class="pure-u-4-5">'+item.content+'</a><a href="#" class="pure-u-1-5">'+item.name+'</a></li>')
                    //  });
                 }
            },
            error:function(msg) {
				alert(msg);
            }
      })
    }
}


$(function(){    
    indexPage.init();
})