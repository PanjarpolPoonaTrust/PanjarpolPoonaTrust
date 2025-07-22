// NAARAD Chatbot Script
(function() {
  const btn = document.getElementById('narayan-chatbot-btn');
  const windowEl = document.getElementById('narayan-chatbot-window');
  const messages = document.getElementById('narayan-chat-messages');
  const chatPopup = document.querySelector('.chat-popup');
  const callNowBtn = document.getElementById('callNowBtn');

  // Chat history storage
  const CHAT_HISTORY_KEY = 'narayan_chat_history';

  // Check if this is a new session
  const isNewSession = !sessionStorage.getItem('narayan_session_started');
  if (isNewSession) {
    // Clear chat history for new session
    localStorage.removeItem(CHAT_HISTORY_KEY);
    localStorage.removeItem('narayan_language');
    sessionStorage.setItem('narayan_session_started', 'true');
  }

  // Language support
  let narayanLang = localStorage.getItem('narayan_language') || null;
  let langChosen = !!narayanLang;
  
  // Load chat history
  function loadChatHistory() {
    const history = localStorage.getItem(CHAT_HISTORY_KEY);
    if (history) {
      const parsedHistory = JSON.parse(history);
      messages.innerHTML = ''; // Clear existing messages
      parsedHistory.forEach(msg => {
        const div = document.createElement('div');
        div.className = `narayan-message ${msg.type}`;
        div.innerHTML = msg.content;
        messages.appendChild(div);
        
        // Reattach event listeners for language buttons
        div.querySelectorAll('.narayan-lang-btn').forEach(btn => {
          btn.onclick = function() {
            setLanguage(btn.getAttribute('data-lang'), btn.innerText);
          };
        });

        // Reattach event listeners for question buttons
        div.querySelectorAll('.question-btn').forEach(btn => {
          btn.onclick = function() {
            const question = btn.getAttribute('data-question');
            const answer = btn.getAttribute('data-answer');
            addUserMessage(question);
            setTimeout(() => {
              addBotMessageWithTyping(answer);
            }, 500);
          };
        });
      });
      messages.scrollTop = messages.scrollHeight;
    }
  }

  // Save chat history
  function saveChatHistory() {
    const messageElements = messages.querySelectorAll('.narayan-message');
    const history = Array.from(messageElements).map(el => ({
      type: el.classList.contains('narayan-bot') ? 'narayan-bot' : 'narayan-user',
      content: el.innerHTML
    }));
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
  }

  const botTexts = {
    en: {
      greet: "Hello! I am NAARAD, your AI assistant. Please select a question to learn more about our trust:",
      language: 'Please choose a language: <button class="narayan-lang-btn" data-lang="en">English</button> <button class="narayan-lang-btn" data-lang="hi">हिन्दी</button> <button class="narayan-lang-btn" data-lang="mr">मराठी</button>',
      setlang: 'Language set to: ',
      other: 'Other',
      notification: '📞 You will get your reply within 24-48 hours',
      questions: [
        {
          q: "What is Poona Panjarpole Trust?",
          a: "Poona Panjarpole Trust, established in 1855, is a sanctuary for over 2,200 cattle. Located in Bhosari, we provide shelter, food, and medical care to abandoned and aging cattle."
        },
        {
          q: "How can I donate?",
          a: "You can donate through our UPI ID: Mswipe.1400041924000711@kotak or visit our donation section for bank details. Every contribution helps us care for our cattle."
        },
        {
          q: "What products do you sell?",
          a: "We sell various products including Ghee, Buttermilk, Biological Letter, Vermi Compost, Vermiwash, and more. Visit our Products section for details."
        },
        {
          q: "How can I volunteer?",
          a: "You can volunteer by filling out the form in our Volunteer section. We welcome help with daily care, event organization, and spreading awareness about our cause."
        },
        {
          q: "Where are you located?",
          a: "We are located at Pune-Nashik Highway, Bhosari, Pune – 411039. You can find our exact location in the Contact Us section with a map."
        }
      ]
    },
    hi: {
      greet: "नमस्ते! मैं NAARAD हूं, आपकी AI सहायक। कृपया हमारे ट्रस्ट के बारे में अधिक जानने के लिए एक प्रश्न चुनें:",
      language: 'कृपया भाषा चुनें: <button class="narayan-lang-btn" data-lang="en">English</button> <button class="narayan-lang-btn" data-lang="hi">हिन्दी</button> <button class="narayan-lang-btn" data-lang="mr">मराठी</button>',
      setlang: 'भाषा सेट की गई: ',
      other: 'अन्य',
      notification: '📞 आपको 24-48 घंटों के भीतर उत्तर मिल जाएगा',
      questions: [
        {
          q: "पूना पंजरपोल ट्रस्ट क्या है?",
          a: "पूना पंजरपोल ट्रस्ट, 1855 में स्थापित, 2,200 से अधिक पशुओं के लिए एक आश्रय स्थल है। भोसरी में स्थित, हम परित्यक्त और वृद्ध पशुओं को आश्रय, भोजन और चिकित्सा देखभाल प्रदान करते हैं।"
        },
        {
          q: "मैं दान कैसे कर सकता हूं?",
          a: "आप हमारे UPI ID: Mswipe.1400041924000711@kotak के माध्यम से दान कर सकते हैं या बैंक विवरण के लिए हमारे दान खंड पर जा सकते हैं। हर योगदान हमारे पशुओं की देखभाल में मदद करता है।"
        },
        {
          q: "आप कौन से उत्पाद बेचते हैं?",
          a: "हम विभिन्न उत्पाद बेचते हैं जिनमें घी, छाछ, जैविक खाद, वर्मी कम्पोस्ट, वर्मीवॉश और अधिक शामिल हैं। विवरण के लिए हमारे उत्पाद खंड पर जाएं।"
        },
        {
          q: "मैं स्वयंसेवक कैसे बन सकता हूं?",
          a: "आप हमारे स्वयंसेवक खंड में फॉर्म भरकर स्वयंसेवक बन सकते हैं। हम दैनिक देखभाल, कार्यक्रम आयोजन और हमारे कारण के बारे में जागरूकता फैलाने में मदद का स्वागत करते हैं।"
        },
        {
          q: "आप कहाँ स्थित हैं?",
          a: "हम पुणे-नाशिक हाईवे, भोसरी, पुणे - 411039 पर स्थित हैं। आप हमारा सटीक स्थान संपर्क खंड में नक्शे के साथ पा सकते हैं।"
        }
      ]
    },
    mr: {
      greet: "नमस्कार! मी NAARAD आहे, तुमची AI सहाय्यक. कृपया आमच्या ट्रस्टबद्दल अधिक जाणून घेण्यासाठी एक प्रश्न निवडा:",
      language: 'कृपया भाषा निवडा: <button class="narayan-lang-btn" data-lang="en">English</button> <button class="narayan-lang-btn" data-lang="hi">हिन्दी</button> <button class="narayan-lang-btn" data-lang="mr">मराठी</button>',
      setlang: 'भाषा सेट केली: ',
      other: 'इतर',
      notification: '📞 तुम्हाला 24-48 तासांत उत्तर मिळेल',
      questions: [
        {
          q: "पूना पंजरपोल ट्रस्ट म्हणजे काय?",
          a: "पूना पंजरपोल ट्रस्ट, 1855 मध्ये स्थापन केलेले, 2,200 पेक्षा जास्त गुरांसाठी एक आश्रयस्थान आहे. भोसरी येथे स्थित, आम्ही परित्यक्त आणि वृद्ध गुरांना आश्रय, अन्न आणि वैद्यकीय सेवा पुरवतो."
        },
        {
          q: "मी दान कसे करू शकतो?",
          a: "तुम्ही आमच्या UPI ID: Mswipe.1400041924000711@kotak द्वारे दान करू शकता किंवा बँक तपशीलांसाठी आमच्या दान विभागात जाऊ शकता. प्रत्येक योगदान आमच्या गुरांच्या काळजीत मदत करते."
        },
        {
          q: "तुम्ही कोणते उत्पादने विकता?",
          a: "आम्ही तूप, छाछ, जैविक खत, वर्मी कम्पोस्ट, वर्मीवॉश आणि अधिक उत्पादने विकतो. तपशीलांसाठी आमच्या उत्पादन विभागात जा."
        },
        {
          q: "मी स्वयंसेवक कसा बनू शकतो?",
          a: "तुम्ही आमच्या स्वयंसेवक विभागात फॉर्म भरून स्वयंसेवक बनू शकता. आम्ही दैनंदिन काळजी, कार्यक्रम आयोजन आणि आमच्या कार्याबद्दल जागरूकता पसरवण्यात मदत करण्यास स्वागत करतो."
        },
        {
          q: "तुम्ही कुठे स्थित आहात?",
          a: "आम्ही पुणे-नाशिक महामार्ग, भोसरी, पुणे - 411039 येथे स्थित आहोत. तुम्ही आमचे अचूक स्थान संपर्क विभागात नकाशासह शोधू शकता."
        }
      ]
    }
  };

  // Add typing indicator
  function addTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'narayan-message narayan-bot typing';
    div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  // Remove typing indicator
  function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  // Add bot message with typing animation
  async function addBotMessageWithTyping(msg) {
    if (!msg || (typeof msg === 'string' && msg.trim() === '')) return;
    const typingIndicator = addTypingIndicator();
    await new Promise(resolve => setTimeout(resolve, 1500));
    removeTypingIndicator(typingIndicator);
    const div = document.createElement('div');
    div.className = 'narayan-message narayan-bot';
    div.innerHTML = msg;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;

    // Add event listeners for language buttons
    div.querySelectorAll('.narayan-lang-btn').forEach(btn => {
      btn.onclick = function() {
        setLanguage(btn.getAttribute('data-lang'), btn.innerText);
      };
    });

    // Add event listeners for question buttons
    div.querySelectorAll('.question-btn').forEach(btn => {
      btn.onclick = function() {
        const question = btn.getAttribute('data-question');
        const answer = btn.getAttribute('data-answer');
        addUserMessage(question);
        setTimeout(() => {
          addBotMessageWithTyping(answer);
        }, 500);
      };
    });

    saveChatHistory();
  }

  // Toggle chat window
  btn.addEventListener('click', () => {
    windowEl.classList.toggle('closed');
    if (!windowEl.classList.contains('closed')) {
      if (callNowBtn) callNowBtn.style.display = 'none';
      const socialToggleBtn = document.getElementById('socialToggleBtn');
      if (socialToggleBtn) socialToggleBtn.style.display = 'none';
      chatPopup.style.display = 'none';
      setTimeout(() => { messages.scrollTop = messages.scrollHeight; }, 100);
      if (!langChosen) {
        showLanguagePrompt();
      } else {
        loadChatHistory();
        if (messages.children.length === 0) {
          showQuestions();
        }
      }
    } else {
      if (callNowBtn) callNowBtn.style.display = '';
      const socialToggleBtn = document.getElementById('socialToggleBtn');
      if (socialToggleBtn) socialToggleBtn.style.display = '';
      chatPopup.style.display = 'block';
    }
  });

  // Add user message
  function addUserMessage(msg) {
    const div = document.createElement('div');
    div.className = 'narayan-message narayan-user';
    div.innerText = msg;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    saveChatHistory();
  }

  async function setLanguage(lang, label) {
    narayanLang = lang;
    langChosen = true;
    localStorage.setItem('narayan_language', lang);
    await addBotMessageWithTyping(botTexts[narayanLang].setlang + label + '.<br>' + botTexts[narayanLang].greet);
    showQuestions();
  }

  // Show language selection as first message
  function showLanguagePrompt() {
    if (!messages.children.length) {
      addBotMessageWithTyping(botTexts.en.language);
    }
  }

  // Show questions
  function showQuestions() {
    const questions = botTexts[narayanLang].questions;
    let questionsHtml = '<div class="questions-container">';
    questions.forEach(q => {
      questionsHtml += `<button class="question-btn" data-question="${q.q}" data-answer="${q.a}">${q.q}</button>`;
    });
    questionsHtml += `<button class="question-btn other-btn">${botTexts[narayanLang].other}</button>`;
    questionsHtml += '</div>';
    addBotMessageWithTyping(questionsHtml);
  }

  // Listen for 'Other' button click and show input
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('other-btn')) {
      const currentLang = narayanLang || 'en';
      const notificationText = botTexts[currentLang].notification;
      const inputHtml = `
        <div class="other-input-container">
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 10px; margin-bottom: 10px; color: #856404; font-size: 0.9em; text-align: center;">
            ${notificationText}
          </div>
          <input type="text" id="other-message" placeholder="Type your message..." style="width: 70%; padding: 0.5em; margin-right: 0.5em;">
          <button id="send-other-btn" style="padding: 0.5em 1em;">Send</button>
        </div>
      `;
      addBotMessageWithTyping(inputHtml);
    }
    if (e.target && e.target.id === 'send-other-btn') {
      const msg = document.getElementById('other-message').value.trim();
      if (msg) {
        window.open(`https://wa.me/918999158881?text=${encodeURIComponent(msg)}`, '_blank');
      }
    }
  });

  // On load, check for existing chat history
  if (!windowEl.classList.contains('closed')) {
    const history = localStorage.getItem(CHAT_HISTORY_KEY);
    if (history) {
      loadChatHistory();
    } else {
      showLanguagePrompt();
    }
  }

  // Listen for translation updates and update the chatbot popup
  if (window.applyTranslations) {
    const origApplyTranslations = window.applyTranslations;
    window.applyTranslations = function() {
      origApplyTranslations();
      // Update chatbot popup text
      if (chatPopup && window.currentTranslations && window.currentTranslations['chatbot_popup']) {
        chatPopup.innerHTML = window.currentTranslations['chatbot_popup'];
        console.log('[Chatbot Popup] Language:', (window.currentTranslations && window.currentTranslations['nav_home']) ? window.currentTranslations['nav_home'] : 'unknown', '| Text:', window.currentTranslations['chatbot_popup']);
      }
    };
  }

  // Remove popup show/hide cycle, always show popup unless chat window is open
  if (chatPopup) {
    chatPopup.style.display = 'block';
    chatPopup.addEventListener('mouseenter', () => {
      chatPopup.style.display = 'block';
    });
    chatPopup.addEventListener('mouseleave', () => {
      chatPopup.style.display = 'block';
    });
  }
})(); 
