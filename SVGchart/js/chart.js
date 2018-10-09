
var chart = function () {
	
	var php = "php/getSums.php";
	
	var xhr = new XMLHttpRequest();
	var formData = new FormData();
	var itemRaw = new Array();

    xhr.open("POST", php, true);
    xhr.onreadystatechange = function() {
        console.log('readyState: ' + xhr.readyState);
        console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Everything ok, get the images
            itemRaw = JSON.parse(xhr.responseText);
			console.log(itemRaw); // handle response.

			//Dump items in the DOM
			for (let c in itemRaw) {
				console.log(c);
				
				//Bar A
				let A = document.querySelector("#barA rect");
				let vA = itemRaw[0].sum;
				
				A.style.height = vA+"px";
    			A.style.transform = "translateY(-"+vA+"px)";
				
				//BarB
				let B = document.querySelector("#barB rect");
				let vB = itemRaw[1].sum;
				
				B.style.height = vB+"px";
    			B.style.transform = "translateY(-"+vB+"px)";
			}
        }
	};
	xhr.send(formData);
};

chart();