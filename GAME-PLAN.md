# GAME PLAN: "Bow Sports Capital" -- Interactive Economics Game

## The Big Idea

Instead of reading a narrative and clicking buttons, the player **runs a simulated business** through an interactive financial dashboard. Every chapter has **hands-on mini-games** where students manipulate numbers, drag resources, negotiate deals, and calculate outcomes themselves. The economics concepts aren't just tested with quizzes -- they're *lived* through gameplay.

---

## Core Architecture (GitHub Pages, pure HTML/CSS/JS)

- **Single-page app** served as static files
- No backend needed -- all state in-memory + `localStorage` for save/resume
- Animated financial dashboard that persists across chapters
- Mobile responsive
- Completion codes generated client-side (deterministic hash of email + choices)

---

## The Persistent Dashboard (always visible)

A live "business control panel" that updates as the player progresses:

| Element | What it shows |
|---|---|
| **Cash Balance** | Animated counter, goes up/down based on decisions |
| **Monthly Revenue** | Bar chart that shifts each chapter |
| **Monthly Expenses** | Stacked bar (labor, platform fees, overhead) |
| **Profit Margin** | Calculated live: `(Revenue - Expenses) / Revenue` |
| **Business Valuation** | Grows over time based on profit trajectory |
| **Equity Owned** | Starts at 100%, can decrease with investors |
| **Risk Meter** | Visual gauge (low/medium/high) based on income volatility |
| **Time Allocation Pie** | Shows how player's hours are split |

---

## Chapter-by-Chapter Interactive Mechanics

### CHAPTER 1: "The Starting Line" -- Paycheck Simulator

**Instead of just picking A/B/C**, the player:

1. **Income Comparison Worksheet** -- A side-by-side interactive calculator where students type in values:
   - Salary path: Enter monthly salary, benefits value, estimate stock option value
   - Agency path: Enter base retainer + per-project fee, then slider for "how many projects per month"
   - Independent path: Enter hourly rate x estimated billable hours, minus junior designer salary
   - The game auto-computes **expected value** for each and shows a comparison chart

2. **12-Month Simulation Roll** -- After choosing, the game simulates 12 months with randomized events (client wins/losses, market dips). Income fluctuates visually on a line chart. Players *see* volatility vs stability in real-time rather than just reading about it.

3. **Drag-the-Slider: Risk vs. Reward** -- Player adjusts a "risk tolerance" slider and sees how the expected value and variance change for each option. Teaches expected value and risk aversion interactively.

4. **Knowledge Check** -- Fill-in-the-blank calculations ("If your salary is $6K/mo but you generate $20K in value, the labor surplus is $____") instead of just multiple choice.

**Concepts tested**: Expected value, risk aversion, labor surplus, stability vs upside, bargaining power

---

### CHAPTER 2: "Scaling Up" -- Revenue Split Calculator

1. **Platform Fee Drag-and-Drop** -- A visual $1,000 project fee appears as a stack of bills. The player drags the platform's 25% cut away. Then drags taxes, overhead. What's left is their take-home. They physically see money leaving.

2. **Collective Income Splitter** -- Interactive scenario: 4 collective members, player assigns "productivity scores" (hours/quality). Then sees how equal-split vs. performance-based-split changes everyone's payout. Directly teaches the free-rider problem.

3. **Build-Your-Own P&L Statement** -- Player fills in a mini profit & loss sheet:
   - Revenue line (type a number)
   - Minus: platform fees OR admin salary OR collective split
   - = Net income
   - Game checks their math and shows the comparison across all 3 paths

4. **Time Allocation Puzzle** -- A 40-hour work week shown as blocks. Player drags blocks into categories: "Design Work" (revenue-generating), "Admin" (non-revenue), "Marketing" (client acquisition). The game shows how hiring admin frees blocks for revenue work. Teaches opportunity cost of time.

**Concepts tested**: Revenue sharing, labor costs, efficiency, bargaining power, platform economics

