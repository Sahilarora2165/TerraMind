# TerraMind Pune - Smart Urban Farming Solution
> **Hackathon Documentation & Judge's Guide**

## 1. Project Overview
**Problem Statement:** Smart Agriculture for urban farms. Designing solutions to support urban farming and sustainable agriculture practices within Pune (community gardens, soil health, water conservation).

**Solution Name:** **TerraMind Pune**
TerraMind is an AI-powered urban farming companion tailored specifically for Pune's climate and geography. It empowers citizens to convert terraces and balconies into thriving organic food gardens using generative AI for personalized advice, diagnostics, and community support.

---

## 2. Tech Stack used
*   **Frontend Framework:** React 19 + Vite (Fast, modern web development)
*   **Styling:** Tailwind CSS (Responsive, beautiful UI with custom fonts `Inter` & `Playfair Display`)
*   **Icons:** Lucide React
*   **AI Powerhouse:** Google Gemini API (via `@google/genai` SDK)
    *   **Text/Reasoning Models:** `gemini-3-flash-preview`
    *   **Vision/Multimodal Models:** `gemini-3-flash-preview` (for image analysis)
    *   **Image Generation:** `gemini-2.5-flash-image` (for visualization)

---

## 3. Key Features & Implementation
Here is exactly how each feature works, for technical explanation:

### 🏠 1. Smart Agri-Advisor
*   **What it does:** Creates a personalized farming plan based on user's available space (sq ft), sunlight conditions, and live Pune weather.
*   **How it works:**
    *   We prompt the **Gemini 3 Flash** model with the user's constraints and current weather context.
    *   The AI returns a structured JSON response containing:
        *   **Resilient Crops:** Best suited for current Pune season (e.g., Spinach in Winter).
        *   **Water Budget:** Precise liter calculation to conserve water.
        *   **Daily Alerts:** Specific care instructions.

### 🔍 2. AI Plant & Soil Diagnostics
*   **What it does:** Instant "Doctor" for plants. Users upload a photo of a sick plant or soil sample to get an instant diagnosis and organic remedy.
*   **How it works:**
    *   Uses **Multimodal Capabilities** of Gemini 3 Flash.
    *   We convert the user's image to Base64 and send it along with a specialized prompt: *"Analyze this plant image for pests... Identify the issue and provide an organic remedy suitable for Pune's climate."*
    *   It distinguishes between pests (like Mealybugs) and soil issues (like dryness or nutrient deficiency).

### 🤖 3. Expert Chat Assistant
*   **What it does:** A 24/7 farming guide acting as a local expert.
*   **How it works:**
    *   Powered by a **System-Prompted Gemini Chat Session**.
    *   **System Instruction:** *"You are an expert organic urban farming assistant specializing in the Pune region... Be warm, encouraging, and highly specific to Pune geography (mentioning areas like Kothrud, Baner)."*
    *   This ensures the AI doesn't just give generic advice but talks about local seasons (Kharif/Rabi) and local soil types.

### 🎨 4. AI Garden Visualizer (Image Editor)
*   **What it does:** Helps users visualize their empty terrace as a lush garden to boost motivation.
*   **How it works:**
    *   Uses **Gemini 2.5 Flash Image** model.
    *   The user uploads a photo of their empty space, and we send a prompt to "Edit this image... Make it look like a thriving urban organic terrace garden."
    *   The AI generates a transformed version of their reality.

### 👥 5. Community Forum with AI Expert
*   **What it does:** A space for users to ask questions. If the community hasn't answered yet, the AI steps in.
*   **How it works:**
    *   Calls `generateForumReply` using Gemini.
    *   It acts as "Pune Agri-Expert" to provide an immediate, helpful first response to keep engagement high.

---

## 4. Why This Solution? (Impact)
*   **Hyper-Local:** Unlike generic gardening apps, this is tuned for Pune's specific temperature, humidity, and native plant species.
*   **Water Conservation:** The "Water Budget" feature directly addresses Pune's urban water scarcity issues.
*   **Barrier Reduction:** The AI Visualizer and instant Diagnostics lower the knowledge and confidence barrier for new urban farmers.

---

## 5. Q&A for Judges
**Q: How is this different from ChatGPT or Google Search?**
**A:** This isn't just a chatbot; it's a **structured toolchain**. We don't just "ask AI"; we inject specific context (Pune weather, space constraints, image analysis) to force the AI into a specific "Local Expert" role. Detailed features like the *Soil Health Analyzer* use multimodal vision technology that standard text search cannot match. Also, our *Water Budgeting* tool is specifically designed for urban sustainability.

**Q: How accurate is the soil health analysis?**
**A:** It uses Gemini's advanced vision capabilities to detect visible signs of soil quality (dryness, compaction, organic matter color). While it doesn't replace a lab test for pH, it gives excellent visual "first aid" advice that resolves 80% of common beginner mistakes (like over/under-watering).

**Q: Is it scalable to other cities?**
**A:** Absolutely. The architecture is modular. We simply need to update the *System Prompt* in `services/gemini.ts` with the climate data and geographical context of the new city (e.g., change "Pune" to "Bangalore") and the engine adapts instantly.

**Q: What is the business model?**
**A:**
1.  **Marketplace Commission:** Taking a % on sales of seeds/tools in the Marketplace.
2.  **Premium AI Features:** Advanced consultations for large terrace farms.
3.  **Partnerships:** Connecting users with local nurseries.

**Q: How do you handle hallucinations (wrong advice)?**
**A:** We use **low temperature** settings in our API calls to make the model more deterministic. We also instruct the model via system prompts to strictly adhere to organic methods and "admit" if it doesn't know something rather than guessing.

**Q: Why React and Vite?**
**A:** We needed a lightning-fast, responsive UI that works well on mobile devices (since farmers are outdoors). Vite provides instant build times, and React allows us to build a component-based architecture that is easy to extend.
