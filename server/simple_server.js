/**
 * @author Jason Qu
 * This is a simple server of restful we API
 * Conect is a framework of node.js middleware, which handle the reqest from clients
 */

 var connect = require ('connect'); 

 // body parser extract the entire body portion of an incoming request stream and expose it on req.body
 var bodyParser = require ( 'body-parser'); 

 var app = connect()
    .use(bodyParser.json()) //parse JSON
    .use(bodyParser.urlencoded({extended : true}))
    .use (function (req, res , next){
        //Make the response can be shared with resources with the given origin.
        res.setHeader('Access-Control-Allow-Origin', '*'); //Allow any resources
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); //Allow any request method
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with, content-type, X-Session-Token'); //Allow any data type
        res.writeHead(200, {"Content-Type" : "text/plain ; charset=utf-8"}); //Convert to utf-8
        next();
    })
    .use('/news', function(req, res, next){
        console.log(req.body);

        var data = {
            "code": "200",
                "msg": "success",
                "result": [{
					"id":1,
                    "title": "PREMIER BEEHIVE FACTORY EXPANSION",
                    "content": "Work is progressing well on one of Ebert’s newest construction projects, the expansion of Premier Beehive’s bacon and smallgoods processing…"
                },
				{
					"id":2,
                    "title": "COMPLETION OF NORTH SHORE HOSPITAL CLINICAL SKILLS TRAINING CENTRE",
                    "content": "Ebert has officially handed over the new Clinical Skills Training Centre at North Shore Hospital and it has been in full…"
                },
				{
					"id":3,
                    "title": "DARFIELD CREAM CHEESE PROJECT TO GO AHEAD",
                    "content": "We are delighted to have been awarded the contract to build a new cream cheese plant for Fonterra at their…"
                }]
        }
        let dataSent = JSON.stringify(data);
        res.end(dataSent);
        console.log(dataSent);
        next();
    })
    .use('/user_request', (req, res, next) => {
        let [mobile_num, password] = [req.body.mobile, req.body.psd]; 
        console.log('rqeust user id: ', mobile_num, password);
        let data = {};
        let user_data = [
            {"id":"001", "name": "Jason","mobile":"13604058965", "password" : "qazwsx"},
            {"id":"002", "name": "Amy", "mobile":"13604058966", "password" : "qazwsx"},
            {"id":"003", "name": "Ben", "mobile":"13604058967", "password" : "qazwsx"}
        ]

        let result = [];
        let validUser = false;
        
        for (let item of user_data){
            if (item.mobile == mobile_num  &&  item.password==password){
                result.push({"id":item.id, "name":item.name});
                validUser = true;
            }                
        }        

        console.log(validUser);

        if (validUser){
            data = {
            "code" : "200",
            "msg"  : "success",
            "result" : result,
            }
        }else{
            data = {
                "code" : "404",
                "msg"  : "invalid user",
                "result" : []
            }
        }
        console.log(result);        
        let dataSent = JSON.stringify(data);
        res.end(dataSent);
        next();
    })

    .listen(3000);
    console.log('Server started on port 3000.')


