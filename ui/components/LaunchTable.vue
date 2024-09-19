<template>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Flight Number</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="launch in launches" :key="launch.flight_number">
                    <td>{{ launch.flight_number }}</td>
                    <td>{{ launch.name }}</td>
                    <td>{{ new Date(launch.date_utc).toLocaleDateString() }}</td>
                    <td>
                        <button @click="saveLaunch(launch)">Save</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useNuxtApp } from '#app';
import { useLaunchesStore } from '../stores/launches';

const store = useLaunchesStore();

interface Launch {
    flight_number: number;
    name: string;
    date_utc: string;
}

const props = defineProps<{
    launches: Launch[];
}>();

const emits = defineEmits<{
    (e: 'saveLaunch', launch: Launch): void;
}>();

const { $toast } = useNuxtApp();

const saveLaunch = async (launch: Launch) => {
    try {
        await store.saveLaunch(launch);
        emits('saveLaunch', launch);
        $toast.success('Launch saved successfully!', {
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
        console.error('Failed to save launch:', (error as any)?.response?.data?.error);
        $toast.error((error as any)?.response?.data?.error || 'Failed to save launch.', {
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
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}

button {
    background: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
}

button:hover {
    background: linear-gradient(to top, #0a8f50 0%, #34a382 100%);
    transform: translateY(-2px);
}
</style>