# Uber Clone Frontend

A modern, mobile-first React application that replicates the core functionality of Uber's user interface. Built with React, Vite, and Tailwind CSS for optimal performance and user experience.

## 🚀 Features

### Core Functionality
- **User Authentication**: Login and signup flows for regular users
- **Caption Login**: Separate authentication for caption/driver users
- **Mobile-First Design**: Optimized for mobile devices with touch-friendly interactions
- **Responsive Layout**: Seamless experience across all screen sizes
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Context Management**: Global state management with React Context
- **Form Validation**: Real-time validation with error handling
- **Password Security**: Toggle password visibility with secure input handling

### Technical Features
- **React 18**: Latest React features and hooks
- **Vite**: Fast development and build tooling
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **React Icons**: Beautiful icon library (Feather Icons)
- **Mobile Optimized**: Touch-friendly interactions and mobile-specific styling
- **Context API**: Global state management
- **Local Storage**: Persistent user data storage

## 📱 Mobile-First Design

The application is built with mobile users in mind, featuring:
- **Touch-Optimized**: 44px minimum touch targets
- **Smooth Animations**: Hardware-accelerated transitions
- **Safe Areas**: Support for devices with notches
- **Responsive Typography**: Optimized text sizes for mobile
- **Gesture-Friendly**: Proper touch action handling
- **Viewport Optimization**: Prevents zoom on input focus
- **High DPI Support**: Crisp rendering on retina displays

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: React Icons (Feather Icons)
- **Package Manager**: npm
- **State Management**: React Context API
- **Form Handling**: Controlled components with validation

## 📁 Project Structure

```
Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── context/
│   │   └── UserContext.jsx          # Global user state management
│   ├── pages/
│   │   ├── Home.jsx                 # Landing page with background image
│   │   ├── UserLogin.jsx            # User authentication form
│   │   ├── UserSignUp.jsx           # User registration form
│   │   ├── CaptionLogin.jsx         # Caption/driver login
│   │   └── CaptionSignUp.jsx        # Caption/driver registration
│   ├── App.jsx                      # Main application component
│   ├── App.css                      # Application styles
│   ├── index.css                    # Global styles and mobile optimizations
│   └── main.jsx                     # Application entry point
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
└── eslint.config.js                 # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone 
   
   https://github.com/RishabhTomar9/Uber-Clone.git

   cd Uber-Clone/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000) - Buttons and primary elements
- **Secondary**: Gray variations - Backgrounds and text
- **Accent**: Blue (#3b82f6) - Focus states and links
- **Background**: Gray-50 (#f9fafb) - Page backgrounds
- **Error**: Red (#ef4444) - Validation errors and warnings
- **Success**: Green (#10b981) - Success states

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability
- **Mobile Optimized**: Responsive font sizes
- **Line Heights**: Optimized for mobile reading

### Components

#### Buttons
- **Primary**: Black background with white text
- **Secondary**: White background with black text
- **Interactive**: Hover and active states with animations
- **Touch-Friendly**: 44px minimum height
- **Animated**: Forward arrow animations on hover/click

#### Forms
- **Input Fields**: Rounded corners with focus states
- **Validation**: Visual feedback for required fields
- **Password Toggle**: Show/hide password functionality
- **Mobile Optimized**: Proper input sizing to prevent zoom
- **Error States**: Red borders and error messages

#### Cards
- **Glass Morphism**: Transparent backgrounds with backdrop blur
- **Rounded Corners**: Modern 2xl border radius
- **Shadows**: Subtle elevation for depth
- **Responsive**: Adapts to different screen sizes

## 📱 Mobile Optimizations

### Touch Interactions
- Minimum 44px touch targets
- Disabled tap highlight colors
- Proper touch action handling
- Scale animations on press
- Touch-friendly button sizes

### Viewport Handling
- Prevents horizontal scrolling
- Safe area support for notches
- Prevents zoom on input focus
- Proper viewport height handling
- Mobile-first responsive design

### Performance
- Hardware-accelerated animations
- Optimized for mobile networks
- Reduced motion support
- Efficient rendering
- Fast loading times

## 🔧 Configuration Files

### Tailwind CSS (`tailwind.config.js`)
- Custom color palette
- Mobile-first breakpoints
- Custom animations
- Component-specific utilities
- Responsive design utilities

### Vite (`vite.config.js`)
- React plugin configuration
- Development server settings
- Build optimization
- Asset handling
- Hot module replacement

### ESLint (`eslint.config.js`)
- React-specific rules
- Code quality standards
- Consistent formatting
- Best practices enforcement
- TypeScript-like rules

## 🌐 Routing

The application uses React Router for navigation:

- `/` - Home page (landing)
- `/login` - User login
- `/signup` - User registration
- `/caption-login` - Caption/driver login
- `/caption-signup` - Caption/driver registration

## 🎯 Key Features

### Authentication Flow
1. **User Selection**: Choose between regular user or caption login
2. **Form Validation**: Real-time input validation
3. **Password Security**: Toggle password visibility
4. **Responsive Design**: Works on all device sizes
5. **Context Integration**: Global state management

### UI/UX Highlights
- **Smooth Animations**: Forward arrow animations on buttons
- **Glass Morphism**: Modern transparent card designs
- **Background Images**: High-quality hero images
- **Interactive Elements**: Hover and active states
- **Loading States**: Visual feedback during operations

## 🔒 Security Considerations

- **Input Validation**: Client-side form validation
- **Password Handling**: Secure password input with toggle
- **XSS Prevention**: Proper React sanitization
- **CSRF Protection**: Form submission security
- **Data Encryption**: Secure data transmission
- **Session Management**: Proper user session handling

## 📈 Performance

- **Fast Loading**: Vite's rapid development server
- **Optimized Builds**: Production-ready builds
- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Compressed images and assets
- **Lazy Loading**: Component-level code splitting
- **Caching**: Efficient caching strategies

## 🗂 Data Structures

### User Context Structure
```javascript
{
  user: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: 'user' | 'caption'
  },
  isAuthenticated: boolean,
  login: function(userData),
  logout: function(),
  checkAuthStatus: function()
}
```

### Form Data Structures
```javascript
// User Registration
{
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}

