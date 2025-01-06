let worker = null;
let plot = null;
let allData = [];
let xRange = [Infinity, -Infinity];
let yRange = [0, -Infinity];

function updateRanges(batch) {
    batch.forEach(([x, y]) => {
        xRange[0] = Math.min(xRange[0], x);
        xRange[1] = Math.max(xRange[1], x);
        yRange[1] = Math.max(yRange[1], y);
    });
}

function startComputation() {
    const startNum = parseInt(document.getElementById('startNum').value);
    const endNum = parseInt(document.getElementById('endNum').value);
    const b = parseInt(document.getElementById('b').value);
    const m = parseInt(document.getElementById('m').value);
    const maxStoppingTime = parseInt(document.getElementById('maxStoppingTime').value);
    const sampleRate = parseInt(document.getElementById('sampleRate').value);

    // Validate input
    if (endNum < startNum) {
        alert('End number must be greater than start number');
        return;
    }

    // Reset state
    if (worker) worker.terminate();
    if (plot) plot.clear();
    allData = [];
    xRange = [Infinity, -Infinity];
    yRange = [0, -Infinity];

    // Create new worker
    worker = new Worker('js/worker.js');
    plot = new ScatterPlot(document.getElementById('plot'));

    worker.onmessage = function(e) {
        if (e.data.type === 'batch') {
            updateRanges(e.data.data);
            allData.push(...e.data.data);
            
            // Redraw everything
            plot.clear();
            plot.drawAxes(xRange, yRange);
            plot.plotPoints(allData, xRange, yRange);
        } else if (e.data.type === 'progress') {
            document.getElementById('status').textContent = `Computing: ${e.data.progress}%`;
        } else if (e.data.type === 'complete') {
            document.getElementById('generateBtn').disabled = false;
            document.getElementById('status').textContent = 'Complete';
        }
    };

    // Start computation
    document.getElementById('generateBtn').disabled = true;
    document.getElementById('status').textContent = 'Computing...';
    
    worker.postMessage({
        startNum, endNum, b, m, maxStoppingTime, sampleRate
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial plot
    startComputation();

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (plot && allData.length > 0) {
                plot = new ScatterPlot(document.getElementById('plot'));
                plot.drawAxes(xRange, yRange);
                plot.plotPoints(allData, xRange, yRange);
            }
        }, 250);
    });
});