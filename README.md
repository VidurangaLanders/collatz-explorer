# Collatz Conjecture Stopping Time Visualizer

An interactive web application for visualizing stopping times in the Collatz conjecture and its generalizations. This tool allows users to explore patterns in stopping times across different starting numbers and parameters.

## Features

- Interactive visualization of stopping times using SVG
- Support for generalized Collatz sequences with customizable parameters
- Real-time computation using Web Workers
- Responsive design that adapts to different screen sizes
- Dynamic axis scaling and grid generation
- Progress tracking for long computations
- Configurable sample rate for handling large ranges

## Parameters

- **Start Number**: The lowest number to analyze
- **End Number**: The highest number to analyze
- **Base (b)**: The divisor used when n is divisible by b (default: 2)
- **Multiplier (m)**: The power used in the generalization (default: 1)
- **Max Stopping Time**: Maximum number of steps before stopping computation
- **Sample Rate**: Analyze every nth number in the range (for faster computation of large ranges)

## Technical Details

The application is built using vanilla JavaScript and SVG, with the following key components:

- **Web Worker**: Handles computation-intensive tasks without blocking the UI
- **SVG Visualization**: Custom-built scatter plot implementation
- **BigInt Support**: Handles large numbers accurately
- **Responsive Design**: Adapts to different screen sizes

### File Structure

```
collatz-visualizer/
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # Stylesheet
├── js/
│   ├── worker.js      # Web Worker for computations
│   ├── scatterPlot.js # SVG plotting class
│   └── main.js        # Main application logic
└── README.md          # Documentation
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/collatz-visualizer.git
   ```

2. No build process is required. Simply serve the files using any HTTP server. For example:
   ```bash
   python -m http.server 8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

## Usage

1. Set your desired parameters using the input fields
2. Click "Generate Plot" to start the computation
3. The plot will update in real-time as computations complete
4. Use the sample rate to speed up calculations for large ranges
5. The visualization will automatically resize to fit your screen

## Mathematics

The generalized Collatz function used in this visualizer is defined as:

For a given number n, base b, and multiplier m:
- If n is divisible by b: n → n/b
- Otherwise: n → ((b^m + 1) × n + (b^m - mod(n, b^m)))

The stopping time is defined as the number of steps required to reach 1 in the sequence.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This project was inspired by the Collatz conjecture and its various generalizations in mathematical literature.