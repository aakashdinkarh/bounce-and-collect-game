// Performance monitoring setup
const PerformanceMonitor = {
    operationTimes: [],
    isLowPerformance: false,
    SAMPLE_SIZE: 10,
    OPERATION_THRESHOLD: 0.16, // ms threshold for trajectory creation and removal
    measurementInProgress: false,
    
    async checkPerformance() {
        if (this.measurementInProgress) return;
        this.measurementInProgress = true;
        
        return new Promise(resolve => {
            let checksCompleted = 0;
            
            const checkOperation = () => {
                if (checksCompleted >= this.SAMPLE_SIZE) {
                    const avgOperationTime = this.operationTimes.reduce((a, b) => a + b, 0) / this.operationTimes.length;
                    console.log('Average operation time (ms):', avgOperationTime);
                    
                    this.isLowPerformance = avgOperationTime > this.OPERATION_THRESHOLD;
                    this.measurementInProgress = false;
                    resolve(this.isLowPerformance);
                    return;
                }

                // Simple DOM operation test that doesn't require game elements
                const start = performance.now();
                
                // Create and immediately remove a trajectory point
                const point = createTestingTrajectoryPoint();
                point.remove();
                
                const operationTime = performance.now() - start;
                this.operationTimes.push(operationTime);
                checksCompleted++;
                
                // Add some delay between checks
                setTimeout(checkOperation, 16); // roughly 60fps interval
            };
            
            checkOperation();
        });
    },

    async recheck() {
        this.operationTimes = [];
        return this.checkPerformance();
    }
};

function createTestingTrajectoryPoint() {
    const trajectoryPoint = document.createElement('span');
    trajectoryPoint.style.top = '0px';
    trajectoryPoint.style.left = '0px';
    trajectoryPoint.className = 'testing-trajectory-point';
    trajectoryPoint.style.opacity = 0;
    document.body.append(trajectoryPoint);
    return trajectoryPoint;
}

// Start performance check immediately when script loads and script is deferred
const performancePromise = PerformanceMonitor.checkPerformance();

// Export for other modules to use
window.PerformanceMonitor = PerformanceMonitor;
window.performancePromise = performancePromise;
