(function () {
    // 1. Inject Floating Button & Srishti Assistant UI Markup
    const chatbotHTML = `
        <div id="srishti-chatbot-widget">
            <!-- Fixed Floating Trigger Button -->
            <button id="srishti-chat-toggle" aria-label="Open Srishti Assistant">
                <span id="srishti-toggle-icon">✨</span>
                <span id="srishti-close-icon" style="display:none;">✕</span>
            </button>

            <!-- Chat Window Container -->
            <div id="srishti-chat-window">
                <div class="srishti-chat-header">
                    <div class="srishti-avatar">🌸</div>
                    <div class="srishti-header-info">
                        <h4>Srishti Assistant</h4>
                        <span>Online | HarshCode Studio AI</span>
                    </div>
                </div>

                <div class="srishti-chat-body" id="srishtiChatBody">
                    <div class="srishti-msg bot-msg">
                        Namaste! Main <strong>Srishti Assistant</strong> hoon, HarshCode Studio ki AI companion. Main website development, custom web apps, pricing, aur projects se jude sawaalon me aapki poori madad kar sakti hoon!
                    </div>
                    
                    <!-- Quick Tap Question Chips -->
                    <div class="srishti-quick-chips">
                        <button onclick="window.srishtiAsk('Website Banwane Ka Cost?')">💰 Website Pricing</button>
                        <button onclick="window.srishtiAsk('Tech Stack Kya Use Karte Ho?')">⚡ Tech Stack</button>
                        <button onclick="window.srishtiAsk('Kitna Time Lagta Hai?')">⏱️ Timeline</button>
                        <button onclick="window.srishtiAsk('Direct Harsh Se Kaise Contact Karein?')">📞 Contact Harsh</button>
                        <button onclick="window.srishtiAsk('Kya Mobile Responsive Hogi?')">📱 Mobile Support</button>
                    </div>
                </div>

                <form id="srishtiChatForm" class="srishti-chat-footer">
                    <input type="text" id="srishtiInput" placeholder="Sawaal poochein ya type karein..." autocomplete="off" required>
                    <button type="submit" id="srishtiSendBtn" aria-label="Send Message">➤</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // 2. Inject Scoped Responsive CSS (Scroll-Proof & Zero Conflict)
    const chatbotStyles = `
        #srishti-chatbot-widget {
            position: fixed !important;
            bottom: 24px !important;
            right: 24px !important;
            z-index: 999999 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }

        #srishti-chat-toggle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0284c7, #0f172a);
            color: #ffffff;
            border: 2px solid #38bdf8;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(2, 132, 199, 0.45);
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            outline: none;
        }

        #srishti-chat-toggle:hover {
            transform: scale(1.08);
            box-shadow: 0 14px 30px rgba(2, 132, 199, 0.55);
        }

        #srishti-chat-window {
            display: none;
            position: fixed !important;
            bottom: 96px !important;
            right: 24px !important;
            width: 360px;
            max-width: calc(100vw - 36px);
            height: 520px;
            max-height: 80vh;
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 20px 40px rgba(15, 23, 42, 0.22);
            flex-direction: column;
            overflow: hidden;
            animation: srishtiFadeUp 0.25s ease-out;
        }

        @keyframes srishtiFadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .srishti-chat-header {
            background: #0f172a;
            color: #ffffff;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 2px solid #0284c7;
        }

        .srishti-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #1e293b;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            border: 1.5px solid #38bdf8;
        }

        .srishti-header-info h4 {
            margin: 0;
            font-size: 0.98rem;
            font-weight: 700;
            color: #ffffff;
        }

        .srishti-header-info span {
            font-size: 0.75rem;
            color: #38bdf8;
            display: block;
        }

        .srishti-chat-body {
            flex: 1;
            padding: 14px;
            overflow-y: auto;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .srishti-msg {
            max-width: 84%;
            padding: 10px 14px;
            font-size: 0.88rem;
            line-height: 1.5;
            border-radius: 12px;
            word-wrap: break-word;
        }

        .bot-msg {
            background: #ffffff;
            color: #0f172a;
            align-self: flex-start;
            border: 1px solid #e2e8f0;
            border-bottom-left-radius: 2px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .user-msg {
            background: #0284c7;
            color: #ffffff;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }

        .srishti-quick-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 6px;
        }

        .srishti-quick-chips button {
            background: #e0f2fe;
            color: #0369a1;
            border: 1px solid #bae6fd;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .srishti-quick-chips button:hover {
            background: #0284c7;
            color: #ffffff;
            border-color: #0284c7;
        }

        .srishti-chat-footer {
            display: flex;
            padding: 12px;
            background: #ffffff;
            border-top: 1px solid #e2e8f0;
            gap: 8px;
        }

        #srishtiInput {
            flex: 1;
            padding: 10px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 24px;
            font-size: 0.9rem;
            outline: none;
            background: #f8fafc;
        }

        #srishtiInput:focus {
            border-color: #0284c7;
            background: #ffffff;
        }

        #srishtiSendBtn {
            width: 40px;
            height: 40px;
            background: #0284c7;
            color: #ffffff;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.15s ease;
        }

        #srishtiSendBtn:hover {
            background: #0369a1;
        }
    `;
    const styleEl = document.createElement("style");
    styleEl.innerHTML = chatbotStyles;
    document.head.appendChild(styleEl);

    // 3. Web Development Knowledge Base for Srishti Assistant
    const knowledgeBase = [
        {
            keywords: ["price", "cost", "charge", "kitne", "paisa", "rupaye", "rate", "fees"],
            reply: "Website ka cost features aur requirements par depend karta hai:<br>• <strong>Personal Portfolio / Landing Page:</strong> ₹2,500 – ₹5,000<br>• <strong>Business Multi-Page Website:</strong> ₹6,000 – ₹12,000<br>• <strong>Custom Web App / Real-time Cloud DB:</strong> ₹12,000+.<br>Custom estimate ke liye Harsh se direct baat karein!"
        },
        {
            keywords: ["tech", "technology", "stack", "languages", "code", "framework", "supabase"],
            reply: "HarshCode Studio modern aur ultra-lightweight technologies par kaam karta hai:<br>• <strong>Frontend:</strong> HTML5, CSS3, Modern JavaScript (ES6+), Tailwind CSS.<br>• <strong>Database & Cloud:</strong> Supabase (Real-Time PostgreSQL Cloud), IndexedDB.<br>• <strong>Security:</strong> SHA-256 Cryptographic Authentication & Client-side Image Auto-compression."
        },
        {
            keywords: ["time", "kitne din", "duration", "timeline", "kab tak"],
            reply: "Standard delivery timeline:<br>• <strong>Portfolio / Single Page:</strong> 24 se 48 ghante me live.<br>• <strong>Business Multi-page:</strong> 3 se 5 din.<br>• <strong>Full Web App / CMS Portal:</strong> 7 se 10 din."
        },
        {
            keywords: ["domain", "hosting", "deploy", "server", "github"],
            reply: "Hum websites ko modern cloud servers jaise GitHub Pages, Vercel ya Netlify par deploy karte hain, jahan 99.9% uptime aur free Lifetime SSL (HTTPS Secure Lock) milta hai."
        },
        {
            keywords: ["mobile", "responsive", "phone", "screen"],
            reply: "Bilkul! Humari banayi har website 100% mobile-friendly hoti hai. Phone, tablet ya desktop har screen size par layout apne-aap perfect fit hota hai."
        },
        {
            keywords: ["contact", "harsh", "number", "call", "whatsapp", "hire"],
            reply: "Aap direct Harsh Chaudhary Tomar se connect kar sakte hain:<br>• <strong>Call / WhatsApp:</strong> +91 94120 78091<br>• <strong>Instagram:</strong> @yubanshh_chaudhary01<br>• Ya website ke <a href='contact.html' style='color:#0284c7; font-weight:bold;'>Contact Page</a> par message submit karein."
        },
        {
            keywords: ["services", "service", "kaam", "kya banate", "features"],
            reply: "HarshCode Studio ki main services:<br>1. Responsive Portfolio & Business Websites.<br>2. Cloud Inventory & Billing Web Applications.<br>3. Admin CMS Dashboards with Real-time Feed.<br>4. High Speed SEO Optimization."
        }
    ];

    const fallbackResponse = "Aapke is requirement ke baare me main aapko Harsh se directly connect kar sakti hoon! Aap unhe <strong>+91 94120 78091</strong> par call/WhatsApp karein ya <a href='contact.html' style='color:#0284c7; font-weight:bold;'>Contact Page</a> par detail bhej dein.";

    // 4. Widget Interaction
    const toggleBtn = document.getElementById("srishti-chat-toggle");
    const chatWin = document.getElementById("srishti-chat-window");
    const iconToggle = document.getElementById("srishti-toggle-icon");
    const iconClose = document.getElementById("srishti-close-icon");

    toggleBtn.addEventListener("click", () => {
        const isOpen = chatWin.style.display === "flex";
        chatWin.style.display = isOpen ? "none" : "flex";
        iconToggle.style.display = isOpen ? "inline" : "none";
        iconClose.style.display = isOpen ? "inline" : "none";
    });

    // 5. Message Processing
    const chatBody = document.getElementById("srishtiChatBody");
    const chatForm = document.getElementById("srishtiChatForm");
    const chatInput = document.getElementById("srishtiInput");

    function appendMsg(content, sender) {
        const div = document.createElement("div");
        div.className = `srishti-msg ${sender}-msg`;
        div.innerHTML = content;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleQuestion(text) {
        const q = text.toLowerCase();
        let match = null;

        for (const item of knowledgeBase) {
            if (item.keywords.some(k => q.includes(k))) {
                match = item.reply;
                break;
            }
        }

        setTimeout(() => {
            appendMsg(match || fallbackResponse, "bot");
        }, 300);
    }

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;

        appendMsg(query, "user");
        chatInput.value = "";
        handleQuestion(query);
    });

    window.srishtiAsk = function (qText) {
        appendMsg(qText, "user");
        handleQuestion(qText);
    };
})();
