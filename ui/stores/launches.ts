import { defineStore } from 'pinia';
import axios from 'axios';

// Define the Launch interface
interface Launch {
  flight_number: number;
  name: string;
  date_utc: string;
}

const LOCAL_SERVER = 'http://localhost:3001';
const SPACEX_API = 'https://api.spacexdata.com/v4/launches/query';

const endpoints = {
  getLaunches: `${SPACEX_API}`,
  saveLaunch: `${LOCAL_SERVER}/api/launches/saveLaunch`,
  getSavedLaunches: `${LOCAL_SERVER}/api/launches/getLaunches`,
  deleteLaunch: `${LOCAL_SERVER}/api/launches/deleteLaunch`
};

export const useLaunchesStore = defineStore('launches', {
  state: () => ({
    launches: [] as Launch[],
    savedLaunches: [] as Launch[]
  }),
  actions: {
    async fetchLaunches() {
      const response = await fetch(endpoints.getLaunches, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: {},
          options: {
            limit: 30,
            sort: { date_utc: 'desc' },
            select: ['flight_number', 'name', 'date_utc']
          }
        })
      });
      const data = await response.json();
      this.launches = data.docs;
    },
    async fetchSavedLaunches() {
      const response = await axios.get(endpoints.getSavedLaunches);
      this.savedLaunches = response.data;
    },
    async saveLaunch(launch: Launch) {
      await axios.post(endpoints.saveLaunch, launch);
      this.savedLaunches.push(launch);
    },
    async deleteLaunch(flightNumber: number) {
      await axios.delete(`${endpoints.deleteLaunch}/${flightNumber}`);
      this.savedLaunches = this.savedLaunches.filter(launch => launch.flight_number !== flightNumber);
    }
  }
});