<template>
    <div class="pokemon-list">
        <div class="search-container m-5">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17.7552 15.5622L14.2499 12.0574C14.0917 11.8992 13.8772 11.8113 13.6522 11.8113H13.0791C14.0495 10.5705 14.6261 9.00967 14.6261 7.31179C14.6261 3.27273 11.3528 0 7.31304 0C3.27329 0 0 3.27273 0 7.31179C0 11.3508 3.27329 14.6236 7.31304 14.6236C9.01121 14.6236 10.5723 14.0471 11.8134 13.0768V13.6498C11.8134 13.8748 11.9013 14.0892 12.0595 14.2474L15.5648 17.7522C15.8953 18.0826 16.4297 18.0826 16.7567 17.7522L17.7517 16.7573C18.0822 16.4269 18.0822 15.8926 17.7552 15.5622ZM7.31304 11.8113C4.82731 11.8113 2.81271 9.80061 2.81271 7.31179C2.81271 4.82648 4.82379 2.81223 7.31304 2.81223C9.79876 2.81223 11.8134 4.82297 11.8134 7.31179C11.8134 9.79709 9.80228 11.8113 7.31304 11.8113Z"
                    fill="#BFBFBF" />
            </svg>
            <input v-model="search" placeholder="Buscar Pokémon..." />
        </div>
        <div class="container">
            <div class="col-md-8 offset-md-2">
                <div v-if="filteredPokemons.length" class="pokemon-list-content">
                    <PokemonListItem v-for="pokemon in filteredPokemons" :key="pokemon.name" :pokemon="pokemon"
                        @toggle-favorite="toggleFavorite" />
                </div>
                <NoResults v-else />
            </div>
        </div>
        <div class="footer py-3">
            <button :class="{ active: showAll }" @click="showAllPokemons" class="btn-all p-2">
                <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.4375 16.9231H0.6875C0.505164 16.9231 0.330295 17.0122 0.201364 17.1709C0.0724328 17.3296 0 17.5448 0 17.7692L0 21.1538C0 21.3783 0.0724328 21.5935 0.201364 21.7522C0.330295 21.9109 0.505164 22 0.6875 22H3.4375C3.61984 22 3.7947 21.9109 3.92364 21.7522C4.05257 21.5935 4.125 21.3783 4.125 21.1538V17.7692C4.125 17.5448 4.05257 17.3296 3.92364 17.1709C3.7947 17.0122 3.61984 16.9231 3.4375 16.9231ZM3.4375 0H0.6875C0.505164 0 0.330295 0.0891481 0.201364 0.247833C0.0724328 0.406517 0 0.62174 0 0.846154L0 4.23077C0 4.45518 0.0724328 4.67041 0.201364 4.82909C0.330295 4.98777 0.505164 5.07692 0.6875 5.07692H3.4375C3.61984 5.07692 3.7947 4.98777 3.92364 4.82909C4.05257 4.67041 4.125 4.45518 4.125 4.23077V0.846154C4.125 0.62174 4.05257 0.406517 3.92364 0.247833C3.7947 0.0891481 3.61984 0 3.4375 0ZM3.4375 8.46154H0.6875C0.505164 8.46154 0.330295 8.55069 0.201364 8.70937C0.0724328 8.86806 0 9.08328 0 9.30769L0 12.6923C0 12.9167 0.0724328 13.1319 0.201364 13.2906C0.330295 13.4493 0.505164 13.5385 0.6875 13.5385H3.4375C3.61984 13.5385 3.7947 13.4493 3.92364 13.2906C4.05257 13.1319 4.125 12.9167 4.125 12.6923V9.30769C4.125 9.08328 4.05257 8.86806 3.92364 8.70937C3.7947 8.55069 3.61984 8.46154 3.4375 8.46154ZM21.3125 17.7692H7.5625C7.38016 17.7692 7.2053 17.8584 7.07636 18.0171C6.94743 18.1757 6.875 18.391 6.875 18.6154V20.3077C6.875 20.5321 6.94743 20.7473 7.07636 20.906C7.2053 21.0647 7.38016 21.1538 7.5625 21.1538H21.3125C21.4948 21.1538 21.6697 21.0647 21.7986 20.906C21.9276 20.7473 22 20.5321 22 20.3077V18.6154C22 18.391 21.9276 18.1757 21.7986 18.0171C21.6697 17.8584 21.4948 17.7692 21.3125 17.7692ZM21.3125 0.846154H7.5625C7.38016 0.846154 7.2053 0.935302 7.07636 1.09399C6.94743 1.25267 6.875 1.46789 6.875 1.69231V3.38462C6.875 3.60903 6.94743 3.82425 7.07636 3.98294C7.2053 4.14162 7.38016 4.23077 7.5625 4.23077H21.3125C21.4948 4.23077 21.6697 4.14162 21.7986 3.98294C21.9276 3.82425 22 3.60903 22 3.38462V1.69231C22 1.46789 21.9276 1.25267 21.7986 1.09399C21.6697 0.935302 21.4948 0.846154 21.3125 0.846154ZM21.3125 9.30769H7.5625C7.38016 9.30769 7.2053 9.39684 7.07636 9.55552C6.94743 9.71421 6.875 9.92943 6.875 10.1538V11.8462C6.875 12.0706 6.94743 12.2858 7.07636 12.4445C7.2053 12.6032 7.38016 12.6923 7.5625 12.6923H21.3125C21.4948 12.6923 21.6697 12.6032 21.7986 12.4445C21.9276 12.2858 22 12.0706 22 11.8462V10.1538C22 9.92943 21.9276 9.71421 21.7986 9.55552C21.6697 9.39684 21.4948 9.30769 21.3125 9.30769Z" fill="white"/>
                </svg>
                All
            </button>
            <button :class="{ active: !showAll }" @click="showFavoritePokemons" class="btn-favorite p-2">
                <svg class="ml-2" width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.81981 0.765294L7.13459 6.45365L1.12675 7.36877C0.0493653 7.53204 -0.38241 8.91975 0.398897 9.71458L4.74543 14.1398L3.7174 20.391C3.53235 21.5209 4.67141 22.3673 5.62543 21.8389L11 18.8873L16.3746 21.8389C17.3286 22.363 18.4677 21.5209 18.2826 20.391L17.2546 14.1398L21.6011 9.71458C22.3824 8.91975 21.9506 7.53204 20.8733 7.36877L14.8654 6.45365L12.1802 0.765294C11.6991 -0.248643 10.305 -0.261532 9.81981 0.765294Z" fill="white"/>
                </svg>
                Favorites
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PokemonListItem from '@/components/PokemonList/PokemonListItem.vue';
import NoResults from '@/components/NoResults/NoResults.vue';

