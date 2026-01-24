# KitchenUnderRepair Component

A reusable React component that displays a pixel art animation of a sad chef with a kitchen under repair, featuring a blinking ceiling light and interactive hover effects.

## Installation

Copy the `KitchenUnderRepair.jsx` file into your project's components folder.

## Usage

### Basic Usage

```jsx
import KitchenUnderRepair from './components/KitchenUnderRepair';

function App() {
  return (
    <div>
      <KitchenUnderRepair />
    </div>
  );
}
```

### Custom Messages

```jsx
<KitchenUnderRepair 
  message="COMING SOON"
  submessage="Opening January 2026!"
/>
```

### Custom Size

```jsx
<KitchenUnderRepair 
  width={600}
  height={600}
/>
```

### Hide Hover Hint

```jsx
<KitchenUnderRepair 
  showHoverHint={false}
/>
```

### Full Customization

```jsx
<KitchenUnderRepair 
  message="TEMPORARILY CLOSED"
  submessage="Back in 2 weeks!"
  showHoverHint={true}
  width={500}
  height={500}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | string | "UNDER REPAIR" | Main message text |
| `submessage` | string | "We'll be cooking again soon!" | Secondary message text |
| `showHoverHint` | boolean | true | Show/hide the hover hint text |
| `width` | number | 400 | Width of the animation canvas in pixels |
| `height` | number | 400 | Height of the animation canvas in pixels |

## Features

- 🎨 **Pixel Art Design** - Authentic retro pixel art style using CSS box-shadow technique
- 💡 **Dynamic Lighting** - Ceiling light blinks every 2 seconds, brightening/darkening the scene
- 🏠 **Indoor Ceiling View** - Realistic wooden planks and beams
- 👨‍🍳 **Animated Chef** - Sad chef with eyebrows, eye highlights, and facial expressions
- 🔥 **Broken Stove** - Stove with cracked oven door sealed with emergency X-tape
- ⚠️ **Traffic Cone** - Safety cone for added detail
- 💧 **Interactive Animations** - Hover to see the chef's head bob, arm droop, and tear fall
- 📱 **Fully Responsive** - Customizable size to fit your layout
- 🎮 **Retro Font** - Press Start 2P font for authentic gaming feel

## Browser Compatibility

Works in all modern browsers that support CSS animations and transforms:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Dependencies

None! This is a pure React component with inline styles.

## License

Free to use in your projects!