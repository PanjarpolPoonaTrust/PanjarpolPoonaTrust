// script.js
&nbsp;
&nbsp;

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
&nbsp;
&nbsp;

  // Language Toggle Functionality
  document.getElementById('lang-marathi').addEventListener('click', function() {
    alert('Marathi language selected.'); // Replace with actual language change logic
  });
&nbsp;
&nbsp;

  document.getElementById('lang-hindi').addEventListener('click', function() {
    alert('Hindi language selected.'); // Replace with actual language change logic
  });
&nbsp;
&nbsp;

  // Chatbot send message functionality
  document.getElementById("chat-send-btn").addEventListener("click", sendChatMessage);
&nbsp;
&nbsp;

  function sendChatMessage() {
    const name = document.getElementById('chat-name').value.trim();
    const message = document.getElementById('chat-message').value.trim();
&nbsp;
&nbsp;

    if (!name || !message) {
      alert('Please fill out both fields.');
      return;
    }
&nbsp;
&nbsp;

    const finalMessage = `Hello, my name is ${name}. ${message}`;
&nbsp;
&nbsp;

    // Open WhatsApp chat in new tab
    window.open(`https://wa.me/918999158881?text=${encodeURIComponent(finalMessage)}`, '_blank');
&nbsp;
&nbsp;

    // Open email client
    window.location.href = `mailto:punepanjarpoltrust855@gmail.com?subject=Message from Website&body=${encodeURIComponent(finalMessage)}`;
&nbsp;
&nbsp;

    // Hide chatbot after sending with animation
    chatBox.style.opacity = "0";
    chatBox.style.transform = "scale(0.95)";
    chatBox.style.pointerEvents = "none";
    setTimeout(() => {
      chatBox.style.display = "none";
    }, 300); // Match the transition duration
&nbsp;
&nbsp;

    // Clear inputs
    document.getElementById('chat-name').value = '';
    document.getElementById('chat-message').value = '';
  }
});