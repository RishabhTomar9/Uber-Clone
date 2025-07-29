# Tailwind CSS Setup Guide

## Overview
This project uses **Tailwind CSS v4** with **Vite** and **React**. The configuration is optimized for modern development with custom theme extensions.

## ✅ What's Already Configured

### 1. **Dependencies** (in `package.json`)
```json
{
  "@tailwindcss/postcss": "^4.1.11",
  "@tailwindcss/vite": "^4.1.11",
  "postcss": "^8.5.6",
  "tailwindcss": "^4.1.11",
  "autoprefixer": "^10.4.19"
}
```

### 2. **Vite Configuration** (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 3. **CSS Import** (`src/index.css`)
```css
@import "tailwindcss";

/* Custom styles can be added below */
```

### 4. **PostCSS Configuration** (`postcss.config.js`)
```javascript
export default {
  plugins: {
    autoprefixer: {},
  },
}
```

### 5. **Tailwind Configuration** (`tailwind.config.js`)
- Custom color palette (primary, secondary, success, warning, error)
- Custom fonts (Inter, JetBrains Mono)
- Custom spacing, shadows, and animations
- Responsive design utilities

## 🎨 Custom Theme Features

### **Color Palette**
- **Primary**: Blue shades (for main actions)
- **Secondary**: Gray shades (for text and backgrounds)
- **Success**: Green shades (for positive actions)
- **Warning**: Yellow/Orange shades (for warnings)
- **Error**: Red shades (for errors)

### **Custom Animations**
- `animate-fade-in`: Smooth fade-in effect
- `animate-slide-up`: Slide up from bottom
- `animate-slide-down`: Slide down from top
- `animate-scale-in`: Scale in effect

### **Custom Shadows**
- `shadow-soft`: Subtle shadow
- `shadow-medium`: Medium shadow
- `shadow-large`: Large shadow

## 🚀 Usage Examples

### **Basic Button**
```jsx
<button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
  Click Me
</button>
```

### **Card Component**
```jsx
<div className="bg-white rounded-2xl shadow-soft p-6 animate-fade-in">
  <h2 className="text-2xl font-semibold text-secondary-800 mb-4">
    Card Title
  </h2>
  <p className="text-secondary-600">
    Card content goes here
  </p>
</div>
```

### **Responsive Grid**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

### **Status Indicator**
```jsx
<div className="inline-flex items-center px-4 py-2 bg-success-100 text-success-800 rounded-full">
  <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></div>
  Success Message
</div>
```

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📱 Responsive Design

The configuration includes responsive breakpoints:
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## 🎯 Best Practices

1. **Use Semantic Colors**: Use `primary-600` instead of `blue-600`
2. **Leverage Animations**: Use custom animations for better UX
3. **Responsive First**: Design mobile-first, then enhance for larger screens
4. **Consistent Spacing**: Use the spacing scale (4, 8, 12, 16, 20, 24, etc.)
5. **Accessibility**: Ensure proper contrast ratios with the color palette

## 🐛 Troubleshooting

### **If styles aren't applying:**
1. Check that `src/index.css` is imported in `main.jsx`
2. Verify the Vite plugin is configured in `vite.config.js`
3. Restart the development server

### **If custom classes aren't working:**
1. Check `tailwind.config.js` for proper content paths
2. Ensure the class is properly defined in the config
3. Clear browser cache and restart dev server

### **If PostCSS errors occur:**
1. Verify `postcss.config.js` is properly configured
2. Check that all dependencies are installed
3. Try deleting `node_modules` and running `npm install` again

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS v4 Guide](https://tailwindcss.com/docs/installation)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

**Happy coding! 🎉** 