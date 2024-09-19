const Launch = require('../models/Launch');

const router = require('express').Router();


// Endpoint to save a launch
router.post('/saveLaunch', async (req, res) => {
    const launch = new Launch(req.body);

    if (!launch.flight_number || !launch.name || !launch.date_utc) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    const existingLaunch = await Launch.findOne({ flight_number: launch.flight_number });

    if (existingLaunch) {
        res.status(400).json({ error: 'Launch already exists' });
        return
    }

    try {
        await launch.save();
        res.status(200).json({ message: 'Launch saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save launch' });
    }
});

// Endpoint to get all saved launches
router.get('/getLaunches', async (req, res) => {
    try {
        const launches = await Launch.find();
        res.status(200).json(launches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve launches' });
    }
});

// Endpoint to delete a launch by flight number
router.delete('/deleteLaunch/:flight_number', async (req, res) => {
    const { flight_number } = req.params;

    if (!flight_number) {
        res.status(400).json({ error: 'Flight number is required' });
        return;
    }

    try {
        await Launch.deleteOne({ flight_number: Number(flight_number) });
        res.status(200).json({ message: 'Launch deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete launch' });
    }
});

module.exports = router;