# StackGuard

A modern React-based web application for securing codebases with advanced secret scanning and configuration management. Built with React 18, Ant Design, and Vite for optimal development experience and performance.

## 🚀 Features

- **User Authentication**: Secure sign-in and sign-up functionality with form validation
- **Protected Routes**: Role-based access control with authentication and configuration requirements
- **Configuration Management**: Secure storage and management of configuration keys (100-1000 characters)
- **Dashboard**: User-friendly interface for viewing and managing configuration data
- **Responsive Design**: Mobile-first responsive layout using Ant Design components
- **Modern Stack**: Built with React 18, React Router DOM, and Vite for fast development and builds

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and concurrent features
- **Ant Design 5.10.0** - Enterprise-class UI design language and React UI library
- **React Router DOM 6.14.1** - Declarative routing for React applications
- **Vite 5.0.0** - Next generation frontend tooling for fast development and building

### Development Tools
- **@vitejs/plugin-react 5.0.2** - Official React plugin for Vite
- **ESBuild** - Fast bundler and minifier
- **Hot Module Replacement (HMR)** - Instant development feedback

## 📁 Project Structure

```
stackguard-antd/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx     # Route protection wrapper
│   ├── lib/
│   │   └── auth.js               # Authentication utilities
│   ├── pages/
│   │   ├── Auth.jsx              # Login/Signup page
│   │   ├── Configuration.jsx     # Configuration key management
│   │   └── Dashboard.jsx         # Main dashboard
│   ├── App.jsx                   # Main application component with routing
│   ├── main.jsx                  # Application entry point
│   └── styles.css                # Global styles
├── index.html                    # HTML template
├── package.json                  # Project dependencies and scripts
├── vite.config.mjs               # Vite configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stackguard-antd
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will automatically open in your browser at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## 📱 Application Flow

### 1. Authentication (`/auth`)
- **Sign In**: Existing users can log in with email and password
- **Sign Up**: New users can create an account with name, email, and password
- **Validation**: Email format validation and minimum password length (6 characters)
- **Redirect**: Successful authentication redirects to configuration page

### 2. Configuration (`/config`)
- **Protected Route**: Requires authentication to access
- **Configuration Key Management**: 
  - Store configuration keys (100-1000 characters)
  - Validation for key length
  - Save and copy functionality
- **Progress Indicators**: Visual feedback during save operations
- **Navigation**: Access to dashboard after configuration

### 3. Dashboard (`/dashboard`)
- **Protected Route**: Requires both authentication and valid configuration
- **User Information**: Display current user details
- **Configuration Key Display**: 
  - Show stored configuration key
  - Copy to clipboard functionality
  - Truncated view for long keys
- **Sign Out**: Secure logout with option to clear configuration
- **Navigation**: Back to configuration if needed

## 🔐 Authentication System

### Local Storage Based
The application uses localStorage for demo authentication purposes:

```javascript
// Storage keys
const LS_AUTH = "stackguard_auth_v1"
const LS_CONFIG_KEY = "stackguard_config_key_v1"
```

### Authentication Functions
- `signIn({ email, password })` - User login
- `signUp({ name, email, password })` - User registration
- `signOut({ clearConfig })` - User logout
- `isAuthenticated()` - Check authentication status
- `getAuth()` - Get current user data
- `hasValidConfigKey()` - Validate configuration key

### Security Notes
⚠️ **Production Warning**: The current implementation uses localStorage for demo purposes. For production use, replace with:
- JWT tokens with secure HTTP-only cookies
- Backend API integration
- Proper session management
- CSRF protection

## 🛡️ Route Protection

### ProtectedRoute Component
The application implements multi-level route protection:

```jsx
// Basic authentication required
<Route element={<ProtectedRoute />}>
  <Route path="/config" element={<Configuration />} />
</Route>

// Authentication + configuration required
<Route element={<ProtectedRoute requireConfig />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

### Protection Logic
1. **Authentication Check**: Verifies user is logged in
2. **Configuration Check**: Validates configuration key exists (when required)
3. **Redirect Handling**: Preserves intended destination during redirects
4. **Debug Logging**: Console logs for development troubleshooting

## 🎨 UI/UX Features

### Ant Design Components
- **Layout**: Consistent header and content structure
- **Forms**: Validated forms with proper error handling
- **Cards**: Clean content containers with shadows
- **Typography**: Hierarchical text styling
- **Buttons**: Interactive elements with loading states
- **Icons**: Meaningful visual indicators from Ant Design Icons

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive grid system (xs, sm, md, lg, xl)
- **Flexible Layout**: Adapts to different screen sizes
- **Touch Friendly**: Appropriate touch targets for mobile

### User Experience
- **Loading States**: Visual feedback during async operations
- **Error Messages**: Clear error communication
- **Success Notifications**: Confirmation of successful actions
- **Form Validation**: Real-time validation feedback
- **Copy to Clipboard**: One-click copy functionality

## 🔧 Configuration

### Vite Configuration
```javascript
// vite.config.mjs
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

### Development Features
- **Hot Module Replacement**: Instant development feedback
- **Fast Refresh**: Preserve component state during updates
- **ESBuild**: Extremely fast builds and bundling
- **Source Maps**: Debug-friendly development experience

## 📦 Dependencies

### Production Dependencies
```json
{
  "antd": "^5.10.0",
  "react": "^18.2.0", 
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.14.1"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^5.0.2",
  "vite": "^5.0.0"
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Static Deployment
The application can be deployed to any static hosting service:
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Configure for static site hosting
- **Firebase Hosting**: Deploy with Firebase CLI

## 🔧 Development Workflow

### 1. Development
```bash
npm run dev
# Starts server at http://localhost:3000
# Hot reload enabled
```

### 2. Code Organization
- **Components**: Reusable UI components in `src/components/`
- **Pages**: Route components in `src/pages/`
- **Utilities**: Shared functions in `src/lib/`
- **Styles**: Global styles in `src/styles.css`

### 3. Best Practices
- Use React hooks for state management
- Implement proper error boundaries
- Follow Ant Design design principles
- Write semantic HTML
- Use responsive design patterns
- Implement proper form validation

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Dependency Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
# Clear Vite cache
rm -rf .vite
npm run build
```

### Debug Mode
The application includes console logging for development:
- Authentication state changes
- Route protection decisions
- Configuration key operations
- Form validation results

## 🔄 Future Enhancements

### Planned Features
- **Real API Integration**: Replace localStorage with backend API
- **Enhanced Security**: JWT tokens, CSRF protection
- **User Profiles**: Extended user management
- **Configuration Templates**: Pre-built configuration options
- **Audit Logs**: Track configuration changes
- **Multi-factor Authentication**: Enhanced security
- **Team Management**: Collaborative features
- **Export/Import**: Configuration backup and restore

### Technical Improvements
- **State Management**: Redux or Zustand for complex state
- **Testing**: Unit and integration tests
- **Code Splitting**: Optimized bundle sizes
- **Service Worker**: Offline capabilities
- **PWA Features**: Progressive Web App functionality
- **Internationalization**: Multi-language support
- **Theme System**: Dark/light mode toggle

## 📄 License

This project is part of the StackGuard application. See the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the console logs for debugging information

---

**Built with ❤️ using React, Ant Design, and Vite**