export default {
    name: 'PokemonListView',
    components: {
        PokemonListItem,
        NoResults
    },
    data() {
        return {
            search: '',
            showAll: true
        };
    },
    computed: {
        ...mapGetters(['allPokemons', 'allFavorites']),
        filteredPokemons() {
            let pokemons = this.showAll ? this.allPokemons : this.allFavorites;
            return pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    },
    methods: {
        ...mapActions(['fetchPokemons', 'addFavorite', 'removeFavorite']),
        toggleFavorite(pokemon) {
            if (this.isFavorite(pokemon.name)) {
                this.removeFavorite(pokemon.name);
            } else {
                this.addFavorite(pokemon);
            }
        },
        isFavorite(pokemonName) {
            return this.allFavorites.some(p => p.name === pokemonName);
        },
        showAllPokemons() {
            this.showAll = true;
        },
        showFavoritePokemons() {
            this.showAll = false;
        }
    },
    created() {
        this.fetchPokemons();
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');


.tester {
    background-color: #E0E0E0;
    width: 275px;
    height: 44px;
    top: 638px;
    left: 291px;
    gap: 0px;
    opacity: 0px;

}

.pokemon-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding-bottom: 44px;
    box-sizing: border-box;
    overflow: hidden;
    background: #fafafa;
}

.search-container {
    position: relative;
    width: 100%;
    max-width: 570px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
}

input {
    width: 100%;
    height: 50px;
    padding: 14px 15px 14px 35px;
    /* Deja espacio para el ícono */
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 16px;
    /* Ajuste de tamaño de fuente */
    font-family: 'Montserrat', sans-serif;
    /* Ajuste de familia de fuente */
}

.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
}

.container {
    flex: 1;
    width: 100%;
    max-height: calc(100vh - 94px);
    overflow-y: auto;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.1);
}
.footer button {
    width: 205px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: none;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    font-size: 22px;
    font-weight: 500;
    line-height: 26.4px;
    text-align: center;
    border-radius: 60px;
    margin: 0 10px;
    padding: 0 20px;
    transition: background-color 0.3s ease;
}

.btn-all {
    background: #BFBFBF;
    color: white;
    font-family: "Lato", sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    text-align: center;

}

.btn-all.active {
    background: #F22539;
}

.btn-favorite {
    background: #BFBFBF;
    color: white;
}

.btn-favorite.active {
    background: #F22539;
}

@media (max-width: 768px) {
    .footer button {
        font-size: 18px;
        padding: 0 15px;
    }

    input {
        height: 40px;
        padding: 10px 10px 10px 30px;
    }
}

@media (max-width: 480px) {
    .footer button {
        font-size: 16px;
        padding: 0 10px;
    }

    input {
        height: 35px;
        padding: 8px 8px 8px 25px;
    }
}
</style>
