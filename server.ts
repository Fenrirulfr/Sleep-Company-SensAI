import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client server-side safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Sleep DNA Analysis Endpoint
app.post("/api/sleep-consultant", async (req, res) => {
  try {
    const { position, bodyType, temperature, disturbance, customNotes } = req.body;
    
    const ai = getGeminiClient();
    if (!ai) {
      // Fallback structured response if key is missing or not configured yet
      return res.json({
        recoveryScore: 94,
        sleepDnaSummary: "Your profile indicates elevated pressure on lateral kinetic chain nodes during deep NREM sleep, with micro-arousals driven by thermal trapped air.",
        pressureReliefFocus: ["L4-L5 Lumbar Decompression", "Deltoid Pressure Dissipation", "Thermal Venting Channeling"],
        recommendedSmartGridMode: "Zero-Gravity Adaptive REM Alignment",
        tailoredMicroAdjustments: "SensAI auto-deflates upper lumbar zone by 4.2% upon lateral roll and increases air-cooling flux by 18% at 2:00 AM.",
        wellnessTips: [
          "Maintain a core temperature drop 30 minutes prior to sleep.",
          "Allow SensAI's gentle pneumatic micro-waves to synchronize with your parasympathetic breath rate."
        ]
      });
    }

    const systemInstruction = `You are the SensAI Sleep Intelligence Concierge for The Sleep Company. 
Your tone is warm, calm, confident, empathetic, minimal, and deeply knowledgeable. 
You provide scientific sleep advice with luxury elegance.
Synthesize a personal Sleep DNA Analysis for the user.
Always respond in strictly valid JSON format matching the schema requested.`;

    const prompt = `Analyze this sleeper profile:
- Primary Position: ${position || "Combination"}
- Body Distribution: ${bodyType || "Medium"}
- Temperature Tendency: ${temperature || "Neutral"}
- Primary Disturbance: ${disturbance || "Toss and turn"}
- Additional Context: ${customNotes || "None"}

Produce a Sleep DNA Analysis JSON with keys:
"recoveryScore" (integer between 88 and 98),
"sleepDnaSummary" (2-3 sentences of calm, luxurious, scientific sleep diagnosis),
"pressureReliefFocus" (array of 3 specific anatomical alignment areas),
"recommendedSmartGridMode" (string name of recommended mode e.g. "Zero-Gravity Recovery Mode" or "Thermo-Balancing REM Mode"),
"tailoredMicroAdjustments" (2 sentences describing exact micro-actuator pneumatic adjustments SensAI will make),
"wellnessTips" (array of 2 short luxury sleep ritual recommendations).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);
    return res.json(parsedData);
  } catch (error) {
    console.error("Error in /api/sleep-consultant:", error);
    return res.status(500).json({
      error: "Failed to process Sleep DNA analysis",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Sleep Intelligence Q&A Endpoint
app.post("/api/sleep-qa", async (req, res) => {
  try {
    const { query, userContext } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        answer: "The SensAI Mattress integrates over 4,000 hyper-elastic SmartGRID™ cells with dual-zone silent pneumatic actuators. It senses micro-movements within 30 milliseconds to eliminate pressure points without motion transfer, allowing your body to enter uninterrupted Stage 3 NREM recovery."
      });
    }

    const systemInstruction = `You are the SensAI Sleep Intelligence Concierge for The Sleep Company's SensAI Mattress.
Your responses are concise (80-120 words), empathetic, luxurious, and grounded in sleep biomechanics, SmartGRID™ hyper-elastic polymer science, and AI adaptive technology.
Avoid sales pitch language or aggressive promotional terms. Focus on restoration, zero-pressure comfort, and how technology disappears so sleep remains.`;

    const prompt = `User Context: ${JSON.stringify(userContext || {})}
User Question: "${query}"

Provide a comforting, authoritative, and scientifically eloquent answer.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ answer: response.text || "SensAI quietly aligns your body for effortless nightly restoration." });
  } catch (error) {
    console.error("Error in /api/sleep-qa:", error);
    return res.status(500).json({
      error: "Failed to answer query",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

async function startServer() {
  try {
    if (process.env.NODE_ENV !== "production") {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { 
          middlewareMode: true,
          hmr: process.env.DISABLE_HMR === 'true' ? false : { port: 3005 }
        },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`SensAI Experience Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error("Critical error during server startup:", error);
    process.exit(1);
  }
}

startServer();
