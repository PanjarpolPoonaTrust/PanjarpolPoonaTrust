let currentTranslations = {};

// Load the selected language's translations from translations.json
async function loadTranslations(lang) {
  try {
    console.log('[lang.js] Loading language:', lang);
    const res = await fetch('translations.json');
    const allTranslations = await res.json();
    currentTranslations = allTranslations[lang] || {};
    console.log('[lang.js] chatbot_popup for', lang, ':', currentTranslations['chatbot_popup']);
    applyTranslations();
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

// Apply translations to all elements with the data-i18n attribute
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (currentTranslations[key]) {
      el.innerHTML = currentTranslations[key];
    }
  });
  // Also translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (currentTranslations[key]) {
      el.setAttribute('placeholder', currentTranslations[key]);
    }
  });
}
window.applyTranslations = applyTranslations;

// Initialize language switcher on DOM load
// Only set to English by default, do not use localStorage
// On change, update localStorage and translations
document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('languageSwitcher');
  // Use sessionStorage or localStorage for session language, default to 'en' on new session
  let savedLang = sessionStorage.getItem('selectedLanguage') || localStorage.getItem('selectedLanguage') || 'en';
  if (switcher) switcher.value = savedLang;
  loadTranslations(savedLang);
  if (switcher) {
    switcher.addEventListener('change', e => {
      const selectedLang = e.target.value;
      sessionStorage.setItem('selectedLanguage', selectedLang);
      localStorage.setItem('selectedLanguage', selectedLang);
      console.log('[lang.js] Language switcher changed to:', selectedLang);
      loadTranslations(selectedLang);
      setTimeout(() => {
        console.log('[lang.js] currentTranslations after switch:', window.currentTranslations);
      }, 500);
    });
  }
});

const translations = {
    en: {
        // ... existing translations ...
        nav_home: "Home",
        // ... existing translations ...
    },
    hi: {
        // ... existing translations ...
        nav_home: "होम",
        // ... existing translations ...
    },
    mr: {
        // ... existing translations ...
        nav_home: "मुख्यपृष्ठ",
        "products-title": "विक्रीसाठी उत्पादने",
        "sno": "क्र.",
        "product": "उत्पादन",
        "price": "किंमत",
        "ghee": "तूप",
        "buttermilk": "ताक",
        "biological-letter(jaivik-khat)": "जैविक खात",
        "vermi-compost(gandul-khat)": "गांडूळ खत",
        "vermiwash(vermi-wash)": "वर्मीवॉश",
        "dashparni-ark": "दशपर्णी अर्क",
        "gomutra": "गोमुत्र",
        "gokrupamrit": "गोकृपामृत",
        "cow-dung-cake": "गोवरी",
        "price-ghee": "२०००/ली",
        "price-buttermilk": "२०/ली",
        "price-biological-letter": "२०/कि",
        "price-vermi-compost": "२५/कि",
        "price-vermiwash": "६०/ली",
        "price-dashparni-ark": "१२०/ली",
        "price-gomutra": "३०/ली",
        "price-gokrupamrit": "३०/ली",
        "price-cow-dung-cake": "५/नग",
        // ... existing translations ...
    }
};
