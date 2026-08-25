// app.js

// 1. Initial State Definition (Defaults)
let personaState = {
    skinColor: VARIANTS.skinTones[0].value,
    hairStyle: VARIANTS.hairStyles[0].id,
    hairColor: "#000000",
    eyeColor: "#000000",
    mouthStyle: VARIANTS.mouths[0].id,
    eyesStyle: VARIANTS.eyes[0].id,
    blushEnabled: false,
    topStyle: VARIANTS.clothesTops[0].id,
    topColor: "#B24F6C",
    bottomStyle: VARIANTS.clothesBottoms[0].id,
    bottomColor: "#929292"
};

// 2. Helper to populate the skin tone grid

function populateSelect(selectId, dataArray) {
    const select = document.getElementById(selectId);
    dataArray.forEach(item => {
        const option = document.createElement('option');
        // We use 'id' if available (hair/clothes), or 'value' (skin tones)
        option.value = item.id || item.value;
        option.textContent = item.name;
        select.appendChild(option);
    });
}

function populateSkinToneGrid() {
    const grid = document.getElementById('skin-tone-grid');
    grid.innerHTML = '';

    VARIANTS.skinTones.forEach(tone => {
        const cell = document.createElement('div');
        cell.className = 'color-cell';
        cell.dataset.value = tone.value;
        cell.title = tone.name; // Shows name on hover

        cell.style.backgroundImage = `url('/images/skins/${tone.id || tone.name.toLowerCase()}.png')`;
        // cell.style.backgroundColor = tone.value; // Temporary fallback

        cell.addEventListener('click', () => {
            personaState.skinColor = tone.value;

            // Update visual selection
            document.querySelectorAll('.color-cell').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');

            renderPersona();
        });

        grid.appendChild(cell);
    });

    // Set initial selection based on default state
    updateSkinToneSelection();
}

// Helper to sync the grid selection with the current state
function updateSkinToneSelection() {
    document.querySelectorAll('.color-cell').forEach(cell => {
        if (cell.dataset.value === personaState.skinColor) {
            cell.classList.add('selected');
        } else {
            cell.classList.remove('selected');
        }
    });
}

// Helper to populate the hair style grid
function populateHairStyleGrid() {
    const grid = document.getElementById('hair-style-grid');
    grid.innerHTML = '';

    VARIANTS.hairStyles.forEach(style => {
        const cell = document.createElement('div');
        cell.className = 'color-cell';
        cell.dataset.value = style.id;
        cell.title = style.name; // Shows name on hover

        cell.style.backgroundImage = `url('/images/hair/${style.id}.png')`;
        // cell.style.backgroundColor = 'transparent';
        // cell.textContent = '';

        cell.addEventListener('click', () => {
            personaState.hairStyle = style.id;

            // Update visual selection (scoped to this specific grid)
            document.querySelectorAll('#hair-style-grid .color-cell').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');

            renderPersona();
        });

        grid.appendChild(cell);
    });

    // Set initial selection based on default state
    updateHairStyleSelection();
}

// Helper to sync the hair style grid selection with the current state
function updateHairStyleSelection() {
    document.querySelectorAll('#hair-style-grid .color-cell').forEach(cell => {
        if (cell.dataset.value === personaState.hairStyle) {
            cell.classList.add('selected');
        } else {
            cell.classList.remove('selected');
        }
    });
}

// Helper to populate the top style grid
function populateTopStyleGrid() {
    const grid = document.getElementById('top-style-grid');
    grid.innerHTML = '';

    VARIANTS.clothesTops.forEach(style => {
        const cell = document.createElement('div');
        cell.className = 'color-cell';
        cell.dataset.value = style.id;
        cell.title = style.name;

        cell.style.backgroundImage = `url('/images/clothes/top/${style.id}.png')`;

        cell.addEventListener('click', () => {
            personaState.topStyle = style.id;

            // Update visual selection (scoped to this specific grid)
            document.querySelectorAll('#top-style-grid .color-cell').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');

            renderPersona();
        });

        grid.appendChild(cell);
    });

    // Set initial selection based on default state
    updateTopStyleSelection();
}

