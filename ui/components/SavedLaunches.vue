<template>
    <h1>Saved Launches</h1>
    <div class="container">
        <Spinner v-if="isFetching" />
        <table v-else>
            <thead>
                <tr>
                    <th>Flight Number</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="launch in savedLaunches" :key="launch.flight_number">
                    <td>{{ launch.flight_number }}</td>
                    <td>{{ launch.name }}</td>
                    <td>{{ new Date(launch.date_utc).toLocaleDateString() }}</td>
                    <td>
                        <button @click="deleteLaunch(launch.flight_number)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useLaunchesStore } from '../stores/launches';
import { useNuxtApp } from '#app';
import Spinner from './Spinner.vue';

const store = useLaunchesStore();
const { $toast } = useNuxtApp();
const isFetching = ref(false);

onMounted(async () => {
    isFetching.value = true;
    try {
        await store.fetchSavedLaunches();
    } catch (error) {
        $toast.error('Failed to fetch launches.', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            showCloseButtonOnHover: true,
            hideProgressBar: false,
            closeButton: 'button',
            icon: true,
            rtl: false,
        });
    } finally {
        isFetching.value = false;
    }
});
const savedLaunches = computed(() => store.savedLaunches);

const deleteLaunch = async (flightNumber: number) => {
    try {
        await store.deleteLaunch(flightNumber);
        $toast.success('Launch deleted successfully!', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            showCloseButtonOnHover: true,
            hideProgressBar: false,
            closeButton: 'button',
            icon: true,
            rtl: false,
        });
    } catch (error) {
        $toast.error('Failed to delete launch.', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            showCloseButtonOnHover: true,
            hideProgressBar: false,
            closeButton: 'button',
            icon: true,
            rtl: false,
        });
    }
};
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 2.5em;
    font-weight: bold;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th,
td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background: linear-gradient(to top, #09203f 0%, #537895 100%);
    color: white;
    font-weight: bold;
    text-transform: uppercase;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}

button {
    padding: 10px 15px;
    background: linear-gradient(135deg, #f87171, #ef4444);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    transform: translateY(-2px);
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>