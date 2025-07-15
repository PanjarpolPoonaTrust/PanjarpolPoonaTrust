// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for nav links
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Language Toggle Functionality
  const langMarathi = document.getElementById('lang-marathi');
  if (langMarathi) {
    langMarathi.addEventListener('click', function() {
      alert('Marathi language selected.'); // Replace with actual language change logic
    });
  }

  const langHindi = document.getElementById('lang-hindi');
  if (langHindi) {
    langHindi.addEventListener('click', function() {
      alert('Hindi language selected.'); // Replace with actual language change logic
    });
  }

  // Chatbot send message functionality
  const chatSendBtn = document.getElementById("chat-send-btn");
  if (chatSendBtn) {
    chatSendBtn.addEventListener("click", sendChatMessage);
  }

  function sendChatMessage() {
    const name = document.getElementById('chat-name').value.trim();
    const message = document.getElementById('chat-message').value.trim();

    if (!name || !message) {
      alert('Please fill out both fields.');
      return;
    }

    const finalMessage = `Hello, my name is ${name}. ${message}`;

    // Open WhatsApp chat in new tab
    window.open(`https://wa.me/918999158881?text=${encodeURIComponent(finalMessage)}`, '_blank');

    // Open email client
    window.location.href = `mailto:punepanjarpoltrust855@gmail.com?subject=Message from Website&body=${encodeURIComponent(finalMessage)}`;

    // Hide chatbot after sending with animation
    chatBox.style.opacity = "0";
    chatBox.style.transform = "scale(0.95)";
    chatBox.style.pointerEvents = "none";
    setTimeout(() => {
      chatBox.style.display = "none";
    }, 300); // Match the transition duration

    // Clear inputs
    document.getElementById('chat-name').value = '';
    document.getElementById('chat-message').value = '';
  }

  // Donate Modal Logic for both sidebar and main donate buttons
  (function() {
    const donateBtn = document.getElementById('donate-modal-btn');
    const donateSidebarBtn = document.querySelector('.donate-sidebar');
    const modal = document.getElementById('donate-modal');
    const blur = document.getElementById('donate-modal-blur');
    const closeBtn = document.getElementById('donate-modal-close');
    const tabUPI = document.getElementById('donate-tab-upi');
    const tabNet = document.getElementById('donate-tab-netbanking');
    const contentUPI = document.getElementById('donate-content-upi');
    const contentNet = document.getElementById('donate-content-netbanking');
    const formBtn = document.getElementById('donate-modal-form-btn');
    const amountStep = document.getElementById('donate-amount-step');
    const paymentStep = document.getElementById('donate-payment-step');
    const backBtn = document.getElementById('back-to-amount');

    function openModal(e) {
      if (e) e.preventDefault();
      modal.style.display = 'block';
      blur.style.display = 'block';
      document.body.style.overflow = 'hidden';
      // Always start at amount step
      amountStep.classList.add('active');
      paymentStep.classList.remove('active');
    }
    function closeModal() {
      modal.style.display = 'none';
      blur.style.display = 'none';
      document.body.style.overflow = '';
    }
    if (donateBtn) donateBtn.onclick = openModal;
    if (donateSidebarBtn) donateSidebarBtn.onclick = openModal;
    if (closeBtn) closeBtn.onclick = closeModal;
    if (blur) blur.onclick = closeModal;
    // Tab switching
    if (tabUPI && tabNet && contentUPI && contentNet) {
      tabUPI.onclick = function() {
        tabUPI.classList.add('active');
        tabNet.classList.remove('active');
        contentUPI.classList.add('active');
        contentNet.classList.remove('active');
      };
      tabNet.onclick = function() {
        tabNet.classList.add('active');
        tabUPI.classList.remove('active');
        contentNet.classList.add('active');
        contentUPI.classList.remove('active');
      };
    }
    // Form button (replace # with your form link)
    if (formBtn) formBtn.href = 'https://docs.google.com/forms/d/e/1FAIpQLScegVommazp9BBatggeCktJk1xtMdp4V2xGyKK85eTjnSOXaQ/viewform?usp=dialog';

    // Amount selection logic
    const amountPresets = document.querySelectorAll('.amount-preset');
    const customAmountInput = document.getElementById('custom-amount-input');
    const proceedBtn = document.getElementById('proceed-to-payment');
    const displayAmount = document.getElementById('display-amount');

    let selectedAmount = 0;

    // Amount preset selection
    amountPresets.forEach(button => {
      button.addEventListener('click', function() {
        amountPresets.forEach(p => p.classList.remove('selected'));
        this.classList.add('selected');
        selectedAmount = parseInt(this.getAttribute('data-amount'));
        customAmountInput.value = '';
        displayAmount.textContent = `₹${selectedAmount}`;
        proceedBtn.disabled = false;
      });
    });

    // Custom amount input
    customAmountInput.addEventListener('input', function() {
      const value = parseInt(this.value) || 0;
      selectedAmount = value;
      if (value > 0) {
        amountPresets.forEach(p => p.classList.remove('selected'));
        displayAmount.textContent = `₹${selectedAmount}`;
        proceedBtn.disabled = false;
      } else {
        displayAmount.textContent = '₹0';
        proceedBtn.disabled = true;
      }
    });

    // Proceed to payment
    proceedBtn.addEventListener('click', function() {
      if (selectedAmount > 0) {
        amountStep.classList.remove('active');
        paymentStep.classList.add('active');
        displayAmount.textContent = `₹${selectedAmount}`;
      }
    });

    // Back to amount selection
    backBtn.addEventListener('click', function() {
      paymentStep.classList.remove('active');
      amountStep.classList.add('active');
    });
  })();

  // Donate popup logic
  const donateSidebar = document.querySelector('.donate-sidebar');
  const donatePopup = document.getElementById('donate-popup');
  let popupVisible = false;
  let popupTimeout;

  // Function to update donate popup text and re-attach event
  function updateDonatePopupText() {
    const popupSpan = donatePopup.querySelector('[data-i18n="donate_popup_text"]');
    if (popupSpan && typeof currentTranslations === 'object' && currentTranslations['donate_popup_text']) {
      popupSpan.innerHTML = currentTranslations['donate_popup_text'];
    }
    // Re-attach the Learn more link handler
    const learnMore = donatePopup.querySelector('#donate-learn-more');
    if (learnMore) {
      learnMore.onclick = function(e) {
        e.preventDefault();
        document.getElementById('donate-learnmore-blur').style.display = 'block';
        document.getElementById('donate-learnmore-modal').style.display = 'block';
        var content = (typeof currentTranslations === 'object' && currentTranslations['donate_learnmore_content']) ? currentTranslations['donate_learnmore_content'] : '';
        document.getElementById('donate-learnmore-content').innerHTML = content;
      };
    }
  }

  function toggleDonatePopup() {
    if (popupVisible) {
      donatePopup.style.display = 'none';
      popupVisible = false;
      popupTimeout = setTimeout(toggleDonatePopup, 10000); // Show after 10s
    } else {
      donatePopup.style.display = 'block';
      donatePopup.style.zIndex = 1100;
      popupVisible = true;
      popupTimeout = setTimeout(toggleDonatePopup, 10000); // Hide after 10s
    }
  }

  // Start the popup cycle after DOM is ready
  setTimeout(toggleDonatePopup, 1000); // Initial delay for better UX

  // Pause popup when hovering over donate button or popup
  [donateSidebar, donatePopup].forEach(el => {
    el.addEventListener('mouseenter', () => {
      clearTimeout(popupTimeout);
      donatePopup.style.display = 'block';
      donatePopup.style.zIndex = 1100;
      popupVisible = true;
    });
    el.addEventListener('mouseleave', () => {
      popupTimeout = setTimeout(toggleDonatePopup, 1000);
    });
  });

  // Initial update and on language change
  updateDonatePopupText();
  if (window.applyTranslations) {
    const origApplyTranslations = window.applyTranslations;
    window.applyTranslations = function() {
      origApplyTranslations();
      updateDonatePopupText();
    };
  }

  // Learn more link handler (show modal with content)
  document.getElementById('donate-learn-more').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('donate-learnmore-blur').style.display = 'block';
    document.getElementById('donate-learnmore-modal').style.display = 'block';
    document.getElementById('donate-learnmore-content').innerHTML = `
      <h2 style="text-align:center;font-size:1.3em;margin-bottom:0.7em;">🌟 Why Donating to Poona Panjarpol Trust Benefits Both You and the Cattle</h2>
      <p>When you donate to Poona Panjarpol Trust, you’re not just helping—<br>
      you’re becoming a lifeline for abandoned cows and bulls who deserve love, care, and dignity. 🐄💛<br>
      But did you know? Your kindness also brings financial benefits to you!</p>
      <p><b>Under Section 80G of the Income Tax Act, your donation is eligible for tax deduction.</b><br>Here's what that means for you:</p>
      <ul style="margin-left:1em;">
        <li><b>💸 1. Save Taxes While Saving Lives</b><br>
          Poona Panjarpol Trust is a registered NGO with 80G certification.<br>
          This means your donation helps you reduce your taxable income, legally and easily.<br>
          You save money, and our cows and bulls get the care they need.
        </li>
        <li style="margin-top:0.7em;"><b>🧾 2. Claim Up to 50% Deduction on Donations</b><br>
          Donations to us qualify for 50% tax deduction<br>
          <i>Example: If you donate ₹10,000, you can deduct ₹5,000 from your taxable income—which means less tax to pay and more peace of mind</i>
        </li>
        <li style="margin-top:0.7em;"><b>🏢 3. Individuals, Businesses & CSR—Everyone Can Benefit</b><br>
          Whether you’re:<br>
          <span style="margin-left:1em;">🧍‍♂️ A kind-hearted individual<br>🏪 A growing business<br>🏢 Or a corporate fulfilling your CSR obligation</span><br>
          👉 Your donation to us helps abandoned animals and gives you tax savings in return.
        </li>
        <li style="margin-top:0.7em;"><b>💳 4. Donate Smart—Cash Limit Applies</b><br>
          To claim your tax deduction, follow these simple rules:<br>
          Donate via UPI, bank transfer, cheque, or card<br>
          <b>Avoid cash donations above ₹2,000</b>, as they do not qualify for tax benefits<br>
          So go digital—it's easy, secure, and tax-friendly! ✅
        </li>
        <li style="margin-top:0.7em;"><b>📜 5. We’ll Give You All the Right Documents</b><br>
          After you donate, we provide:<br>
          <span style="margin-left:1em;">• A Donation Receipt with your details<br>• Our official 80G certificate number<br>• Our PAN<br>• And Form 10BE at year-end (required for claiming deduction)</span><br>
          You just submit this with your income tax return—and enjoy the benefits!
        </li>
      </ul>
      <div style="margin:1.2em 0;text-align:center;">
        <b>🤝 Give with Heart, Save with Mind</b><br>
        <table style="margin:0.7em auto 0 auto;font-size:1em;border-collapse:collapse;">
          <tr style="background:#ffecc2;"><th style="padding:0.4em 1em;">💖 Your Gift</th><th style="padding:0.4em 1em;">🐄 Our Impact</th><th style="padding:0.4em 1em;">📉 Your Benefit</th></tr>
          <tr><td style="padding:0.4em 1em;">Donation to protect cows & bulls</td><td style="padding:0.4em 1em;">Food, shelter, medical care, and love</td><td style="padding:0.4em 1em;">50% tax deduction (under 80G)</td></tr>
        </table>
      </div>
      <p style="margin-top:1.2em;">🙏 <b>Help Us Continue This Sacred Work</b><br>
      Your donation directly supports the rescue, feeding, sheltering, and treatment of helpless cows and bulls who would otherwise be left on the streets.</p>
      <p>💬 <b>Have questions?</b> Reach out to us—<br>We're happy to help you with the donation process and 80G documentation.</p>
      <div style="text-align:center;margin-top:1.2em;">
        <b>👉 Donate to Poona Panjarpol Trust today — and turn compassion into action!</b>
      </div>
    `;
  });
  // Close modal logic
  document.getElementById('donate-learnmore-close').addEventListener('click', function() {
    document.getElementById('donate-learnmore-blur').style.display = 'none';
    document.getElementById('donate-learnmore-modal').style.display = 'none';
  });
  document.getElementById('donate-learnmore-blur').addEventListener('click', function() {
    document.getElementById('donate-learnmore-blur').style.display = 'none';
    document.getElementById('donate-learnmore-modal').style.display = 'none';
  });

  // My Seva Journey Card Slider Logic
  const sevaCards = document.querySelectorAll('.my-seva-journey-card');
  const prevBtn = document.getElementById('sevaPrevBtn');
  const nextBtn = document.getElementById('sevaNextBtn');
  let sevaCurrent = 0;
  let sevaInterval;

  function showSevaCard(idx) {
    sevaCards.forEach((card, i) => {
      card.classList.toggle('active', i === idx);
    });
  }

  function nextSevaCard() {
    sevaCurrent = (sevaCurrent + 1) % sevaCards.length;
    showSevaCard(sevaCurrent);
  }

  function prevSevaCard() {
    sevaCurrent = (sevaCurrent - 1 + sevaCards.length) % sevaCards.length;
    showSevaCard(sevaCurrent);
  }

  function startSevaAutoScroll() {
    sevaInterval = setInterval(nextSevaCard, 4000);
  }

  function stopSevaAutoScroll() {
    clearInterval(sevaInterval);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSevaCard();
      stopSevaAutoScroll();
      startSevaAutoScroll();
    });
    nextBtn.addEventListener('click', () => {
      nextSevaCard();
      stopSevaAutoScroll();
      startSevaAutoScroll();
    });
  }

  const sevaSlider = document.querySelector('.my-seva-journey-slider');
  if (sevaSlider) {
    sevaSlider.addEventListener('mouseenter', stopSevaAutoScroll);
    sevaSlider.addEventListener('mouseleave', startSevaAutoScroll);
    showSevaCard(sevaCurrent);
    startSevaAutoScroll();
  }
});
