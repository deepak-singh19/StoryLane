# Storylane Product Tour → HTML Generator

A React-based web application that converts Storylane JSON exports into standalone, beautifully formatted HTML documents for product tours and documentation.

## 🚀 Features

- **JSON Upload**: Upload Storylane JSON export files
- **HTML Generation**: Automatically converts JSON data into a complete HTML document
- **Live Preview**: Preview the generated HTML with side-by-side rendered and source views
- **Download**: Download the generated HTML file with a custom filename
- **Copy to Clipboard**: Quick copy functionality for the HTML source code
- **Responsive Design**: Generated HTML is mobile-friendly with responsive breakpoints
- **PDF Support**: Generated HTML includes PDF export functionality using html2pdf.js

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd storylane
```

2. Install dependencies:
```bash
npm install
```

## 💻 Usage

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

### Build for Production

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 📁 Project Structure

```
storylane/
├── src/
│   ├── component/
│   │   └── HTMLOutput.jsx      # Preview component for rendered HTML and source
│   ├── utils/
│   │   ├── generateHTML.js     # Core HTML generation logic
│   │   ├── helper.js           # Utility functions (get, escapeHtml)
│   │   └── commonStyle.js      # Shared button and styling constants
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
└── vite.config.js           # Vite configuration
```

## 🏗️ Architecture

### Components

- **App.jsx**: Main orchestrator component managing state and user interactions
- **HTMLOutput.jsx**: Displays side-by-side preview of rendered HTML and source code

### Utilities

- **generateHTML.js**: Transforms Storylane JSON data into a complete HTML document
  - Parses flowlists, flows, widgets, and pages
  - Generates chapters and steps with images and descriptions
  - Includes embedded CSS and PDF export functionality
  
- **helper.js**: Reusable utility functions
  - `get()`: Safely retrieves nested object properties using dot notation
  - `escapeHtml()`: Escapes HTML special characters to prevent XSS

- **commonStyle.js**: Shared styling constants for consistent UI

## 📊 How It Works

1. **File Upload**: User uploads a Storylane JSON file
2. **JSON Parsing**: The application parses the JSON and extracts:
   - Flowlists (tour structure/chapters)
   - Flows (individual tour flows)
   - Widgets (steps within flows)
   - Pages (screenshots/videos)
3. **HTML Generation**: The `generateHTML` function:
   - Creates a complete HTML document structure
   - Organizes content into chapters and steps
   - Embeds images with markers for highlights
   - Applies responsive styling
   - Includes PDF export functionality
4. **Output**: Generated HTML can be previewed, downloaded, or copied

## 🎨 Generated HTML Features

The generated HTML includes:
- Clean, modern styling with responsive breakpoints
- Organized chapter structure matching Storylane flowlists
- Step-by-step instructions with numbered indicators
- Image support for screenshots and video previews
- Interactive markers for element highlights
- PDF export button for document generation
- Mobile-responsive design

## 🔧 Technologies Used

- **React 19**: UI framework
- **Vite**: Build tool and development server
- **ESLint**: Code linting
- **Tailwind CSS**: Utility-first CSS (configured)

## 📝 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙋 Support

For issues or questions, please open an issue in the repository or contact the development team.
