document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const arrow = button.querySelector('.arrow');

    answer.classList.toggle('show');
    arrow.textContent = arrow.textContent === '▼' ? '▲' : '▼';
  });
});

const studentBtn = document.getElementById('studentButton');
const mentorBtn = document.getElementById('mentorButton');
const studentPanel = document.getElementById('studentContent');
const mentorPanel = document.getElementById('mentorContent');

studentBtn.addEventListener('click', () => {
  studentBtn.classList.add('active');
  mentorBtn.classList.remove('active');
  studentPanel.classList.add('active');
  mentorPanel.classList.remove('active');
});

mentorBtn.addEventListener('click', () => {
  mentorBtn.classList.add('active');
  studentBtn.classList.remove('active');
  mentorPanel.classList.add('active');
  studentPanel.classList.remove('active');
});


const form = document.querySelector('#contact-form');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

if (form) {
  form.addEventListener('submit', function (e) {
    let valid = true;
    const email = emailInput.value.trim();
    const message = messageInput ? messageInput.value.trim() : '';

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      alert("Please enter a valid email address.");
      valid = false;
    }

    if (messageInput && message === '') {
      alert("Please enter your message.");
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });
}

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

const backToTopBtn = document.querySelector('#back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const counter = document.getElementById("visit-counter");
let visits = localStorage.getItem("taskTamerVisits") || 0;
visits++;
localStorage.setItem("taskTamerVisits", visits);
counter.textContent = `Visits: ${visits}`;


      let personalContext = "";

      fetch('context.txt')
      .then(response => response.text())
      .then(data => {
      personalContext = data;
      })
      .catch(error => {
         console.warn("Failed to load dynamic context. Using fallback.");
         personalContext = `
         You are an AI assistant representing TaskTamer, a productivity-focused startup. Here's the comprehensive information about TaskTamer:

         STARTUP OVERVIEW:
         - Name: TaskTamer
         - Mission: To empower students to take charge of their time and goals through smart, gamified tools that make productivity feel fun and achievable
         - Product Type: Web-based productivity tool with gamification features
         - Vision: To create a world where students feel confident, focused, and in control of their time—where getting things done feels as rewarding as playing a game. We imagine a future where productivity is not stressful, but empowering and even fun

         FEATURES:
         1. Quest List:
         - Daily tasks become quests
         - AI adjusts difficulty based on user progress
          2. Challenge Arena:
         - Compete with friends
       - Real-time leaderboards and XP tracking
         3. Smart Scheduler:
         - AI-powered time management suggestions
         - Personalized reminders
         4. Streak Tracker:
          - Encourages habit building
          - Visual badges and motivational nudges

         TARGET AUDIENCE:
         - Students: Stay motivated and organized with gamified to-dos
         - Mentors: Assign challenges and track student progress

         COMPANY VALUES:
         - Fun + Functionality: Merging productivity with gamified experience
         - Personalization: AI adapts to each user's behavior
         - Engagement: Keep users consistent with rewards and social features

         CONTACT:
         - Email: tasktamer@gmail.com.com
         - Phone: +254 111 239 593
         - GitHub: https://github.com/MERLYNOMAGWA

         When answering questions, be friendly, helpful, and encouraging. Guide users on how to use features, explain benefits clearly, and represent the TaskTamer brand with enthusiasm.
         `;
      });

      let puterInitialized = false;
      async function initializePuter() {
        if (puterInitialized) return;
        try {
          await puter.init();
          puterInitialized = true;
          console.log("Puter initialized");
        } catch (error) {
          console.error("Puter initialization error:", error);
          puterInitialized = false;
        }
      }

      const chatMessages = document.getElementById("chatMessages");
      const chatInput = document.getElementById("chatInput");
      const sendButton = document.getElementById("sendButton");
      const typingIndicator = document.getElementById("typingIndicator");

      function addMessage(content, isUser = false) {
         const messageDiv = document.createElement("div");
         messageDiv.className = `message ${isUser ? "user" : "bot"}`;

         const avatarDiv = document.createElement("div");
         avatarDiv.className = `message-avatar ${isUser ? "user-avatar" : "bot-avatar"}`;
         avatarDiv.textContent = isUser ? "U" : "AI";

         const bubbleDiv = document.createElement("div");
         bubbleDiv.className = "message-bubble";
         bubbleDiv.textContent = content;

         if (isUser) {
         messageDiv.appendChild(bubbleDiv);
         messageDiv.appendChild(avatarDiv);
         } else {
         messageDiv.appendChild(avatarDiv);
         messageDiv.appendChild(bubbleDiv);
         }

         chatMessages.appendChild(messageDiv);
         chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      function showTypingIndicator() {
         typingIndicator.style.display = "flex";
         chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      function hideTypingIndicator() {
         typingIndicator.style.display = "none";
      }

      async function sendMessage() {
         const message = chatInput.value.trim();
         if (!message) {
         addMessage("Please enter a question!", false);
         return;
         }

         addMessage(message, true);
         chatInput.value = "";
         sendButton.disabled = true;
         showTypingIndicator();

        try {
          await initializePuter();

          const response = await puter.ai.chat({
            messages: [
              { role: "system", content: personalContext },
              { role: "user", content: message }
            ],
            model: "gpt-4",
            temperature: 0.7,
            max_tokens: 500
          });

         hideTypingIndicator();

         if (response && response.message) {
         addMessage(response.message);
         } else {
            addMessage("I'm TaskTamer! Ask me how to use features like quests, leaderboards, scheduling, or tracking streaks.");
         }
         } catch (error) {
         console.error("Chat error:", error);
         hideTypingIndicator();
         const fallbackResponse = getFallbackResponse(message.toLowerCase());
         addMessage(fallbackResponse);
      }

         sendButton.disabled = false;
      }

      function getFallbackResponse(message) {
         if (message.includes("who founded") || message.includes("founder")) {
            return "TaskTamer was founded by Merlyn Omagwa a 17 year old passionate about merging productivity with gaming.";
         } else if (message.includes("problem")) {
            return "We help students and mentors stay organized and motivated by turning tasks into interactive quests.";
         } else if (message.includes("service") || message.includes("product")) {
            return "TaskTamer offers Quest Lists, Smart Scheduling, Leaderboards, and Habit Streak Tracking to boost productivity.";
         } else if (message.includes("contact") || message.includes("support") || message.includes("involved")) {
            return "You can contact us using the contact form above, through our email at tasktamer@gmail.com or telephone number +254 111 239 593 ";
         } else if (message.includes("vision") || message.includes("goal")) {
            return "Our vision is To create a world where students feel confident, focused, and in control of their time—where getting things done feels as rewarding as playing a game. We imagine a future where productivity is not stressful, but empowering and even fun.";
         } else if (message.includes("story") || message.includes("begin")) {
            return "TaskTamer was born during a gap year by Merlyn Omagwa, a 17-year-old student who was tired of boring planners and procrastination. Inspired by how games keep us hooked with points, rewards, and goals, she teamed up with friends to create a new kind of productivity app—one that feels more like play than pressure.";
         } else if (message.includes("mission")) {
            return "To empower students to take charge of their time and goals through smart, gamified tools that make productivity feel fun and achievable.";
        } else {
            return "I'm your friendly TaskTamer assistant! Ask me about our features, how to join, or anything else about our startup.";
         }
      }

      function askQuestion(question) {
         chatInput.value = question;
         sendMessage();
      }

      sendButton.addEventListener("click", sendMessage);
      chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
      });
