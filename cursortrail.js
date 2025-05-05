
document.addEventListener("mousemove", e => {
  const dot = document.createElement("div");
  dot.className = "trail";
  dot.style.left = `${e.pageX - 5}px`;
  dot.style.top = `${e.pageY - 5}px`;
  document.body.appendChild(dot);

  // Usuń kropkę z DOM po zakończeniu animacji
  setTimeout(() => dot.remove(), 50);
});