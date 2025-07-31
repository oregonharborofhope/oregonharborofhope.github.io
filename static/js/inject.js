// inject.js

async function injectHTML(filePath, elem) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) return;
    const text = await response.text();
    elem.innerHTML = text;

    // Re-inject any scripts inside the injected HTML
    elem.querySelectorAll("script").forEach(script => {
      const newScript = document.createElement("script");
      Array.from(script.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );
      if (!script.src) {
        newScript.textContent = script.textContent.trim();
      }
      script.parentNode.replaceChild(newScript, script);
    });

  } catch (err) {
    console.error("Injection error:", err.message);
  }
}

async function injectAll() {
  const injectPromises = [];
  document.querySelectorAll("div[include]").forEach(elem => {
    injectPromises.push(injectHTML(elem.getAttribute("include"), elem));
  });
  await Promise.all(injectPromises);
}

// Expose a global promise to ensure other scripts can wait for injection completion
window.injectPromise = injectAll();
