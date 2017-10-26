var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');
var cors = require('cors');

var app = express();
var securePort = process.env.EXPRESS_PORT || 7070;
var port = process.env.EXPRESS_PORT || 4333;
var credentials = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// MiddleWare
var corsOptions = {
	origin: function (origin, callback) {
	  callback(null, true)
	}
}
app.use(cors(corsOptions))
app.use(express.static(__dirname));

app.get('/', function(req, res) {
	//path to file you're serving
    // res.sendFile(path.join(__dirname + '/Homepage_Goes_Here.html'));
})
var tier = 0;
function randomTier(cpm, size) {
	if (true) {};
     tier = size + "_tier" + ((Math.floor(cpm * 1) / 2) *1000);
}

function randomNumber(min,max, size) {
	cpm = (Math.random() * (max - min + 1) + min).toFixed(2);
	randomTier(cpm, size);
    return cpm;
}

app.use('/wrapper', express.static('./wrapper.js'));
app.use('/rubi', express.static('./rubi_library.js'));


app.use('/slowlane.json', function(req, res) {
	console.log(req.query);
	randomNumber(2.48, 2.48, req.query.size_id);
	res.setHeader('Access-Control-Allow-Credentials', true)
	res.send({
	    "status": "ok",
	    "account_id": req.query.account_id,
	    "site_id": req.query.site_id,
	    "zone_id": req.query.zone_id,
	    "size_id": req.query.size_id,
	    "alt_size_ids": [2, 10, 55, 57],
	    "tracking": "",
	    "inventory": {},
	    "ads": [{
	        "status": "ok",
	        // "deal": "12345",
	        "impression_id": "945e7afa-0909-418f-bf5e-d61bf0a2aacd",
	        "size_id": req.query.size_id,
	        "ad_id": "3720368",
	        "advertiser": 28712,
	        "network": 2596,
	        "creative_id": 3950748,
	        "type": "script",
        	// "script": "rubicon_cb = Math.random(); rubicon_rurl = document.referrer; if(top.location==document.location){rubicon_rurl = document.location;} rubicon_rurl = escape(rubicon_rurl);\nwindow.rubicon_ad = \"3927028\" + \".\" + \"js\"; window.rubicon_creative = \"4227330\" + \".\" + \"js\"; document.write(\"<div style=\\\"width: 0; height: 0; overflow: hidden;\\\"><img border=\\\"0\\\" width=\\\"1\\\" height=\\\"1\\\" src=\\\"https:\/\/beacon-us-iad2.rubiconproject.com\/beacon\/d\/983eadf2-fedd-4f30-b6ab-47972b33304f?accountId=14062&siteId=70608&zoneId=472364&e=6A1E40E384DA563B12EC9E16392D4B2A77DD148CB8DFA9ECDD2ABC1DBF13338CAC978F7DC61F4934F364E055A3F9108E00821FD0054A7845CF343C2899C616C4462F0F118EA920C1633D5F9B76C3A952145158C5C5E9B318F47E3964DE6172BB2BAA651F658E595EB03D52AE97A44953FF81178D783AC7277EC2A266CC26361EEF47D17614E8C5C16A93BCDE8A3C813B54FF4A445A9C3141B7F2DDA735E87EABF1F2DE44B762333FDF5B769C07F845B654B559DD722B10D1911B9EE26E8FA703DBBB5BEFD80EEF0FBAD878A779252D2F97F998B6BFBB089B5C2C2DDF0194702A\\\" alt=\\\"\\\" \/><\/div>\\n\\n\"); rubicon_tag_code = \"%0a%20%20%20%20%3cdiv%20style=%22text-align:%20center%3b%22%3e%0a%20%20%20%20%20%20%20%3cscript%20type=%22text\/javascript%22%3e%0a%20%20%20%20%20%20%20%20%20%20%20adroll_width%20=%20300%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_height%20=%20250%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_a_id%20=%20%22SV2SF2P76NFIPN7N5SDPHX%22%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_s_id%20=%20%22ISRFVJ4CYZEJLCRYPCOWW4%22%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_c_id%20=%20%22VEP6SGISJFH2JOBFP4OHTQ%22%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_render_link%20=%20false%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_ext_network%20=%20%22n%22%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_subnetwork%20=%20%22r%22%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_ad_payload%20=%20%22__HIAYkBkwHaAXfIAXMAAbvHIMOyzSfEw9jbK9I9OMzF09w1PCjAKMDDyEVqm3Ggv69JiLefSZCLeYi_sYdzQGSQd5jFtnCjQG8_ZyNTdy9nJxcfExcj0wCviBCrcww8Vtw2G5NyEpOz45PyK-ILijKTM_PS3Y4LMj3fPvFv06YdK_ZMf7ru-45ry1m9D8WcY2CaolA6q7RYNzWxuETXMPVM5_qMkpICK339kNTiEr3k_Nwzs89FismdObNgRQlMZBHjmSWSZ04tNzNLSzawND5z-hrLxLNmWmfOAG058ev_xlWf5hxbNw1qy5lfx3mZG1eklmWm5OfFl5y1mnHm7xQDPUOTs0yRa4oLC0rT48vM483ijc4yRR0-yxQH9sJZphO3GBRSLA3STAxSjNPSEo0NTNIskxPNjc2TDC0NLIAUkHmW6fTylMq8xNzM5LNM5-4wCGfqGiQnp5qaJiVaJJkmp1hYWKadZfE5fJZ11eqi1JLEovTUEmBgnGXLOGv2DgCsEjBO-mCTsm_JMymy%22%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_url_macro%20=%20%22test.com%22%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_cpm_macro%20=%20%22469DAB03AFA58DC6%22%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_c_macro%20=%20%22http:\/\/beacon-us-iad2.rubiconproject.com\/beacon\/rs\/983eadf2-fedd-4f30-b6ab-47972b33304f\/0\/SzKZMvyjBsF-TS3LzAg2pp-iQos\/%3furl=%22%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_imp_macros%20=%20undefined%3b%0a%20%20%20%20%20%20%20%20%20%20%20adroll_win_notif%20=%20%22rub-winners-us-east-1-rtb.adroll.com\/win\/n%3fc=W2QKNC25GJCBDL4D25PJXT%3bbid=27570907687813815576952357467216871%3bpayload=__HIAlcAARWOPa-TUACGb27iDzAxjsbZhBu-TgsjBUoLnAMUbikshEJPC_S0pfTyNbo4OznXRScHB72Du4txdLhxNf4EJxPr8OZ98uYZ3lfn-OHqeSrSmKdTDuOYo3ksJvGQGy4ZkRYudcHz8uvj69-fX_99-fH-_Zc3vz78uf_x7tE5-eSzjoFkFmi6PFJMXmGBrS-88-bn1YtVwlKAp1iGoZjhJTx_k-zJ4e60opibmMT9fhc31f_tfHi4fhJFk6kUFKOimcTSAk-lBZSkZT2ZQqvrXaw2Yr40xKlowX5Miw1jy7lkQEXp1HlJOG1dD0Q9M1fYDWVzFWRRFaS9o7lOCvLxaSfnjiZEYYe8tBN3eptgtU1yupHrbCQfk6YR5qeG1QDq1IPV88DuDGpqZrnhwch2uYA3Yc5hux7X9CBIjSiEeHi8o3hw7BgiKoKfBKwc77fSoBzOAtT77Z3qLaA9hyAqYXGYygbHiQXyMvXIFRFq-koQx1lFUmuJ1jNnC8PRJCeu74Y0f0I9Mt0-bpACempzNFsTEZ9gS9JoIKzqqN36GGzaJWqYsgNb3HIk1JhVsb1YwMLjLbi82k3IsHUU-9byKrqbxfzelOmjxws15AUuyxO-m81oqmudiVjp4WFjcdpo5poS53pS6-bIdtU9jTw0rYrWRnnCeopMI3Mq3RYT4g-w121hKbSoh8BEEFB8I2u41DJndwBlrGfzWNcLcmA2gW_EaYhVgPWQYVZlxuimuq-9W5WM1jttYVpazSpruVLzkUUR2atIpMOOdOfTGb89Vd-Dp8--_QM%3bprice_cpm_dollars=%22%3b%0a%20%20%20%20%20%20%20%3c\/script%3e%0a%20%20%20%20%20%20%20%3cscript%20type=%22text\/javascript%22%3e%0a%20%20%20%20%20%20%20%20%20%20%20var%20_url_info%20=%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20('https:'%20==%20'https:'%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3f%20%7badserver_hostname:%22s.adroll.com%22,%20protocol:%22https:\/\/%22%7d%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20:%20%7badserver_hostname:%22a.adroll.com%22,%20protocol:%22http:\/\/%22%7d%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20)%3b%0a%0a%20%20%20%20%20%20%20%20%20%20%20(function%20()%20%7b%0a%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20document.write('%3cscr'+'ipt%20type=%22text\/javascript%22%20src=%22'%20+%20_url_info.protocol%20+%20_url_info.adserver_hostname%20+%20'\/j\/rolling.js%22%3e%3c\/scr'+'ipt%3e')%3b%0a%20%20%20%20%20%20%20%20%20%20%20%7d())%3b%0a%20%20%20%20%20%20%20%3c\/script%3e%0a%20%20%20%20%20%20%20%0a%20%20%20%20%3c\/div%3e%0a%20%20%20%20\"; rubicon_tag_code = rubicon_tag_code.replace(\/##RUBICON_CB##\/g,rubicon_cb); document.write(unescape(rubicon_tag_code)); document.write(\"<div style=\\\"height:0px;width:0px;overflow:hidden\\\"><script>(function(){var proto=\\'https:\\';try{proto=window.top.location.protocol;}catch(e){proto=(document.referrer===\\'\\'?\\'https:\\':document.referrer.split(\\'\/\/\\')[0]);}var server=\\\"http:\/\/tap2-cdn.rubiconproject.com\\\";if(proto==\\\"https:\\\")server=\\\"https:\/\/tap-secure.rubiconproject.com\\\";document.write(\\'<iframe src=\\\"\\'+server+\\'\/partner\/scripts\/rubicon\/emily.html?pc=14062\/70608&geo=na&co=us\\\" frameborder=\\\"0\\\" marginwidth=\\\"0\\\" marginheight=\\\"0\\\" scrolling=\\\"NO\\\" width=\\\"0\\\" height=\\\"0\\\" style=\\\"height:0px;width:0px\\\"><\/iframe>\\');})();<\\\/script><\/div>\\n<script src=\\\"https:\/\/s.update.rubiconproject.com\/2\/873648\/analytics.js?si=70608&di=localhost&ap=&dm=15&pi=472364&ti=983eadf2-fedd-4f30-b6ab-47972b33304f&dt=8736481428691810142000\\\" async=\\\"true\\\"><\\\/script>\\n\\n\");",
        	"script": "document.write(\"<iframe src='https://giphy.com/embed/fGuqeA6PiXINa' width='480' height='206' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>\")",
	        // "script": "document.write(\"lol\")",
	        "campaign_id": 147666,
	        "rtb_rule_id": 1230750,
	        "cpm": .20,
	        "targeting": [{"key":"rpfl_14062","values":["55_tier0250"]}]
	        // "targeting":[{"key":"rpfl_11076","values":[ req.query.size_id + "_tierdealset281"]}]
    	}]
	});
})

// Smarttag spoof
app.use('/optimized_spoof', function(req, res) {
	randomNumber(10, 20, req.query.size_id);
	console.log(req.query.size_id + ": " + tier)

	res.setHeader('Access-Control-Allow-Credentials', true)
	res.send({
	    "status": "ok",
	    "account_id": 12982,
	    "site_id": 52246,
	    "zone_id": 237884,
	    "size_id": 10,
	    "tracking": "",
	    "inventory": {
	        "resize": "300x600"
	    },
	    "ads": [{
	        "status": "no-ads",
	        "reason": "floor-not-met",
	        "error_code": "10",
	        "impression_id": "e74eb7d6-04d9-4faf-af44-34c2d45fbef2"
	    }]
	})
})


var secure = https.createServer(credentials, app);
var notSecure = http.createServer(app);

secure.listen(securePort, function(err) {
  if (err) return console.log(err)
    console.log('Secured localhost started on', securePort)
});

notSecure.listen(port, function(err) {
  if (err) return console.log(err)
    console.log('localhost started on', port)
});