# Luxury Loading System

This document explains how to use the luxury loading screen system implemented for the Homes of Hollywood website.

## Overview

The loading system provides a beautiful, theme-consistent loading experience that appears during:
- Initial page load
- Route changes
- Custom loading states
- API calls

## Components

### 1. LuxuryLoadingScreen
The main loading screen component with luxury animations and branding.

**Props:**
- `isLoading`: Boolean to show/hide the loading screen
- `message`: Custom loading message

**Usage:**
```tsx
import LuxuryLoadingScreen from "@/components/luxury-loading-screen"

<LuxuryLoadingScreen 
  isLoading={true} 
  message="Loading exclusive properties..." 
/>
```

### 2. LoadingProvider
Context provider that manages global loading state.

**Features:**
- Automatic loading on route changes
- Global loading state management
- Custom loading messages

**Usage:**
```tsx
import { LoadingProvider } from "@/components/loading-provider"

<LoadingProvider>
  <YourApp />
</LoadingProvider>
```

### 3. PageLoading
Component for page-specific loading states.

**Props:**
- `children`: Content to render after loading
- `loadingMessage`: Custom loading message
- `minLoadingTime`: Minimum loading time in milliseconds

**Usage:**
```tsx
import PageLoading from "@/components/page-loading"

<PageLoading 
  loadingMessage="Loading page content..."
  minLoadingTime={1000}
>
  <YourPageContent />
</PageLoading>
```

## Hooks

### useAppLoading
Custom hook for easy access to loading functionality.

**Methods:**
- `isLoading`: Current loading state
- `setIsLoading`: Set loading state
- `showLoading(message)`: Show loading with custom message
- `hideLoading()`: Hide loading screen
- `withLoading(asyncFunction, message)`: Wrap async function with loading

**Usage:**
```tsx
import { useAppLoading } from "@/hooks/use-loading"

function MyComponent() {
  const { showLoading, hideLoading, withLoading } = useAppLoading()

  const handleAsyncAction = async () => {
    // Method 1: Manual control
    showLoading("Processing your request...")
    try {
      await someAsyncFunction()
    } finally {
      hideLoading()
    }

    // Method 2: Automatic wrapper
    await withLoading(
      () => someAsyncFunction(),
      "Processing your request..."
    )
  }

  return <button onClick={handleAsyncAction}>Submit</button>
}
```

## Integration Examples

### 1. Form Submission
```tsx
import { useAppLoading } from "@/hooks/use-loading"

function ContactForm() {
  const { withLoading } = useAppLoading()

  const handleSubmit = async (data) => {
    await withLoading(
      () => submitForm(data),
      "Sending your message..."
    )
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### 2. Data Fetching
```tsx
import { useAppLoading } from "@/hooks/use-loading"

function PropertyList() {
  const { withLoading } = useAppLoading()
  const [properties, setProperties] = useState([])

  const loadProperties = async () => {
    const data = await withLoading(
      () => fetchProperties(),
      "Loading exclusive properties..."
    )
    setProperties(data)
  }

  useEffect(() => {
    loadProperties()
  }, [])

  return <div>...</div>
}
```

### 3. Page-Specific Loading
```tsx
import PageLoading from "@/components/page-loading"

export default function AboutPage() {
  return (
    <PageLoading 
      loadingMessage="Loading about information..."
      minLoadingTime={800}
    >
      <AboutContent />
    </PageLoading>
  )
}
```

## Styling

The loading screen uses the following theme colors:
- **Primary Gold**: `#D4AF37`
- **Secondary Gold**: `#B8941F`
- **Background**: Black with subtle patterns
- **Text**: White and gray tones

### CSS Classes
- `.loading-screen`: Main container with backdrop blur
- `.loading-progress`: Animated progress bar
- `.loading-corner`: Corner decorations with shimmer effect
- `.animate-shimmer`: Shimmer animation
- `.animate-float`: Floating animation
- `.animate-glow`: Glow effect
- `.animate-pulse-gold`: Gold pulsing animation

## Customization

### Custom Loading Messages
```tsx
const customMessages = [
  "Preparing your luxury experience...",
  "Loading exclusive properties...",
  "Connecting to premium services...",
  "Almost ready...",
]
```

### Custom Animation Timing
```tsx
// In CSS
.animate-custom {
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
}
```

### Custom Colors
```tsx
// Override in your component
<div className="text-[#your-custom-gold]">Custom Gold</div>
```

## Best Practices

1. **Use appropriate loading messages** that match the action being performed
2. **Set reasonable minimum loading times** to prevent flickering
3. **Handle errors gracefully** in async operations
4. **Use the `withLoading` wrapper** for automatic loading state management
5. **Keep loading messages concise** and user-friendly

## Troubleshooting

### Loading screen not appearing
- Ensure `LoadingProvider` is wrapped around your app
- Check that `isLoading` prop is set to `true`
- Verify z-index is not being overridden

### Loading screen stuck
- Check for infinite loops in useEffect
- Ensure `hideLoading()` is called in finally blocks
- Verify async operations are completing properly

### Performance issues
- Use `minLoadingTime` to prevent rapid show/hide cycles
- Debounce loading state changes if needed
- Consider using React.memo for loading components

## File Structure

```
components/
├── luxury-loading-screen.tsx    # Main loading component
├── loading-provider.tsx         # Context provider
└── page-loading.tsx            # Page-specific loading

hooks/
└── use-loading.ts              # Loading hook

app/
├── loading.tsx                 # Root loading page
└── layout.tsx                  # Includes LoadingProvider
``` 