# RichTextEditor Complete Example

This document demonstrates all features including code blocks with syntax highlighting.

## Basic Formatting

This is **bold text** and this is *italic text*. You can also combine them: ***bold and italic***.

You can use ~~strikethrough~~ text as well.

## Code Blocks

### JavaScript
```javascript
const greeting = "Hello, World!";
console.log(greeting);

function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log(`Result: ${result}`);
```

### TypeScript
```typescript
interface User {
  name: string;
  email: string;
}

const user: User = {
  name: "John Doe",
  email: "john@example.com"
};

function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}
```

### Python
```python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

### HTML
```html
<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>
```

### CSS
```css
.button {
  background-color: #1b2942;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
}

.button:hover {
  background-color: #2c3e50;
}
```

### JSON
```json
{
  "name": "RichTextEditor",
  "version": "1.0.0",
  "features": ["Code highlighting", "Autocomplete"]
}
```

## Autocomplete Features

### Variables (Type `..`)
- {{name}} - User name
- {{email}} - Email address
- {{date}} - Current date

### Code Blocks (Type `/`)
- `/js` - JavaScript code block
- `/ts` - TypeScript code block
- `/py` - Python code block
- `/html` - HTML code block

## Admonitions

:::note
📝 **Note:** Important information here.
:::

:::tip
💡 **Tip:** Pro tip for best results.
:::

## Link Buttons

:::linkButton{href="https://example.com" color="white" bg="#1b2942"}
Click Here
:::

---

**End of Example**
