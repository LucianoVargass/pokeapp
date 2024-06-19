<template>
  <div v-if="pokemon" class="modal-overlay" @click.self="closeModal">
   
    <div class="modal">
     

      <div class="card pokemon-detail">
        <button class="close-button" @click="closeModal">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 0C5.81855 0 0 5.81855 0 13C0 20.1815 5.81855 26 13 26C20.1815 26 26 20.1815 26 13C26 5.81855 20.1815 0 13 0ZM19.3742 16.4125C19.6206 16.6589 19.6206 17.0573 19.3742 17.3036L17.2984 19.3742C17.052 19.6206 16.6536 19.6206 16.4073 19.3742L13 15.9355L9.5875 19.3742C9.34113 19.6206 8.94274 19.6206 8.69637 19.3742L6.62581 17.2984C6.37944 17.052 6.37944 16.6536 6.62581 16.4073L10.0645 13L6.62581 9.5875C6.37944 9.34113 6.37944 8.94274 6.62581 8.69637L8.70161 6.62056C8.94798 6.37419 9.34637 6.37419 9.59274 6.62056L13 10.0645L16.4125 6.62581C16.6589 6.37944 17.0573 6.37944 17.3036 6.62581L19.3794 8.70161C19.6258 8.94798 19.6258 9.34637 19.3794 9.59274L15.9355 13L19.3742 16.4125Z" fill="white"/>
      </svg>
    </button>
        <div class="background">
          <img src="@/assets/fondo.png" alt="Background" class="background-image" />
          <div class="overlay-image">
            <img :src="pokemon.sprites.front_default" class="pokemon-image" :alt="pokemon.name" />
          </div>
          <button class="close-button-overlay" @click="closeModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="card-content row">
          <div class="pokemon-details container col-12">
            <p class="card-text"><span>Name:</span> {{ pokemon.name }}</p>
            <p class="card-text"><span>Height:</span> {{ pokemon.height }}</p>
            <p class="card-text"><span>Weight:</span> {{ pokemon.weight }}</p>
            <p class="card-text"><span>Types:</span> <span v-for="type in pokemon.types" :key="type.type.name">{{ type.type.name }} </span></p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-danger rounded-pill" @click.prevent="sharePokemon">Share to my friends</button>
              <button @click.stop="toggleFavorite" class="favorite-button">
                <svg v-if="isFavorite" width="30" height="30" viewBox="0 0 44 44" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="22" fill="#F5F5F5" />
                  <path
                    d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z"
                    fill="#ECA539" />
                </svg>
                <svg v-else width="30" height="30" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="22" fill="#F5F5F5" />
                  <path
                    d="M20.6052 9.90444L17.4318 16.627L10.3316 17.7086C9.05834 17.9015 8.54806 19.5415 9.47142 20.4809L14.6082 25.7107L13.3933 33.0984C13.1746 34.4338 14.5208 35.4341 15.6482 34.8096L22 31.3213L28.3518 34.8096C29.4792 35.429 30.8254 34.4338 30.6067 33.0984L29.3918 25.7107L34.5286 20.4809C35.4519 19.5415 34.9417 17.9015 33.6684 17.7086L26.5682 16.627L23.3948 9.90444C22.8262 8.70615 21.1787 8.69092 20.6052 9.90444Z"
                    fill="#BFBFBF" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DescriptionPokemon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pokemon: null,
      isFavorite: false
    };
  },
  async created() {
    await this.fetchPokemon();
  },
  methods: {
    async fetchPokemon() {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.name}`);
      this.pokemon = response.data;
    },
    closeModal() {
      this.$emit('close');
      window.location.reload(); // Recarga la página
    },
    async sharePokemon() {
      const text = `Pokémon: ${this.pokemon.name}, Altura: ${this.pokemon.height}, Peso: ${this.pokemon.weight}, Tipos: ${this.pokemon.types.map(t => t.type.name).join(', ')}`;
      await navigator.clipboard.writeText(text);
      alert('Información del Pokémon copiada al portapapeles!');
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    }
  },
  watch: {
    name(newName) {
      this.fetchPokemon();
    }
  }
};
</script>



<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  padding: 20px;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  display: block;
  left: auto;
}

.card {
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 15px;
  overflow: hidden;
  width: 570px;
  height: 506px;
}

.background {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-image {
  width: 40%;
  max-width: 245px;
  object-fit: contain;
}

.card-content {
  padding: 20px;
  position: relative; /* Añadido */
}

.pokemon-details p {
  text-align: left;
  border-bottom: 1px solid #E8E8E8;
}

.card-text span {
  font-weight: 700;
}

.card-text:last-of-type span {
  font-weight: 300;
  margin-right: 4px;
}

.card-text:last-of-type span:nth-child(1) {
  font-weight: 700;
  margin: 0;
}

.btn {
  margin-top: 10px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 100;
}
</style>
