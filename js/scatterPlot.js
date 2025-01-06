class ScatterPlot {
    constructor(container) {
        this.container = container;
        this.margin = { top: 40, right: 60, bottom: 60, left: 60 };
        this.width = container.clientWidth - this.margin.left - this.margin.right;
        this.height = container.clientHeight - this.margin.top - this.margin.bottom;
        
        this.setupSVG();
    }

    setupSVG() {
        this.container.innerHTML = '';
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("width", "100%");
        this.svg.setAttribute("height", "100%");
        this.svg.setAttribute("viewBox", `0 0 ${this.width + this.margin.left + this.margin.right} ${this.height + this.margin.top + this.margin.bottom}`);
        
        this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.g.setAttribute("transform", `translate(${this.margin.left},${this.margin.top})`);
        
        this.svg.appendChild(this.g);
        this.container.appendChild(this.svg);
    }

    scale(value, fromRange, toRange) {
        return (value - fromRange[0]) * (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]) + toRange[0];
    }

    drawAxes(xRange, yRange) {
        const fragment = document.createDocumentFragment();
        
        // Generate tick values
        const xTicks = Array.from({length: 10}, (_, i) => 
            Math.round(xRange[0] + (xRange[1] - xRange[0]) * i / 9));
        const yTicks = Array.from({length: 10}, (_, i) => 
            Math.round(yRange[0] + (yRange[1] - yRange[0]) * i / 9));

        // Draw grid and ticks
        xTicks.forEach(x => {
            const xPos = this.scale(x, xRange, [0, this.width]);
            
            // Grid line
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", xPos);
            line.setAttribute("x2", xPos);
            line.setAttribute("y1", 0);
            line.setAttribute("y2", this.height);
            line.setAttribute("class", "axis-line");
            fragment.appendChild(line);

            // Tick label
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.textContent = x.toExponential(1);
            text.setAttribute("x", xPos);
            text.setAttribute("y", this.height + 20);
            text.setAttribute("class", "tick");
            text.setAttribute("text-anchor", "middle");
            fragment.appendChild(text);
        });

        yTicks.forEach(y => {
            const yPos = this.scale(y, yRange, [this.height, 0]);
            
            // Grid line
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", 0);
            line.setAttribute("x2", this.width);
            line.setAttribute("y1", yPos);
            line.setAttribute("y2", yPos);
            line.setAttribute("class", "axis-line");
            fragment.appendChild(line);

            // Tick label
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.textContent = y;
            text.setAttribute("x", -10);
            text.setAttribute("y", yPos);
            text.setAttribute("class", "tick");
            text.setAttribute("text-anchor", "end");
            text.setAttribute("dominant-baseline", "middle");
            fragment.appendChild(text);
        });

        // Axis labels
        const xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xLabel.textContent = "Number";
        xLabel.setAttribute("x", this.width / 2);
        xLabel.setAttribute("y", this.height + 40);
        xLabel.setAttribute("text-anchor", "middle");
        fragment.appendChild(xLabel);

        const yLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        yLabel.textContent = "Stopping Time";
        yLabel.setAttribute("transform", `rotate(-90)`);
        yLabel.setAttribute("x", -this.height / 2);
        yLabel.setAttribute("y", -40);
        yLabel.setAttribute("text-anchor", "middle");
        fragment.appendChild(yLabel);

        this.g.appendChild(fragment);
    }

    plotPoints(data, xRange, yRange) {
        const fragment = document.createDocumentFragment();
        
        data.forEach(([x, y]) => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", this.scale(x, xRange, [0, this.width]));
            circle.setAttribute("cy", this.scale(y, yRange, [this.height, 0]));
            circle.setAttribute("r", 2);
            circle.setAttribute("class", "point");
            fragment.appendChild(circle);
        });

        this.g.appendChild(fragment);
    }

    clear() {
        this.g.innerHTML = '';
    }
}