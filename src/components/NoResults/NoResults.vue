<template>
    <div class="no-results">
        <h2>Uh-oh!</h2>
        <p>You look lost on your journey!</p>
        <button @click="goBackHome">Go back home</button>
    </div>
</template>

<script>
export default {
    name: 'NoResults',
    methods: {
        goBackHome() {
            this.$router.push('/');
        }
    }
};
</script>

<style>
.no-results {
    text-align: center;
    margin-top: 50px;
}

.no-results h2 {
    font-family: "Lato", sans-serif;
    font-size: 26px;
    font-weight: 700;
}

.no-results p {
    font-family: "Lato", sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #5E5E5E;
}

.no-results button {
    background-color: #F22539;
    border: none;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}
</style>
