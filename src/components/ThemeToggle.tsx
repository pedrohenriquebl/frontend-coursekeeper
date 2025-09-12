"use client";

export default function ThemeToggle() {
  return (
    <button
      type="button"
      style={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
      onClick={() => {
        const html = document.documentElement;
        const isLight = html.getAttribute("data-theme") === "light";
        if (isLight) {
          html.removeAttribute("data-theme");
        } else {
          html.setAttribute("data-theme", "light");
        }
      }}
      className="px-3 py-2 rounded bg-emerald-600 text-white shadow hover:bg-emerald-700"
    >
      Alternar tema
    </button>
  );
}