---

### CHAPTER 3: "The Big Offer" -- Negotiation Simulator

1. **Interactive Negotiation Table** -- A back-and-forth negotiation interface:
   - The brand makes an opening offer ($85K exclusive)
   - Player drags sliders to counter-offer: contract length, exclusivity %, base pay, bonus %
   - The "brand AI" responds based on what terms you push (push too hard = they walk away)
   - Teaches bargaining power as a *felt experience*

2. **Opportunity Cost Calculator** -- Two timelines shown side-by-side:
   - Timeline A: Exclusive contract income over 12 months
   - Timeline B: Estimated independent income (player inputs their assumptions)
   - Player types in their estimates. Game visualizes the gap = opportunity cost

3. **Contract Clause Sorter** -- Drag contract clauses into "Helps Me" vs "Hurts Me" categories:
   - "Exclusive for 12 months" -> Hurts (limits options)
   - "Performance bonus at 10% of campaign revenue" -> Helps
   - "Non-compete for 6 months after" -> Hurts
   - Tests understanding of option value, bargaining terms

4. **What-If Scenario Board** -- Toggle switches for different contract terms and watch the expected income, risk level, and freedom score change in real-time.

**Concepts tested**: Bargaining power, opportunity cost, asset valuation, option value, risk vs stability

---

### CHAPTER 4: "Growth Mode" -- Business Builder Simulation

1. **Hire & Deploy Mini-Game** -- A visual workspace:
   - Player has a pool of "tasks" (client projects, admin, marketing)
   - Drag workers (yourself, support staff, no one) onto task slots
   - See revenue generated vs. labor cost in real-time
   - Can't do everything yourself -- forces delegation decisions
   - Teaches marginal revenue and fixed vs. variable costs

2. **Template Store Simulator** -- Build a digital product:
   - Player sets template price (slider: $19-$99)
   - Sets marketing spend (slider)
   - Game simulates 6 months of sales with a demand curve
   - Player sees passive income accumulate over time
   - Interactive chart shows the "create once, sell many times" scalability curve

3. **Agency Cashflow Stress Test** -- Interactive month-by-month cashflow:
   - Fixed costs shown (salaries: $12K/mo)
   - Revenue varies each month (player clicks "next month" to reveal)
   - Some months are great, some are terrible
   - Player sees the danger of high fixed costs with variable revenue
   - A running "runway" counter shows months of cash remaining

4. **Business Valuation Workshop** -- Player inputs:
   - Annual profit
   - Growth rate
   - Whether business runs without them (yes/no)
   - Game calculates a rough valuation using a simple multiplier
   - Teaches asset valuation through doing, not reading

**Concepts tested**: Marginal revenue, scalability, passive income, fixed vs variable costs, asset valuation

---

### CHAPTER 5: "Endgame" -- Exit Strategy War Room

1. **Deal Comparison Table Builder** -- Player fills in a comparison table themselves:
   - Sell: Enter lump sum, calculate what they give up (future profits)
   - Invest: Enter investment amount, equity given up, project future value of remaining share
   - Stay: Project compound growth over 3/5/10 years
   - Game auto-plots all three scenarios on a timeline chart

2. **Compounding Growth Visualizer** -- Interactive compound interest calculator:
   - Player sets: starting profit, growth rate, years
   - Animated bar chart grows year by year
   - Toggle "reinvest profits" on/off to see the compounding effect
   - This is the "aha moment" for compounding

3. **Equity Dilution Simulator** -- A pie chart starts at 100%:
   - Player gives 20% to investors -> pie updates
   - Then simulates: what if company value doubles? Triples?
   - Player sees that 80% of a $2M company > 100% of a $500K company
   - Teaches equity dilution vs. value creation

4. **Final Decision: Sign the Paper** -- Player literally drags their signature onto one of three contracts (sell/invest/stay). Dramatic moment. The choice locks in and triggers the final assessment.

