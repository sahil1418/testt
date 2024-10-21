const balloonContainer = document.getElementById("balloon-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
  display: block;
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    // balloon.innerText = `bvvvvyufyfyuf${i}`
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}

// function removeBalloons() {
//   balloonContainer.style.opacity = 0;
//   setTimeout(() => {
//     balloonContainer.remove()
//   }, 500)
// }

// $('#staticDiv').on('click', '.ballo', function() {
//     //do something
//   });
// var score = 0;
function pop(){
    // const divElement = document.getElementById('yourDivId'); // Replace with your div's ID
    // const childs = balloonContainer.children;

    // childs.forEach(text => {
    //     console.log(text.innerText);
    // });


    // const parentElement = document.getElementById('parent');
    const children = Array.from(balloonContainer.children);

    // Iterate over the child elements
    children.forEach((child) => {
        // console.log(child.tagName); // e.g., "P", "SPAN", "IMG", etc.
        child.addEventListener("click" , function(event){
            this.style.visibility = "hidden";

            // score += 5;
            // if( score == 10) console.log("hurray");
            
            const audio = new Audio('https://soundbible.com/mp3/Blop-Mark_DiAngelo-79054334.mp3');
            audio.play();
            setTimeout(() =>{
                this.style.visibility = "visible"
            } , 5000)

            // child.style.backgroundcolor = "#fff";
        })
    });
    // Iterate through child elements
    // Array.prototype.forEach.call(children, (child) => {
    //     child.addEventListener("click" , (child)=>
    //         child.style.cssText = "display : none;"
    //     )
    //     console.log(child.nodeName); // Log the node name (e.g., "DIV", "SPAN", "P", etc.)
    //   // You can also access child element properties or methods here
    // });
}

createBalloons(30)
    pop()

// setTimeout(() =>{
    
// } , 5000)
// window.addEventListener("load", () => {
//   createBalloons(50)
//   pop()
// });

// window.addEventListener("click", () => {
//   removeBalloons();
// });
