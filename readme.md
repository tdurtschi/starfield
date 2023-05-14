# Starfield
Usage:
```js
import starfield from "./index.js";
starfield({
    target: "elementId",
    fillRatio: 0.8
});
```

The target element must have a defined height.

If you're using this as a full-screen background, the following styles might be useful:

```css
html,
body {
    padding: 0;
    margin: 0;
    background-color: black;
    min-height: 100%;
}

#elementId {
    z-index: 10;
    height: 100%;
    min-height: 100vh;
}
```