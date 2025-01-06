function calculateStoppingTime(n, b, m, maxSteps = 1000) {
    let steps = 0;
    let current = BigInt(n);
    const bigB = BigInt(b);
    const bigM = BigInt(m);
    
    while (current !== 1n && steps < maxSteps) {
        if (current % bigB === 0n) {
            current = current / bigB;
        } else {
            const mod = current % (bigB ** bigM);
            current = ((bigB ** bigM) + 1n) * current + (bigB ** bigM) - mod;
        }
        steps++;
    }
    
    return steps;
}

self.onmessage = function(e) {
    const { startNum, endNum, b, m, maxStoppingTime, sampleRate } = e.data;
    const results = [];
    const batchSize = 10000;
    let lastUpdate = Date.now();
    
    for (let i = startNum; i <= endNum; i += sampleRate) {
        const stoppingTime = calculateStoppingTime(i, b, m);
        if (stoppingTime <= maxStoppingTime) {
            results.push([i, stoppingTime]);
        }
        
        if (results.length >= batchSize) {
            self.postMessage({ type: 'batch', data: results.slice() });
            results.length = 0;
        }
        
        // Update progress every second
        const now = Date.now();
        if (now - lastUpdate > 1000) {
            const progress = ((i - startNum) / (endNum - startNum)) * 100;
            self.postMessage({ type: 'progress', progress: Math.round(progress) });
            lastUpdate = now;
        }
    }
    
    if (results.length > 0) {
        self.postMessage({ type: 'batch', data: results });
    }
    
    self.postMessage({ type: 'complete' });
};