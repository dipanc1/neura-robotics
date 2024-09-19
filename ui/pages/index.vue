<template>
    <Navbar />
    <h1>SpaceX Launches</h1>
    <div>
        <Spinner v-if="isFetching" />
        <div v-else>
            <LaunchTable :launches="launches" @saveLaunch="saveLaunch" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useLaunchesStore } from '../stores/launches';
import { useNuxtApp } from '#app';
import Navbar from '../components/Navbar.vue';
import Spinner from '../components/Spinner.vue';


// Define the Launch interface
interface Launch {
    flight_number: number;
    name: string;
    date_utc: string;
}

const store = useLaunchesStore();
const { $toast } = useNuxtApp();
const isFetching = ref(false);

onMounted(async () => {
    isFetching.value = true;
    try {
        await store.fetchLaunches();
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

// Use computed to make launches reactive
const launches = computed(() => store.launches);

const saveLaunch = (launch: Launch) => {
    store.saveLaunch(launch);
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 2.5em;
    font-weight: bold;
}

</style>