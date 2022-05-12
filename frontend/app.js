import { createApp } from 'vue'

const app = createApp({
    data() {
        return {
            apiUrl: "https://paul-bourgeoi5.github.io/data/pokemons.json",
            pokemons: [],
            name: "",
            types: {
                water: false,
                fire: false,
                plant: false
            },
            isSortAlpha: false,
            sortAlphaOrIdText: "ordre alphabetique"
        }
    },
    methods: {
        async fetchPokemons() {
            const res = await fetch(this.apiUrl)
            const json = await res.json()
            this.pokemons = json
        },
        getPokemonsFromNameSearch(listPokemons) {
            if (this.name.length >= 1) {
                return listPokemons.filter(pokemon => {
                    return pokemon.name
                        .toLowerCase()
                        .includes(this.name.toLowerCase())
                })
            }

            return listPokemons
        },
        getPokemonsFromTypeSearch(listPokemons) {
            if (this.types.water || this.types.fire || this.types.plant) {
                if (this.types.water) {
                    listPokemons = listPokemons.filter(pokemon => {
                        return pokemon.types.includes("Eau")
                    })
                }
                if (this.types.fire) {
                    listPokemons = listPokemons.filter(pokemon => {
                        return pokemon.types.includes("Feu")
                    })
                }
                if (this.types.plant) {
                    listPokemons = listPokemons.filter(pokemon => {
                        return pokemon.types.includes("Plante")
                    })
                }
            }

            return listPokemons
        },
        executeSortByAlph() {
            this.isSortAlpha = !this.isSortAlpha
            if (this.isSortAlpha) {
                this.sortAlphaOrIdText = "identifiant"
            } else {
                this.sortAlphaOrIdText = "ordre alphabetique"
            }
        },
        getSortByAlphabeticOrId(listPokemons) {
            if (this.isSortAlpha) {
                return listPokemons.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                    /*if (result < 0) {
                        // a avant b
                    } else if (result > 1) {
                        // b avant a
                    } else {
                        // a == b
                    }*/
                })
            } else {
                return listPokemons.sort((a, b) => {
                    return a.id - b.id
                    /*if (result < 0) {
                        // a avant b
                    } else if (result > 1) {
                        // b avant a
                    } else {
                        // a == b
                    }*/
                })
            }
        },
        removePokemon(pokemonId) {
            this.pokemons = this.pokemons.filter(pokemon => {
                return pokemon.id != pokemonId
            })
        }
    },
    computed: {
        getPokemons() {
            let pokemonsToShow = this.pokemons

            pokemonsToShow = this.getPokemonsFromNameSearch(pokemonsToShow)
            pokemonsToShow = this.getPokemonsFromTypeSearch(pokemonsToShow)
            pokemonsToShow = this.getSortByAlphabeticOrId(pokemonsToShow)

            return pokemonsToShow
        }
    },
    mounted() {
        try {
            this.fetchPokemons()
        } catch(err) {
            console.error(err)
        }
    }
})

app.mount('#app')