const express = require('express');
const Asset = require('../Models/assets.model');
const Document = require('../Models/documents.model');
const Software = require('../Models/softwere.model');
const Tickets = require('../Models/tickets.model');
const User = require('../Models/user.model');

const dashboardRouter = express.Router();

// Route to get the dashboard data
dashboardRouter.get('/', async (req, res) => {
    try {
        // Fetch counts from the database
        const assetsCount = await Asset.countDocuments({});
        const usersCount = await User.countDocuments({});
        const tech = await User.countDocuments({role: 'tech'});
        const normal = await User.countDocuments({role: 'normal'});
        const resolvedTicketsCount = await Tickets.countDocuments({ isResolved: true });
        const unresolvedTicketsCount = await Tickets.countDocuments({ isResolved: false });
        const TicketsCount = await Tickets.countDocuments({});
        const documentsCount = await Document.countDocuments({});
        const softwareCount = await Software.countDocuments({});

        // Prepare the response object
        const dashboardData = {
            assets: assetsCount,
            users: usersCount,
            tech: tech,
            normal: normal,
            resolvedTickets: resolvedTicketsCount,
            unresolvedTickets: unresolvedTicketsCount,
            tickets: TicketsCount,
            documents: documentsCount,
            software: softwareCount,
        };

        // Send the response
        res.json(dashboardData);
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).json({ error: 'An error occurred while fetching dashboard data.' });
    }
});

module.exports = dashboardRouter;
