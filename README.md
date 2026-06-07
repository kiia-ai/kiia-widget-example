# Kiia Widget Example

A minimal static website that shows how to embed the Kiia explanation widget in a client site.

This example has no build step, no framework, and no package manager requirement. It is meant to be easy for product, engineering, and implementation teams to inspect and copy.

## Quick Start

1. Replace the placeholder key in `main.js`:

   ```js
   const KIIA_WIDGET_KEY = "YOUR_KIIA_WIDGET_KEY";
   ```

2. Serve the folder locally:

   ```bash
   python3 -m http.server 8080
   ```

3. Open the demo:

   ```text
   http://localhost:8080
   ```

The placeholder key will not generate explanations. Use the widget key provided by Kiia, and make sure your website domain has been allowlisted.

## Minimal Integration

Add the Kiia script, add a container, then call `Kiia.explain()`.

```html
<script src="https://kiia.ai/embed/kiia.js"></script>

<div id="kiia-container"></div>

<script>
  const EXPLANATION_TYPES = {
    fast: 1,
    thinking: 2,
    depth: 3
  };

  Kiia.explain("binary search", {
    key: "YOUR_KIIA_WIDGET_KEY",
    container: "#kiia-container",
    type: EXPLANATION_TYPES.fast,
    onReady: function () {
      console.log("Kiia explanation ready");
    },
    onError: function (error) {
      console.error("Kiia error", error);
    }
  });
</script>
```

## Options

| Option | Required | Description |
| --- | --- | --- |
| `key` | Yes | Your Kiia widget key. |
| `container` | Yes | CSS selector or HTML element where the widget iframe should render. |
| `type` | No | Explanation type id. See the explanation types below. |
| `onReady` | No | Callback fired when the explanation is ready. |
| `onError` | No | Callback fired when Kiia returns an error. |

## Explanation Types

Kiia currently supports three explanation modes. The widget API accepts the numeric id, while the product names are shown in the demo UI.

| Product name | Widget `type` value | Meaning |
| --- | --- | --- |
| `fast` | `1` | Quick explanation for lightweight, fast responses. |
| `thinking` | `2` | More reasoning-oriented explanation for deeper understanding. |
| `depth` | `3` | Most detailed explanation for advanced or complex topics. |

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Static demo page and Kiia script tag. |
| `styles.css` | Demo page styling. Not required for Kiia itself. |
| `main.js` | Example widget initialization and local validation. |

## Troubleshooting

### The demo says to replace the widget key

Update `KIIA_WIDGET_KEY` in `main.js` with your assigned key.

### The widget says the key is invalid or unauthorized

Check that you are using the correct widget key and that the key is active.

### The widget works locally but not on my website

Ask Kiia to allowlist your website domain for the widget key. Local testing domains such as `localhost` may be configured separately from production domains.

### Nothing happens when I submit the form

Open the browser console and confirm that `https://kiia.ai/embed/kiia.js` loaded successfully. If your environment blocks third-party scripts, allow the Kiia script URL.

### I opened the file directly and the widget does not behave correctly

Serve the folder through a local web server instead of opening `index.html` with `file://`.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes for Production

- Keep your widget key scoped to approved domains.
- Avoid committing private or environment-specific keys to public repositories.
- Render one Kiia widget per container. Call `Kiia.destroy()` before replacing an existing explanation.
