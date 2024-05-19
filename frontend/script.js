const jokeId = document.getElementById("jokeId");
const textJoke= document.getElementById("jokeText");
      document
        .getElementById("jokeButton")
        .addEventListener("click", async () => {
          const response = await fetch(
            "http://localhost:3000/jokes/random"
          );
          const joke = await response.json();
          document.getElementById("jokeText").textContent = joke.text;
        });
      // 
      document
        .getElementById("submit_jokeId")
        .addEventListener("click", async () => {
          console.log("id,", jokeId.value);
          if (
            jokeId.value > 0 &&
            fetch("http://localhost:3000/jokes_count") > jokeId.value
          ) {
            const response = await fetch(
              `http://localhost:3000/jokes/${jokeId.value}`
            );
            const joke = await response.json();
            document.getElementById("jokeText").textContent = joke.text;
            console.log(
              "count,",
              await fetch(`http://localhost:3000/jokes_count`)
            );
          }
        });
      document
        .getElementById("allTheJokes")
        .addEventListener("click", async () => {
          const response = await fetch(
            "http://localhost:3000/jokes/text" // http://localhost:3000/jokes/random
          );
          const allJokes = await response.json();

          const docu = document.getElementById("jokeText");
          // efface avant l'ajout pour ne pas stack si on clique plusieurs fois
          docu.innerText = "";

          //Append les childs a l'intérieur de #jokeText
          allJokes.forEach((element) => {
            const child = document.createElement("div");
            child.innerText = element;

            docu.appendChild(child);
          });
        });