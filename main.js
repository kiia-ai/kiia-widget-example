const FALLBACK_WIDGET_KEY = "YOUR_KIIA_WIDGET_KEY";
let kiiaWidgetKey = FALLBACK_WIDGET_KEY;

const EXPLANATION_TYPES = {
  fast: 1,
  thinking: 2,
  depth: 3,
};

const form = document.querySelector("#kiia-demo-form");
const topicInput = document.querySelector("#topic");
const typeSelect = document.querySelector("#explanation-type");
const statusEl = document.querySelector("#status");
const widgetContainer = document.querySelector("#kiia-container");

function setStatus(message, tone = "default") {
  statusEl.textContent = message;
  statusEl.classList.remove("error", "success");

  if (tone !== "default") {
    statusEl.classList.add(tone);
  }
}

function hasPlaceholderKey() {
  return !kiiaWidgetKey || kiiaWidgetKey === FALLBACK_WIDGET_KEY;
}

async function loadWidgetKey() {
  try {
    const response = await fetch("/api/config");
    if (!response.ok) return;

    const config = await response.json();
    if (config.widgetKey) {
      kiiaWidgetKey = config.widgetKey;
      setStatus("Widget key loaded from Cloudflare environment. Generate an explanation to test it.", "success");
    }
  } catch {
    // Local static servers do not provide /api/config. The placeholder warning handles that case.
  }
}

form.addEventListener("submit", function handleSubmit(event) {
  event.preventDefault();

  const topic = topicInput.value.trim();
  const selectedType = typeSelect.value || "fast";
  const explanationType = EXPLANATION_TYPES[selectedType] || EXPLANATION_TYPES.fast;

  if (!topic) {
    setStatus("Enter a topic before generating an explanation.", "error");
    topicInput.focus();
    return;
  }

  if (hasPlaceholderKey()) {
    setStatus("Set KIIA_WIDGET_KEY in Cloudflare Pages or replace the local fallback key in main.js.", "error");
    widgetContainer.innerHTML = "";
    return;
  }

  if (!window.Kiia || typeof window.Kiia.explain !== "function") {
    setStatus("Kiia widget script is not loaded. Check the script URL and network access.", "error");
    return;
  }

  if (typeof window.Kiia.destroy === "function") {
    window.Kiia.destroy();
  }

  setStatus("Generating explanation...");

  window.Kiia.explain(topic, {
    key: kiiaWidgetKey,
    container: "#kiia-container",
    type: explanationType,
    onReady: function handleReady() {
      setStatus("Kiia explanation is ready.", "success");
    },
    onError: function handleError(error) {
      setStatus(error || "Kiia could not generate the explanation.", "error");
    },
  });
});

loadWidgetKey();
