	var viewer = null;

	function JSC3DLoad(){
		JSC3D.console.setup('main_frame', '120px');

		var canvas = document.getElementById('cv');
		viewer = new JSC3D.Viewer(canvas);
		// var logoTimerID = 0;
		
		// viewer.setParameter('SceneUrl', '/fs/hard_milk.stl');
		// viewer.setParameter('InitRotationX', 20);
		// viewer.setParameter('InitRotationY', 20);
		// viewer.setParameter('InitRotationZ', 0);
		// viewer.setParameter('ModelColor', '#CAA618');
		// viewer.setParameter('BackgroundColor1', '#FFFFFF');
		// viewer.setParameter('BackgroundColor2', '#383840');
		// viewer.setParameter('RenderMode', 'smooth');
		// viewer.setParameter('SphereMapUrl', 'models/chrome.jpg');
		// viewer.init();
		// viewer.update();

		// viewer.enableDefaultInputHandler(true);

		// logoTimerID = setInterval( function() { 
		// 	viewer.rotate(0, 10, 0);
		// 	viewer.update();
		// }, 100);
		// setTimeout( function() {
		// 	viewer.enableDefaultInputHandler(true); 
		// 	if(logoTimerID > 0)
		// 		loadModel();
		// }, 8000);

		// var ctx = canvas.getContext('2d');
		// ctx.font = '12px Courier New';
		// ctx.fillStyle = '#FF0000';
		// viewer.afterupdate = function() {
		// 	if(logoTimerID > 0)
		// 		return;

		// 	var scene = viewer.getScene();
		// 	if(scene != null && scene.getChildren().length > 0) {
		// 		var objects = scene.getChildren();
		// 		var totalFaceCount = 0;
		// 		var totalVertexCount = 0
		// 		for(var i=0; i<objects.length; i++) {
		// 			totalFaceCount += objects[i].faceCount;
		// 			totalVertexCount += objects[i].vertexBuffer.length / 3;
		// 		}
		// 		ctx.fillText(totalVertexCount.toString() + ' vertices', 10, 20);
		// 		ctx.fillText(totalFaceCount.toString() + ' faces', 10, 35);
		// 	}
		//};

	}

  //this is a handler for a input[file] object.
  //You can also use a drag/drop handler.
  var handle_file_select2 = function(e) {
    // e.stopPropagation()
    // e.preventDefault()
    var file = e.target.files[0];
    //preview_stl(file);
        var theScene;
    var stl_loader;
    var reader = new FileReader();

    reader.onload = (function(file) {
      return function(e) {
      	debugger;
        theScene = new JSC3D.Scene;
        stl_loader = new JSC3D.StlLoader();
        stl_loader.parseStl(theScene, e.target.result);
        viewer.init()
        viewer.replaceScene(theScene);
        viewer.update();
      }
    })(file);
    //preview_stl(file);

    // Read in the image file as a data URL.
    reader.readAsBinaryString(file);
  }



  function preview_stl(file) {
  	debugger;
    var theScene;
    var stl_loader;
    var reader = new FileReader();
    
    function setup_viewer() {
      viewer.setParameter('InitRotationX', 20);
      viewer.setParameter('InitRotationY', 20);
      viewer.setParameter('InitRotationZ', 0);
      viewer.setParameter('ModelColor', '#CAA618');
      viewer.setParameter('BackgroundColor1', '#FFFFFF');
      viewer.setParameter('BackgroundColor2', '#383840');
      viewer.setParameter('RenderMode', "flat");
    }
    //setup_viewer()

    //This closure pattern was inspired by HTML5Rocks' article on the File
    //API. Inside it we put the JSC3D payload which initializes the scene when
    //we pass a new STL file. I haven't seen this usage of parseStl() method
    //documented elsewhere.
    reader.onload = function(file) {
      return function(e) {
      	debugger;
        theScene = new JSC3D.Scene;
        stl_loader = new JSC3D.StlLoader();
        stl_loader.parseStl(theScene, e.target.result);
        //viewer.init()
        viewer.replaceScene(theScene);
        viewer.update();
      }
    };
  }
	function loadModel() {
		if(logoTimerID > 0) {
			clearInterval(logoTimerID);
			logoTimerID = 0;
			viewer.enableDefaultInputHandler(true);
		}
		var models = document.getElementById('model_list');
		viewer.replaceSceneFromUrl('models/' + models[models.selectedIndex].innerHTML);
		viewer.update();
	}