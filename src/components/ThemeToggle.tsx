"use client";

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => {
        const html = document.documentElement;
        const isLight = html.getAttribute("data-theme") === "light";
        if (isLight) {
          html.removeAttribute("data-theme");
        } else {
          html.setAttribute("data-theme", "light");
        }
      }}
      className="px-3 py-2 rounded bg-emerald-600 text-white shadow hover:bg-emerald-700 ml-4 lg:ml-0"
    >
      Alternar tema
    </button>
  );
}
