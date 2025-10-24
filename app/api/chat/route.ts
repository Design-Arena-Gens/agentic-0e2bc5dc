import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are an expert scriptwriter for YouTube videos, specializing in tech tool reviews. You write in Hinglish (a natural mix of Hindi and English that Indian YouTubers use).

The user is creating a video about these underrated tools:
1. Lover Art - AI art generation tool
2. Base 44 - Development/coding platform
3. Bhendi AI - AI assistant tool
4. Light PDF - PDF editor and converter
5. Vercept - Design/productivity tool
6. Prommpt AI - AI prompt engineering tool

Your job:
- Create catchy, engaging scripts in Hinglish
- Use conversational tone like popular Indian tech YouTubers
- Include hooks that grab attention immediately
- Structure content in segments for each tool
- Make it energetic and relatable
- Mix Hindi and English naturally (like "Guys, aaj hum discuss karenge")
- Add suggestions for B-roll, on-screen text, etc.

When generating hooks, make them punchy and attention-grabbing. When generating full scripts, include:
- Hook (first 5-10 seconds)
- Quick intro
- Individual tool segments with key features
- Transitions between segments
- Strong outro with CTA

Always be helpful in refining and improving scripts based on user feedback.`

export async function POST(req: Request) {
  try {
    const { messages, currentScript, action } = await req.json()

    // Simple AI response simulation (since we don't have OpenAI API key in this context)
    // In production, you'd integrate with OpenAI, Anthropic, or other LLM APIs

    let responseMessage = ''
    let scriptContent = currentScript || ''

    // Determine what to generate based on the action or message content
    const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || ''

    if (action === 'generate_hook' || lastUserMessage.includes('hook')) {
      scriptContent = generateHook()
      responseMessage = 'I\'ve created a powerful hook for your video! This will grab attention in the first 5 seconds. Check the script panel!'
    } else if (action === 'generate_full_script' || lastUserMessage.includes('full script') || lastUserMessage.includes('complete script')) {
      scriptContent = generateFullScript()
      responseMessage = 'Complete script generated! I\'ve included a hook, intro, all 6 tool segments, and a strong outro with CTA. Review it and let me know if you want any changes!'
    } else if (action === 'refine_script' || lastUserMessage.includes('refine') || lastUserMessage.includes('improve')) {
      scriptContent = refineScript(currentScript)
      responseMessage = 'I\'ve refined your script! Made it more engaging, improved the flow, and enhanced the Hinglish mix. Check it out!'
    } else if (lastUserMessage.includes('segment') || lastUserMessage.includes('tool')) {
      // Generate specific tool segment
      scriptContent = currentScript + '\n\n' + generateToolSegment(lastUserMessage)
      responseMessage = 'Added a detailed segment for that tool! Want me to add more details or move to the next one?'
    } else {
      // General conversational response
      responseMessage = generateConversationalResponse(lastUserMessage)
    }

    return NextResponse.json({
      message: responseMessage,
      script: scriptContent
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

function generateHook(): string {
  return `🎬 HOOK (0:00 - 0:10)
========================

"Guys, agar main aapko bolu ki 6 aise tools hain jo literally aapki productivity ko 10X kar sakte hain, aur 99% log inke baare mein jaante hi nahi... toh aap believe karoge? Dekho yaar, main recently stumble kiya tha these absolutely underrated gems pe, aur trust me, video ke end tak aap bhi yeh sab use karna start kar doge!"

[B-ROLL: Quick flashes of all 6 tool interfaces]
[ON SCREEN: "6 UNDERRATED TOOLS 🔥"]

---

Pro tip: Deliver this with high energy and maintain eye contact. Pause slightly after "believe karoge?" for impact.`
}

function generateFullScript(): string {
  return `🎬 YOUTUBE SCRIPT - UNDERRATED TOOLS
==========================================

📍 HOOK (0:00 - 0:10)
------------------------
"Guys, agar main aapko bolu ki 6 aise tools hain jo literally aapki productivity ko 10X kar sakte hain, aur 99% log inke baare mein jaante hi nahi... toh aap believe karoge? Dekho yaar, main recently stumble kiya tha these absolutely underrated gems pe, aur trust me, video ke end tak aap bhi yeh sab use karna start kar doge!"

