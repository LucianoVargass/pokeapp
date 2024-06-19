<template>
    <div class="card pokemon-list-item" @click="showDetails">
        <div class="card-body d-flex justify-content-between align-items-center">
            <div class="estiles">
                {{ pokemon.name }}
            </div>
            <button @click.stop="toggleFavorite" class="favorite-button">
                <svg v-if="isFavorite" width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="22" cy="22" r="22" fill="#F5F5F5" />
                    <path d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z" fill="#ECA539" />
                </svg>
                <svg v-else width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="22" cy="22" r="22" fill="#F5F5F5" />
                    <path d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z" fill="#BFBFBF" />
                </svg>
            </button>
        </div>
        <DescriptionPokemon v-if="showingDetails" :name="pokemon.name" @close="showingDetails = false"/>
    </div>
</template>

<script>
import DescriptionPokemon from '../PopUpPokemon/DescriptionPokemon.vue';

export default {
    name: 'PokemonListItem',
    props: {
        pokemon: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showingDetails: false
        };
    },
    computed: {
        isFavorite() {
            return this.$store.getters.allFavorites.some(p => p.name === this.pokemon.name);
        }
    },
    methods: {
        toggleFavorite() {
            this.$emit('toggle-favorite', this.pokemon);
        },
        showDetails() {
            console.log("Showing details for:", this.pokemon.name);
            this.showingDetails = true;
        }
    },
    components: {
        DescriptionPokemon
    }
};
</script>

<style>
.pokemon-list-item {
    padding: 0;
    margin: 10px;
    border: 1px solid #353535;
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 60px;
    cursor: pointer;
}

.card {
    width: 100%;
    height: 100%;
}

.card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
}

.favorite-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.estiles {
    color: #353535;
    text-decoration: none;
}
</style>