**Concepts tested**: Asset valuation, compounding, equity dilution, liquidity, ownership vs capital

---

## Final Assessment: "The Board Room"

Instead of 10 standard multiple-choice questions, mix in these question types:

| Type | Example | How it works |
|---|---|---|
| **Calculate It** | "Your agency bills $25K/mo, pays $12K in salaries. What's the profit margin?" | Player types the number (52%). No options to guess from. |
| **Drag to Match** | Match concepts to definitions (Expected Value, Bargaining Power, etc.) | Drag-and-drop matching |
| **Build the Formula** | Drag pieces to build: `Profit = Revenue - Expenses` | Arrange formula components |
| **Scenario Judgment** | "A freelancer has 1 client at $8K/mo. Rate the diversification risk: Low/Med/High" | Select from a risk gauge |
| **True Math** | "Template sells for $49, 200 sales/mo. What's monthly passive income?" | Type the answer |
| **Multiple Choice** | Traditional MC for concept definitions | Standard but shuffled |
| **Rank Order** | Rank 4 options from lowest to highest risk | Drag to reorder |

Scoring: 7/10 to pass. Each wrong answer shows the explanation and the economics concept involved.

---

## Visual & UX Design

- **Dark theme** (keep the existing color scheme -- it works well)
- **Animated number counters** (money ticking up/down)
- **Chart.js or lightweight canvas charts** for real-time data viz
- **Confetti on chapter pass** (already exists in current version)
- **Sound effects** (optional toggle): cash register cha-ching, negotiation gavel, level-up chime
- **Progress saves to localStorage** -- can close browser and resume
- **Typewriter effect** for narrative text to build tension
- **Particle effects** on the financial dashboard when big milestones hit

---

## Technical Stack (all static, GitHub Pages compatible)

| Component | Tool |
|---|---|
| Charts | Chart.js (CDN) or pure canvas |
| Drag & Drop | Native HTML5 drag-and-drop API |
| Animations | CSS animations + requestAnimationFrame |
| State Management | Single JS state object + localStorage |
| Hosting | GitHub Pages (static HTML) |
| Build | None -- vanilla HTML/CSS/JS, no build step |

---

## Suggested File Structure

```
/
  index.html              -- Entry point, app shell, dashboard
  css/
    style.css             -- All styles (dark theme, animations, responsive)
  js/
    state.js              -- Game state management + localStorage
    data.js               -- All questions, outcomes, narratives
    dashboard.js          -- Financial dashboard logic + charts
    chapters/
      ch1-paycheck.js     -- Chapter 1 interactive mechanics
      ch2-revenue.js      -- Chapter 2 interactive mechanics
      ch3-negotiate.js    -- Chapter 3 interactive mechanics
      ch4-builder.js      -- Chapter 4 interactive mechanics
      ch5-endgame.js      -- Chapter 5 interactive mechanics
    final.js              -- Final assessment mixed question types
    utils.js              -- Shuffle, random, animation helpers
  assets/
    sounds/               -- Optional sound effects
```

---

## Current Version vs. New Game Version

| Current Version | New Game Version |
|---|---|
| Read narrative text | Typewriter narrative + animated business dashboard |
| Click A, B, or C | Manipulate sliders, calculators, drag-and-drop |
| Answer multiple choice | Calculate answers, build formulas, sort clauses, rank options |
| Static outcomes | 12-month simulations with randomized events and live charts |
| Quiz at end of chapter | Interactive mini-games that *teach* the concept through doing |
| Single score display | Persistent financial dashboard showing business health |
| One-and-done flow | Save/resume, retry with different strategies |

---

## Key Design Principle

> **Students learn economics by doing economics**, not by reading about it and picking from a list.

Every concept in the Apps Script question bank (expected value, bargaining power, revenue sharing, labor costs, asset valuation, scalability, compounding, opportunity cost, equity, risk) is tested through **interactive gameplay first**, then reinforced with targeted assessment questions.