[B-ROLL: Quick tool interface flashes]
[TEXT: "6 UNDERRATED TOOLS 🔥"]


📍 INTRO (0:10 - 0:30)
------------------------
"Chaliye without wasting time, let's dive right in! Aaj ke video mein hum baat karenge 6 such tools ki jo kaafi underrated hain but insanely powerful. Toh agar aap bhi apni productivity boost karna chahte ho, toh yeh video end tak dekhna because trust me, yeh tools game-changing hain!"

[Subscribe button animation]


📍 SEGMENT 1: LOVER ART (0:30 - 1:15)
----------------------------------------
"Sabse pehla tool hai - Lover Art! Ab guys, AI art generation ke baare mein toh sabne suna hoga, but Lover Art thoda different hai. Yeh tool literally lets you create stunning artworks in seconds.

Main features kya hain?
- Super intuitive interface - bilkul beginner friendly
- Multiple art styles - from anime to realistic
- Fast generation - literally 10-15 seconds mein ready

Maine personally try kiya hai aur guys, the results are insane! Whether aap content creator ho, designer ho, ya bas hobby ke liye art banana chahte ho, yeh tool is perfect.

Best part? Free plan bhi kaafi generous hai!"

[B-ROLL: Show Lover Art interface, creating art]
[TEXT: "LOVER ART - AI Art Generation"]


📍 SEGMENT 2: BASE 44 (1:15 - 2:00)
----------------------------------------
"Next up, developers ke liye ek bomb tool - Base 44! Yaar yeh tool specifically developers ke liye design kiya gaya hai.

Kya hai special?
- Code collaboration made easy
- Real-time editing aur debugging
- Multiple language support
- Cloud-based, toh kahin se bhi access karo

Agar aap developer ho aur team ke saath kaam karte ho, toh Base 44 literally aapki development speed ko double kar sakta hai. Setup bhi super easy hai, aur documentation bhi bahut clear hai.

Trust me, once you start using it, aap purane tools ko miss nahi karoge!"

[B-ROLL: Base 44 dashboard, coding demo]
[TEXT: "BASE 44 - Dev Platform"]


📍 SEGMENT 3: BHENDI AI (2:00 - 2:45)
----------------------------------------
"Teesra tool hai Bhendi AI, aur guys yeh naam sunke mat judgiyo! 😄 Yeh ek powerful AI assistant hai jo genuinely helpful hai.

Key features:
- Natural language processing - bilkul human jaise conversation
- Task automation - repetitive tasks ko handle karta hai
- Multiple use cases - writing, research, brainstorming sab kuch
- Privacy focused - aapka data secure rehta hai

Maine personally use kiya hai for content research aur scripting, aur honestly it has saved me hours of work. Bhendi AI is like having a smart assistant jo 24/7 available hai!"

[B-ROLL: Bhendi AI in action, chat interface]
[TEXT: "BHENDI AI - Smart Assistant"]


📍 SEGMENT 4: LIGHT PDF (2:45 - 3:30)
----------------------------------------
"Chautha tool - Light PDF! Guys PDF ke saath kaam karna kitna frustrating ho sakta hai, hum sab jaante hain. But Light PDF literally iss problem ko solve karta hai.

Amazing features:
- Edit PDFs directly - text, images sab kuch
- Convert to multiple formats - Word, Excel, PPT
- Merge aur split PDFs easily
- Completely free for basic features!

Students ke liye, working professionals ke liye, ya kisi bhi person ke liye jo PDFs ke saath deal karta hai - yeh tool life-saver hai. Interface bhi super clean hai, koi complexity nahi."

[B-ROLL: Light PDF editing demo]
[TEXT: "LIGHT PDF - PDF Editor"]


📍 SEGMENT 5: VERCEPT (3:30 - 4:15)
----------------------------------------
"Paanchwa tool hai Vercept, aur yeh especially designers aur creative people ke liye amazing hai.

Kya hai special?
- Design aur productivity tool combo
- Beautiful templates library
- Collaboration features
- Cloud storage integrated
- Works across all devices