// Helper to sync the top style grid selection with the current state
function updateTopStyleSelection() {
    document.querySelectorAll('#top-style-grid .color-cell').forEach(cell => {
        if (cell.dataset.value === personaState.topStyle) {
            cell.classList.add('selected');
        } else {
            cell.classList.remove('selected');
        }
    });
}

// Helper to populate the top style grid
function populateBottomStyleGrid() {
    const grid = document.getElementById('bottom-style-grid');
    grid.innerHTML = '';

    VARIANTS.clothesBottoms.forEach(style => {
        const cell = document.createElement('div');
        cell.className = 'color-cell';
        cell.dataset.value = style.id;
        cell.title = style.name;

        cell.style.backgroundImage = `url('/images/clothes/bottom/${style.id}.png')`;

        cell.addEventListener('click', () => {
            personaState.bottomStyle = style.id;

            // Update visual selection (scoped to this specific grid)
            document.querySelectorAll('#bottom-style-grid .color-cell').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');

            renderPersona();
        });

        grid.appendChild(cell);
    });

    // Set initial selection based on default state
    updateBottomStyleSelection();
}

// Helper to sync the top style grid selection with the current state
function updateBottomStyleSelection() {
    document.querySelectorAll('#bottom-style-grid .color-cell').forEach(cell => {
        if (cell.dataset.value === personaState.topStyle) {
            cell.classList.add('selected');
        } else {
            cell.classList.remove('selected');
        }
    });
}


// 3. Helper to update the full SVG based on the current state
async function renderPersona() {
    const placeholder = document.getElementById('persona-svg-placeholder');
    // Call the async function and wait for the SVG string
    const svgString = await generatePersonaSVG(personaState);
    placeholder.innerHTML = svgString;
}

// 4. Initialize the App
function initApp() {
    // skin
    populateSkinToneGrid();
    // hair
    populateHairStyleGrid();
    // top clothes
    populateTopStyleGrid();
    // bottom clothes
    populateBottomStyleGrid();
    // Populate all dynamic dropdowns directly from variants.js
    // populateSelect('skin-select', VARIANTS.skinTones);
    // populateSelect('hair-style-select', VARIANTS.hairStyles);
    populateSelect('mouth-select', VARIANTS.mouths);
    populateSelect('eyes-select', VARIANTS.eyes);
    // populateSelect('top-select', VARIANTS.clothesTops);
    // populateSelect('bottom-select', VARIANTS.clothesBottoms);

    // Bind Event Listeners
    const bindChange = (id, stateKey) => {
        document.getElementById(id).addEventListener('change', (e) => {
            personaState[stateKey] = e.target.value;
            renderPersona();
        });
    };

    const bindInput = (id, stateKey) => {
        document.getElementById(id).addEventListener('input', (e) => {
            personaState[stateKey] = e.target.value;
            // Also update text next to color picker
            const colorValueText = e.target.nextElementSibling;
            if (colorValueText && colorValueText.className === 'color-value') {
                colorValueText.textContent = e.target.value.toUpperCase();
            }
            renderPersona();
        });
    };

    // Bind structure
    // bindChange('skin-select', 'skinColor');

    // Bind hair
    // bindChange('hair-style-select', 'hairStyle');
    bindInput('hair-color-picker', 'hairColor');

    // Bind face
    bindChange('mouth-select', 'mouthStyle');
    bindChange('eyes-select', 'eyesStyle');
    bindInput('eye-color-picker', 'eyeColor');
    document.getElementById('blush-toggle').addEventListener('change', (e) => {
        personaState.blushEnabled = e.target.checked;
        renderPersona();
    });

    // Bind clothes tops/bottoms
    // bindChange('top-select', 'topStyle');
    bindInput('top-color-picker', 'topColor');
    // bindChange('bottom-select', 'bottomStyle');
    bindInput('bottom-color-picker', 'bottomColor');

    // Bind export
    document.getElementById('export-svg-btn').addEventListener('click', exportSVG);
    document.getElementById('reset-btn').addEventListener('click', () => location.reload());

    // Initial render of default state
    renderPersona();
}

// 5. Global Actions
function exportSVG() {
    const svg = document.getElementById('persona-svg');
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    const link = document.createElement("a"); link.href = url; link.download = "my-persona.svg";
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

// Startup
document.addEventListener('DOMContentLoaded', initApp);