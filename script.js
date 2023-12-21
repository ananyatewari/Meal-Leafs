const slides = [
    "./assets/slider1.jpeg",
    "./assets/slider2.webp",
    "./assets/slider3.jpg",
    "./assets/slider4.jpg",
    "./assets/slider5.avif",
    "./assets/slider6.jpg",
    "./assets/slider7.avif",
    "./assets/slider8.avif",
    "./assets/slider9.webp",
    "./assets/slider10.jpg",
    "./assets/slider11.webp",
    "./assets/slider12.jpg"
]
const slider = document.getElementById("slides");
function slideShow(slides) {
    setInterval(() => {
        let a = Math.floor(Math.random() * 12);
        slider.innerHTML = `<img src = "${slides[a]}">`;
        
    }, 2800);

}
slideShow(slides);

document.getElementById("mealdb").onclick = () => {
    window.open("https://www.themealdb.com/", "_blank");
}

document.getElementById("refresh").onclick = () => {
    load.style.display = "flex"
    randomMeal()
}

const load = document.getElementById("loading");

load.style.display = "flex";
randomMeal()

function randomMeal() {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        // console.log(response); 
        generateCard(response);
        viewIngredients(response);
        load.style.display = "none";

    })
    .catch((error) => {
        load.style.display = "flex";
        load.style.display = "none";
        console.log(error)
    })
}

const method = document.getElementById("popup");
const closePopup = document.getElementById("close-pop");
const close = document.getElementById("close");

function generateCard(info) {
    load.style.display = "flex";

    const randomCard = document.getElementById("card");
    // console.log(info.meals["0"]);

    randomCard.innerHTML = "";

    let title = document.createElement("h3");
    title.innerText = info.meals["0"].strMeal;

    let image = document.createElement("img");
    image.setAttribute("src", info.meals["0"].strMealThumb);

    let ingredients = document.createElement("div");
    ingredients.setAttribute("id","view-ing");
    ingredients.innerText = "View Ingredients"

    ingredients.onclick = () => {
        load.style.display = "flex";
        close.style.display = "block";
        method.style.display = "flex";
        load.style.display = "none";
    }

    closePopup.onclick = () => {
        load.style.display = "flex";
        close.style.display = "none";
        method.style.display = "none";
        load.style.display = "none";
    }

    randomCard.appendChild(title);
    randomCard.append(image);
    randomCard.append(ingredients);
    load.style.display = "none";

}

function viewIngredients(info) {
    load.style.display = "flex";
    const popup = document.createElement("div");
    // console.log(info.meals["0"]);
    
    document.getElementById("title-pop").innerHTML = `<h2>${info.meals["0"].strMeal}</h2>`; 
    document.getElementById("image-pop").innerHTML = `<img src ="${info.meals["0"].strMealThumb}">`; 
    document.getElementById("youtube-pop").innerHTML = `youtube tutorial <br> <iframe src="https://www.youtube.com/embed/${info.meals["0"].strYoutube.slice(-11)}" frameborder="0" allowfullscreen = true></iframe>`; 
    var path = `https://www.youtube.com/embed/${info.meals["0"].strYoutube.slice(-11)}`;
    document.getElementById("phone-yt").onclick = () => {
        console.log("hi")
        window.open(`${path}}`, "_blank");
    }

    for (let i = 1; i <= 20; i++) {
        const ingredient = info.meals["0"][`strIngredient${i}`];
        const amount = info.meals["0"][`strMeasure${i}`];
    
        if (ingredient) {
          let ingdiv = document.createElement("div");
          let ingpic = document.createElement("img");
          ingpic.src = `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
          let ingtext = document.createElement("span");
          ingtext.innerHTML = `${ingredient}<br>${amount}`;
          ingdiv.appendChild(ingpic);
          ingdiv.appendChild(ingtext);
    
          document.getElementById("ing-pop").appendChild(ingdiv);
        }
      }

    document.getElementById("method-pop").innerText = `${info.meals["0"].strInstructions}`
    load.style.display = "none";

}

const search = document.getElementById("search-input");
const message = document.getElementById("message");

window.addEventListener("keydown",(press)=>{
    var input = search.value;
    if(press.key == "Enter"){
        if (input){
            load.style.display = "flex";
            message.innerHTML = "";
            searchDish(input); 
        }
        else {
            load.style.display = "flex";
            message.innerHTML = `No results found !`
            load.style.display = "none";

        }   
    }
});

document.getElementById("magnify").onclick = () => {
    var input = search.value;
    if (input){
        load.style.display = "flex";
        message.innerHTML = "";
        searchDish(input); 
    }
    else {
        load.style.display = "flex";
        message.innerHTML = `No results found`;
        load.style.display = "none";

    }
}

function searchDish(dish) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${dish}`)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        const box = document.getElementById("box");
        box.innerHTML = `Showing results for <b>${dish}</b>`
        // console.log(response);
        searchResults(response);
        load.style.display = "none";
        // eachIng(response);
    })
    .catch((error) => {
        const box = document.getElementById("box");
        box.innerHTML = `No results for <b>${dish}</b>`
        results.innerHTML = "";
        console.log(error);
        load.style.display = "none";
    })
}