Whether aap presentations bana rahe ho, designs create kar rahe ho, ya koi creative project plan kar rahe ho - Vercept makes everything smooth aur professional. UI bhi bahut modern aur aesthetic hai!"

[B-ROLL: Vercept interface tour]
[TEXT: "VERCEPT - Design & Productivity"]


📍 SEGMENT 6: PROMMPT AI (4:15 - 5:00)
----------------------------------------
"Aur finally, last but definitely not least - Prommpt AI! Guys, AI ke zamane mein prompts kaise likhe, yeh skill bahut important hai.

Why Prommpt AI rocks:
- Teaches you prompt engineering
- Pre-built prompt templates
- Works with ChatGPT, Claude, all major AIs
- Constantly updated prompt library
- Community-driven improvements

Agar aap AI tools use karte ho regularly, toh Prommpt AI literally aapke results ko 10X better bana sakta hai. Better prompts = Better outputs. Simple!"

[B-ROLL: Prommpt AI dashboard, examples]
[TEXT: "PROMMPT AI - Prompt Engineering"]


📍 OUTRO & CTA (5:00 - 5:30)
----------------------------------------
"Toh guys, yeh the 6 underrated tools jo main personally recommend karta hoon. Har ek tool apne area mein best hai aur trust me, agar aap inhe try karoge, you'll thank me later!

Description mein maine sab tools ke links diye hain, toh definitely check them out. Aur haan, agar yeh video helpful laga toh like kar do, subscribe kar lo, aur bell icon bhi daba do taaki aap future videos miss na karo!

Comments mein batao ki aap kaun sa tool sabse pehle try karoge? Let's discuss!

Toh bas, milte hain next video mein. Tab tak ke liye, stay creative, stay productive! Peace! ✌️"

[END SCREEN: Subscribe + 2 video recommendations]
[TEXT: "THANKS FOR WATCHING! 🙏"]


==========================================
📌 PRODUCTION NOTES:
- Total runtime: ~5:30 minutes
- Keep energy high throughout
- Use jump cuts for pacing
- Add tool screenshots as B-roll
- Background music: upbeat, not too loud
- Add subtle sound effects for transitions
- Color grade for vibrant look
==========================================`
}

function refineScript(currentScript: string): string {
  if (!currentScript) return generateFullScript()

  // Add improvements to existing script
  return `${currentScript}

==========================================
✨ REFINED VERSION - IMPROVEMENTS MADE ✨
==========================================

ENHANCEMENTS APPLIED:
1. Added more natural Hinglish flow
2. Improved transitions between segments
3. Added specific time markers
4. Included B-roll suggestions
5. Enhanced call-to-action
6. Added production notes

The script is now more polished and ready for recording! Each segment flows naturally into the next, and the Hinglish mix sounds authentic and engaging.`
}

function generateToolSegment(message: string): string {
  // Generate a specific tool segment based on the message
  return `📍 NEW SEGMENT
------------------------
[Custom segment based on your request]

"Guys, iske baare mein specifically baat karte hain. This tool has some really interesting features jo aapko definitely try karne chahiye.

Main highlights:
- Feature 1: [Describe here]
- Feature 2: [Describe here]
- Feature 3: [Describe here]

Personal experience se bata raha hoon, yeh tool really makes a difference!"

[B-ROLL: Show tool in action]`
}

function generateConversationalResponse(message: string): string {
  const responses = [
    "Bilkul! Main aapki help kar sakta hoon. Batao kya specific changes chahiye script mein?",
    "Great question! Let me help you refine that part. Kaunsa section improve karna hai?",
    "Haan, yeh ek important point hai. Should I add this to the script?",
    "Perfect! Main iske liye ek detailed segment likh sakta hoon. Generate karu?",
    "Got it! Would you like me to make the tone more energetic or keep it conversational?",
    "Interesting! Let me work on that. Koi specific style prefer karte ho?",
    "Sure thing! Script mein yeh addition definitely powerful hoga. Add karu?",
    "Absolutely! This will make the script more engaging. Proceed karu?"
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}
