let startTime, endTime, taskName;
const taskData = [];

document.getElementById('startBtn').addEventListener('click', function () {
    startTime = new Date();
    taskName = document.getElementById('taskName').value || 'Unnamed Task';
    document.getElementById('taskName').value = ''; // Clear input
});

document.getElementById('endBtn').addEventListener('click', function () {
    if (!startTime) {
        alert("Please start a task first.");
        return;
    }
    endTime = new Date();
    const elapsedTime = ((endTime - startTime) / 1000).toFixed(2); // In seconds

    taskData.push({
        task: taskName,
        duration: elapsedTime,
        start: startTime.toLocaleTimeString(),
        end: endTime.toLocaleTimeString(),
    });

    updateChart();
    startTime = null; // Reset start time
});

function updateChart() {
    const ctx = document.getElementById('timeChart').getContext('2d');
    const taskLabels = taskData.map(data => data.task);
    const taskDurations = taskData.map(data => data.duration);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: taskLabels,
            datasets: [{
                label: 'Task Duration (seconds)',
                data: taskDurations,
                backgroundColor: 'rgba(0, 122, 255, 0.7)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Export to CSV
document.getElementById('exportBtn').addEventListener('click', function () {
    if (taskData.length === 0) {
        alert("No data to export.");
        return;
    }

    const csvContent = "data:text/csv;charset=utf-8," + 
        ["Task Name,Duration (s),Start Time,End Time"]
        .concat(taskData.map(data => `${data.task},${data.duration},${data.start},${data.end}`))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "task_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