// User Login
{
  email: string,
  password: string
}

// Caption Registration/Login
{
  email: string,
  password: string,
  role: 'caption'
}
```

## 🔧 API Integration

### Backend Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/captions/register` - Caption registration
- `POST /api/captions/login` - Caption login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Request/Response Formats
```javascript
// Registration Request
{
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

// Login Request
{
  email: string,
  password: string
}

// Response Format
{
  success: boolean,
  message: string,
  data: object,
  token: string
}
```

## 🎨 Component Documentation

### Home Component
- **Purpose**: Landing page with call-to-action
- **Features**: Background image, logo, navigation
- **Props**: None
- **State**: None

### UserLogin Component
- **Purpose**: User authentication form
- **Features**: Email/password fields, validation, context integration
- **Props**: None
- **State**: email, password, showPassword, userData

### UserSignUp Component
- **Purpose**: User registration form
- **Features**: Full name, email, password, confirm password
- **Props**: None
- **State**: firstName, lastName, email, password, confirmPassword, showPassword, showConfirmPassword

### CaptionLogin Component
- **Purpose**: Caption/driver authentication
- **Features**: Email/password fields, role-specific validation
- **Props**: None
- **State**: email, password, showPassword, userData

### CaptionSignUp Component
- **Purpose**: Caption/driver registration
- **Features**: Email, password, confirm password, role assignment
- **Props**: None
- **State**: email, password, confirmPassword, showPassword, showConfirmPassword

## 🧪 Testing

### Unit Testing
- Component rendering tests
- Form validation tests
- Context integration tests
- User interaction tests

### Integration Testing
- Form submission flows
- Navigation testing
- Context state management
- API integration testing

### E2E Testing
- Complete user journeys
- Cross-browser testing
- Mobile device testing
- Performance testing

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Uber Clone
VITE_APP_VERSION=1.0.0
```

### Deployment Platforms
- **Vercel**: Recommended for React apps
- **Netlify**: Static site hosting
- **AWS S3**: Cloud hosting
- **Firebase**: Google's hosting platform

## 🔧 Development Guidelines

### Code Style
- Use functional components with hooks
- Implement proper error handling
- Follow React best practices
- Use TypeScript for type safety (recommended)

### State Management
- Use Context API for global state
- Use local state for component-specific data
- Implement proper state updates
- Handle loading and error states

### Performance Optimization
- Implement React.memo for expensive components
- Use useCallback for event handlers
- Use useMemo for expensive calculations
- Implement proper cleanup in useEffect

## 🐛 Troubleshooting

### Common Issues
1. **Context not working**: Ensure UserProvider wraps the app
2. **Form validation errors**: Check input field requirements
3. **Mobile styling issues**: Verify responsive breakpoints
4. **Build errors**: Check for missing dependencies

### Debug Tools
- React Developer Tools
- Browser DevTools
- Network tab for API calls
- Console for error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile devices
5. Submit a pull request

### Contribution Guidelines
- Follow the existing code style
- Add proper documentation
- Include tests for new features
- Update the README if needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub
- Contact the development team

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- User authentication system
- Mobile-first design
- Context API integration
- Form validation
- Responsive layout

### Planned Features
- Real-time location tracking
- Payment integration
- Push notifications
- Offline support
- Advanced analytics

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
