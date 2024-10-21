//document.getElementById("starter").focus();
document.body.addEventListener('onload', setTimeout(function() {

		document.addEventListener('keydown', detectSpaceKey);

		function detectSpaceKey(event)
		{
			if(event.keyCode == 13) {
				showTime();
				startAutoScroll(25000, 1000, 5000);

				setTimeout(function() {
					// Load and execute file2.js
					document.getElementById('onbday').play()
				}, 2000);
				setTimeout(function() {
					// Load and execute file2.js
					document.getElementById('cym').play()
				}, 22000);
				setTimeout(function() {
					// Load and execute file2.js
					document.getElementById('onphoto').play()
				}, 28000);
				setTimeout(function() {
					// Load and execute file2.js
					var script = document.createElement('script');
					script.src = 'hb/hb.js';
					document.head.appendChild(script);
				}, 3000);
				
				setTimeout(function() {
					// Load and execute file2.js
					var script = document.createElement('script');
					script.src = 'balloon/script.js';
					document.head.appendChild(script);
				}, 3000);
			
				setTimeout(function() {
					// Load and execute file2.js
					var script = document.createElement('script');
					script.src = 'Falling-Stars-main/script.js';
					document.head.appendChild(script);
				}, 3000);
			}
		}


		// showTime()
		// setTimeout(()=>{
		// 	window.scrollBy({top:1000 , left: 0 , behavior : 'smooth'});
		// } , 2000)

			  

	}, 1000)
);
// document.addEventListener('keydown', detectSpaceKey);

// function detectSpaceKey(event)
// {
// 	if(event.keyCode == 13) {
// 		showTime();
// 	}
// }

function showTime()
{
	var curtain = document.getElementById("curtain");
	curtain.className = "open";
	
	var scene = document.getElementById("scene");
	scene.className = "expand";
	
	var starter = document.getElementById("starter");
	starter.className = "fade-out";
	
	setTimeout(function() {
        starter.style.display = 'none';
    }, 2000);
}

function easeInOutQuad(t) {
	return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  
  function autoScrollSync(targetY, duration) {
	const startY = window.scrollY;
	const target = startY + targetY;
	const startTime = performance.now();
  
	function scroll() {
	  function animateScroll(now) {
		const elapsedTime = (now - startTime) / duration;
		const progress = Math.min(easeInOutQuad(elapsedTime), 1);
  
		window.scrollTo(0, startY + (targetY * progress));
  
		const elementsToSync = document.querySelectorAll('.sync-scroll');
		elementsToSync.forEach((el) => {
		  el.scrollTop = el.scrollHeight * progress;
		});
  
		if (elapsedTime < 1) {
		  requestAnimationFrame(animateScroll);
		}
	  }
  
	  requestAnimationFrame(animateScroll);
	}
  
	scroll();
  }
  
  function startAutoScroll(interval, scrollDistance, duration) {
	setTimeout(() => {
	  autoScrollSync(scrollDistance, duration);
	}, interval);
  }
  
  // Automatically scroll every 3 seconds (3000ms) by 500px over 1 second (1000ms)
  