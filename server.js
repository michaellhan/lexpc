const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Endpoint to handle application submissions
app.post('/submit-application', (req, res) => {
    const application = {
        ...req.body,
        timestamp: new Date().toISOString()
    };
    
    // Create applications directory if it doesn't exist
    const applicationsDir = path.join(__dirname, 'applications');
    if (!fs.existsSync(applicationsDir)) {
        fs.mkdirSync(applicationsDir);
    }
    
    // Generate filename based on timestamp and name
    const filename = `${application.timestamp.replace(/[:.]/g, '-')}_${application.name.replace(/\s+/g, '_')}.json`;
    const filepath = path.join(applicationsDir, filename);
    
    try {
        // Write application to file
        fs.writeFileSync(filepath, JSON.stringify(application, null, 2));
        
        // Log to console
        console.log('New application received:', {
            name: application.name,
            email: application.email,
            grade: application.grade,
            timestamp: application.timestamp
        });
        
        res.json({ success: true, message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error saving application:', error);
        res.status(500).json({ success: false, message: 'Error saving application' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 