const methodRes = document.getElementById("popup-res");
const closeRes = document.getElementById("close-pop-res");
const results = document.getElementById("results");

function searchResults(info) {
    load.style.display = "flex";
    let a = info.meals.length;
    // console.log(a);
    
    results.innerHTML = "";
    
    for (let i = 0; i < a; i++) {
        const div = document.createElement("div");
        div.setAttribute("id", "cards")
        let title1 = document.createElement("h3");
        title1.innerText = info.meals[i].strMeal;
        
        let image1 = document.createElement("img");
        image1.setAttribute("src", info.meals[i].strMealThumb);
        
        let ingredients1 = document.createElement("div");
        ingredients1.setAttribute("id","view-ings");
        ingredients1.innerText = "View Ingredients";
        
        div.append(title1);
        div.append(image1);
        div.append(ingredients1);
        results.append(div);

        ingredients1.onclick = () => {
            load.style.display = "flex";
            eachIng(info.meals[i].idMeal)
            close.style.display = "block";
            methodRes.style.display = "flex";
        }
    
        closeRes.onclick = () => {
            load.style.display = "flex"
            close.style.display = "none";
            methodRes.style.display = "none";
            load.style.display = "none"

        }
    
    }    
    load.style.display = "none";
}

function eachIng(info) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${info}`)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        load.style.display = "flex"
        // console.log(response)
        // console.log(response.meals["0"]);
        const popup = document.createElement("div");
        
        document.getElementById("title-pop-res").innerHTML = `<h2>${response.meals["0"].strMeal}</h2>`; 
        document.getElementById("image-pop-res").innerHTML = `<img src ="${response.meals["0"].strMealThumb}">`; 
        document.getElementById("youtube-pop-res").innerHTML = `youtube tutorial <br> <iframe src="https://www.youtube.com/embed/${response.meals["0"].strYoutube.slice(-11)}" frameborder="0" allowfullscreen = true></iframe>`; 
        var path1 = `https://www.youtube.com/embed/${response.meals["0"].strYoutube.slice(-11)}`;
        document.getElementById("phone-yt1").onclick = () => {
            console.log("hi")
            window.open(`${path1}}`, "_blank");
        }
        
        for (let i = 1; i <= 20; i++) {
            const ingredient = response.meals["0"][`strIngredient${i}`];
            const amount = response.meals["0"][`strMeasure${i}`];
            
            if (ingredient) {
                let ingdiv = document.createElement("div");
                let ingpic = document.createElement("img");
                ingpic.src = `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
                let ingtext = document.createElement("span");
                ingtext.innerHTML = `${ingredient}<br>${amount}`;
                ingdiv.appendChild(ingpic);
                ingdiv.appendChild(ingtext);
                
                document.getElementById("ing-pop-res").appendChild(ingdiv);
            }
        }
        
        document.getElementById("method-pop-res").innerHTML = `${response.meals["0"].strInstructions}`
        load.style.display = "none";
    })
    .catch((error) => {
        console.log(error);
    })
}

var scroll = document.querySelectorAll(".scroll");

scroll.forEach((scroll) => {
    scroll.onclick = () => {
            const target = document.body;
            target.scrollIntoView({
                behavior: "smooth"
            })
        }
});