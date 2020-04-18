export const whiteManHtml = `
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="white" />
</svg>
`;

export const blackManHtml = `
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="#111" />
</svg>
`;

function createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

export const createWhiteManSvg = () => createElement(whiteManHtml.trim());

export const createBlackManSvg = () => createElement(blackManHtml.trim());
