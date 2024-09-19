<template>
    <nav>
        <button @click="goBack">&#8592;</button>
        <ul>
            <li>
                <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/saved-launches">Saved Launches</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.back();
};
</script>

<style scoped>
nav {
    background: linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%);
    padding: 1rem 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;
}

button:hover {
    color: #ffcc00;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

li {
    margin-right: 1.5rem;
}

li:last-child {
    margin-right: 0;
}

a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

a:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffcc00;
    text-decoration: none;
}

a.active {
    background-color: rgba(255, 255, 255, 0.2);
    color: #ffcc00;
}
</style>