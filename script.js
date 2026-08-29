        const API_URL = "https://pokeapi.co/api/v2/pokemon/";

        const pkmnImage = document.querySelector(".pokemon-image");
        const card = document.querySelector(".card");
        const backCard = document.querySelector(".back-card");
        const cardContainer = document.querySelector(".card-container");
        const sparkles = document.querySelector(".shiny-sparkles");

        cardContainer.addEventListener("click", turnCard);


        const typeColors = {

            fire: "#f08030",
            water: "#6890f0",
            grass: "#78c850",
            electric: "#f8d030",
            ice: "#98d8d8",
            fighting: "#c03028",
            poison: "#a040a0",
            ground: "#e0c068",
            flying: "#a890f0",
            psychic: "#f85888",
            bug: "#a8b820",
            rock: "#b8a038",
            ghost: "#705898",
            dragon: "#7038f8",
            dark: "#705848",
            steel: "#b8b8d0",
            fairy: "#ee99ac",
            normal: "#a8a878"

        };

        let pkmnId = Math.floor(Math.random() * 1028) + 1;
        let isShiny = Math.random() < 0.1;
        let flipped = false;

        async function fetchPokemon() {
            try {
                const response = await fetch(API_URL + pkmnId);
                
                if (!response.ok) {
                    throw new Error("Failed to search the pokemon...");
                }
                
                const pkmn = await response.json();
                console.log(pkmn);

                if (response.status == 200) {
                    let abilities = defineAbilities(pkmn);
                    defineBackground(pkmn);

                    let artwork = "";
                    if (isShiny) {
                        artwork = "front_shiny";
                        sparkles.style.display = "block";
                        pkmnImage.classList.add("shiny");
                    } else {
                        artwork = "front_default";
                        sparkles.style.display = "none";
                        pkmnImage.classList.remove("shiny");
                    }

                    pkmnImage.src =
                        pkmn.sprites.other["official-artwork"][artwork];

                    document.getElementById("pokemon-name").innerHTML = pkmn.name;

                    defineType(pkmn);

                    document.getElementById("pokemon-height").innerHTML =
                        "Height: " + Number((pkmn.height * 0.1).toFixed(1)) + "m";

                    document.getElementById("pokemon-weight").innerHTML =
                        "Weight: " + Number((pkmn.weight * 0.1).toFixed(2)) + "kg";

                    document.getElementById("pokemon-abilities").innerHTML = 
                        "Abilities: " + abilities;
                } else {
                    console.log("Error registered in status code.");
                }
            } catch (e) {
                console.error(e);
            }
        }

        function defineType(pkmn) {
            if (pkmn.types[1]) {
                document.getElementById("pokemon-type").innerText =
                    pkmn.types[0].type.name +
                    " / " +
                    pkmn.types[1].type.name;
            } else {
                document.getElementById("pokemon-type").innerText =
                    pkmn.types[0].type.name;
            }
        }

        function defineBackground(pkmn) {
            const colors = pkmn.types.map(type => {
                return typeColors[type.type.name];
            });

            if (colors.length == 1) {
                card.style.background = colors[0];
                backCard.style.background = colors[0];
            } else {
                card.style.background =
                    `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
                
                backCard.style.background =
                    `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
            }
        }

        function defineAbilities(pkmn) {
            let abilities = "";
            pkmn.abilities.forEach(ab => {
                abilities += ab.ability.name + " | ";
            });
            abilities = abilities.slice(0, -3);

            return abilities;
        }

        function turnCard() {
            cardContainer.classList.toggle("flipped");

            setTimeout(() => {
                randomize();
            }, 50);
        }

        function randomize(){
            pkmnId = Math.floor(Math.random() * 1028) + 1;
            isShiny = Math.random() < 0.1;
            fetchPokemon();
        }

        fetchPokemon();