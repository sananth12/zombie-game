
    var preload;
    $("#loadingOverlay").fadeIn("fast");

	

    ///////////////  ADD THE IMAGE ASSETS AS OBJECTS AS SHOWN BELOW  /////////////////////    
   	var manifest = [
	   {src:"black.png",id:"image2"},
	   {src:"bomb2.png",id:"image3"},
	   {src:"candy1.png",id:"image4"},
	   {src:"info2.png",id:"image5"},
	   {src:"main.png",id:"image6"},
	   {src:"ZombieSheet2.png",id:"image7"},
	   {src:"house.jpg",id:"image8"},
	   {src:"jack.png",id:"image9"},
	   	   	
	];

    function init(){

        /////////////// ADD BASEPATH IN THE SECOND PARAMETER OF THE FOLLOWING LINE  /////////////////////
        //preload : new createjs.LoadQueue(true, "http://festember.com/your/base/path");
        preload = new createjs.LoadQueue(true, "http://localhost/images/");
        
        preload.addEventListener("progress", preloadHandleProgress);
        preload.addEventListener("complete", preloadHandleComplete);
        preload.setMaxConnections(10);
        preload.loadManifest(manifest);

    }

    function stop() {
        if (preload != null) { preload.close(); }
    }

    function preloadHandleProgress(event) {
        if(event)
            $("#loader").text(Math.round((event.loaded*100.0)).toString()+"%") ;
    }

    function preloadHandleComplete(event) { 
        $("#loader").text("Starting Game...");
		var js  = document.createElement("script");
		js.type = "text/javascript";
		js.src  = "gameScript.js";
		document.body.appendChild(js);
		$("#loadingOverlay").fadeOut("fast");
    }

    init();

