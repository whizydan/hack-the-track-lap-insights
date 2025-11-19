# Inspiration
As a software developer and data enthusiast, I’ve always been fascinated by how subtle differences in driver behavior can drastically affect race outcomes. While browsing the Toyota Gazoo Racing datasets for Hack the Track, I realized that raw telemetry contains a goldmine of insights, but it’s almost impossible for drivers and teams to interpret it quickly. I wanted to build something that transforms complex race data into clear guidance that even non technical users can understand.

# What I Learned

This project taught me how to:

 - Process large telemetry datasets containing variables like speed, throttle, brake pressure, andcoordinates.

 - Use interactive visualization tools to highlight performance differences per lap.

 - Translate raw numbers into meaningful insights, such as braking efficiency and cornering performance.

# How I Built It

Data Processing:

Downsized the telemetry csv data.

Loaded the downsized CSV/JSON race telemetry data.

Computed lap-level statistics: total lap time, average speed, cornering efficiency, and throttle/brake consistency.

**Cornering Efficiency per Lap**

Ec = Average speed in corners / Maximum achievable speed in corners


# Dashboard & Visualization:

Built with NextJS + Chart.js for line charts, bar charts, and heatmaps.

Plotted per-lap metrics, corner-specific stats, and gear/throttle patterns.

# Actionable Insights:

Implemented rules-based suggestions, e.g.:

# Challenges Faced

Data Complexity: The Telemetry datasets were huge and had many variables; parsing efficiently without lag required careful preprocessing.

Scope Management: Initially, I wanted to implement predictive models for lap times, but that was intensive for a hackathon with short time.

Visualization Clarity: Presenting multiple metrics (speed, brake, throttle, gear, GPS) in an intuitive way without overwhelming the user took multiple design iterations.

# Outcome

The MVP is a fully functional Race Lap Analyzer:

Users can upload telemetry datasets and immediately see per-lap performance metrics.

Interactive dashboards highlight strengths and weaknesses per driver.

Actionable suggestions are provided to improve lap times.

Even in this simplified form, Lap Insight transforms raw telemetry into usable insights, making it an effective tool for driver coaching and post-race analysis.