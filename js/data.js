/* ==================================================================
   BOW SPORTS CAPITAL - GAME DATA
   All questions, outcomes, and constants
   Adapted for 7th/8th grade level
   ================================================================== */

const CLAIM_CODES = ["BSC-ECO-1A7K","BSC-ECO-4Q9M","BSC-ECO-7Z2P","BSC-ECO-9L8D","BSC-ECO-5W3X"];

// Dashboard values per chapter choice: { income, costs, savings_bonus, value, equity }
const DASH_VALUES = {
  1:{ A:{income:5000,costs:0,sav:5000,val:0,eq:0}, B:{income:4500,costs:0,sav:4500,val:0,eq:0}, C:{income:5000,costs:2000,sav:3000,val:10000,eq:100} },
  2:{ A:{income:6000,costs:1500,sav:4500,val:15000,eq:100}, B:{income:5000,costs:0,sav:5000,val:10000,eq:100}, C:{income:7000,costs:500,sav:6500,val:20000,eq:100} },
  3:{ A:{income:7000,costs:0,sav:7000,val:20000,eq:100}, B:{income:7500,costs:0,sav:7500,val:30000,eq:100}, C:{income:6000,costs:500,sav:5500,val:40000,eq:100} },
  4:{ A:{income:10000,costs:3000,sav:7000,val:60000,eq:100}, B:{income:8000,costs:500,sav:7500,val:80000,eq:100}, C:{income:15000,costs:6000,sav:9000,val:120000,eq:100} },
  5:{ A:{income:0,costs:0,sav:400000,val:0,eq:0}, B:{income:18000,costs:6000,sav:12000,val:200000,eq:80}, C:{income:12000,costs:2000,sav:10000,val:150000,eq:100} }
};

const OUTCOMES = {
  1:{
    A:"You take the full-time job! You get a steady $5,000 every single month -- no surprises. You also get health benefits. But here's the thing: your designs help the company make $20,000 a month. They keep the extra $15,000. That's the tradeoff for stability!",
    B:"You sign with the agency! They find you clients and handle the business stuff. You get a $3,500 base plus bonuses. But they take 20% of everything you earn -- that's their cut for helping you.",
    C:"You go independent! Some months you might earn $8,000, other months only $2,000. You also pay your helper $2,000/month. It's risky, but YOU own everything you build. Your business is now an asset that could be worth money someday!"
  },
  2:{
    A:"You join the platform! Jobs come in more steadily now, but the platform takes 25 cents of every dollar you earn. That's the price of convenience.",
    B:"You form a collective! You and 3 friends share everything equally -- the clients, the money, and the risk. But what happens when one person works harder than the others? They still get the same pay...",
    C:"You hire an admin for $500/month. They handle emails, scheduling, and invoicing. Now you spend ALL your time on the work that actually makes money. Smart move!"
  },
  3:{
    A:"You take the exclusive deal -- $85,000 guaranteed for the year! That's about $7,000/month locked in. But you can't work for anyone else. If an even better opportunity comes along... too bad, you're locked in.",
    B:"You negotiate! Because they really want YOUR specific style, you have bargaining power. You get a better deal: higher base pay, performance bonuses, and you can still do some side projects. Nice!",
    C:"You turn it down! It's scary to say no to $85,000, but you believe in your own brand. You keep 100% control and there's no cap on how much you can earn. The sky's the limit -- but so is the risk."
  },
  4:{
    A:"You hire employees! Now you can take on way more projects. But those salaries cost $3,000/month whether business is good or bad. In great months, you crush it. In slow months... you still gotta pay them.",
    B:"You build digital templates and sell them online! You do the design work ONCE, then sell it over and over. Even while you're sleeping, people are buying your templates. That's passive income!",
    C:"You build a full agency! You manage a team of designers. Revenue can be huge -- but so are costs. The cool part? If the agency runs well without you doing all the work, it becomes super valuable as a business."
  },
  5:{
    A:"You sell the business for $400,000! That's a LOT of cash right now. But you give up all future earnings from the business. The new owner gets all the profits from here on out.",
    B:"You take on investors! They give you $200,000, but now they own 20% of your company. You keep 80%. If the business grows to be worth $2 million, your 80% is worth $1.6 million! But they get a say in decisions now.",
    C:"You stay fully independent! You keep 100% of everything. Your profits grow a little each year, and because you keep reinvesting, each year builds on the last -- like a snowball getting bigger as it rolls downhill. That's compounding!"
  }
};

// ==================== CHAPTER QUESTION BANKS ====================
// Adapted for 7th/8th graders - simpler language, relatable examples
// type: "mc" = multiple choice, "fillin" = type a number answer
const CHAPTER_QUESTIONS = {
  1:{
    A:[
      {type:"mc",q:"A salary pays the same amount every month. Why does that make it less risky than freelancing?",options:["Because you know exactly what you'll earn -- it's predictable","Because employees always make more money","Because you can never lose your job","Because taxes are lower"],correct:0},
      {type:"mc",q:"\"Expected value\" means the average you'd earn over a long time. Why is this helpful when comparing a salary to freelancing?",options:["It helps you compare steady pay to up-and-down pay fairly","It only looks at the worst month","It ignores risk completely","It only applies to the stock market"],correct:0},
      {type:"fillin",q:"You help your company earn $20,000 in a month, but they only pay you $6,000. How much extra value does the company keep?",answer:14000,prefix:"$"},
      {type:"mc",q:"Stock options let you own a small piece of the company. What makes them potentially valuable?",options:["If the company grows, your piece could become worth way more","They guarantee you a bonus every month","They are completely risk-free","They let you skip paying taxes"],correct:0},
      {type:"mc",q:"What's the main tradeoff of taking the full-time job?",options:["More stability now, but you might miss out on bigger earnings later","Less stability and fewer benefits","No tradeoff -- it's better in every way","Higher risk with no safety net"],correct:0},
      {type:"mc",q:"When you're an employee, you mostly have ONE boss who decides your pay. How does that affect your bargaining power?",options:["It goes down -- you have fewer options to negotiate with","It goes up -- your boss has to pay whatever you want","It stays the same no matter what","Bargaining power doesn't apply to jobs"],correct:0}
    ],
    B:[
      {type:"mc",q:"The agency takes 20% of your earnings. This is called \"revenue sharing.\" What does that mean?",options:["You split the money you earn with the agency","You pay a fixed tax to the government","You borrow money from the agency","You buy equipment from the agency"],correct:0},
      {type:"mc",q:"Some months you might do 5 projects, other months just 2. Why is \"expected value\" (your average over time) useful here?",options:["Because your income changes month to month, so the average gives you the big picture","Because your income never changes","Because it only measures your worst month","Because it ignores the good months"],correct:0},
      {type:"fillin",q:"You earn $1,000 on a project. The agency takes 20%. How much does the agency get?",answer:200,prefix:"$"},
      {type:"mc",q:"The agency handles finding clients and setting prices. What do you give up by letting them do this?",options:["Control over what you charge and who you work with (bargaining power)","Your design skills","Your health insurance","Your email address"],correct:0},
      {type:"mc",q:"What's the main tradeoff of the agency model?",options:["You earn less per project, but get more consistent work","You earn more per project with no downsides","You never have to work","You get a lifetime contract"],correct:0},
      {type:"mc",q:"Why might paying the agency's 20% fee actually be worth it?",options:["They handle the sales and marketing stuff so you can focus on design","They pay your rent","They give you ownership of the agency","They eliminate all your competition"],correct:0}
    ],
    C:[
      {type:"mc",q:"Paying someone to help you each month is called a \"labor cost.\" What's a labor cost?",options:["Money you pay workers for their time and effort","The price of your computer","Your monthly rent","Money you invest in stocks"],correct:0},
      {type:"fillin",q:"Your helper does 30% of the work. If a project pays $1,000, how much is 30% of that?",answer:300,prefix:"$"},
      {type:"mc",q:"Why does having a helper actually help you MAKE more money?",options:["You have more time to take on clients and do the important work","You have less time for everything","You lose all your clients","You have to lower your prices"],correct:0},
      {type:"mc",q:"If your business makes more profit over time because of your helper, what happens to the value of your business?",options:["It goes up -- a business that earns more is worth more","It always goes down","The business stops being a real business","It becomes impossible to sell"],correct:0},
      {type:"mc",q:"Spending money now (helper's salary) to earn more money later is an example of:",options:["Making a smart investment -- trading small costs now for bigger rewards later","Wasting money","Being afraid of risk","Pure luck"],correct:0},
      {type:"mc",q:"When you hire someone, your role shifts a little. You become more of a:",options:["Business owner who manages people and systems","Pure hourly worker","Stock market investor","Customer with no responsibility"],correct:0}
    ]
  },
  2:{
    A:[
      {type:"mc",q:"A platform taking 25% of your earnings is called:",options:["Revenue sharing -- you split earnings with the platform","A fixed salary","A loan payment","A tax refund"],correct:0},
      {type:"fillin",q:"You earn $1,000 on a project through the platform. They take 25%. How much do YOU keep?",answer:750,prefix:"$"},
      {type:"mc",q:"What's the tradeoff of using a platform?",options:["Less money per job, but more steady work with less effort finding clients","More money per job with zero downsides","No work at all","Guaranteed control over everything"],correct:0},
      {type:"mc",q:"When the platform sets the prices, what happens to YOUR bargaining power?",options:["It drops -- the platform controls the rates, not you","It goes up because the platform negotiates for you","You own the platform now","Clients must follow your personal rules"],correct:0},
      {type:"mc",q:"Why do some freelancers leave a platform after building up a list of loyal clients?",options:["To keep more of the money they earn by working directly with clients","Because their skills got worse","Because they want to earn less","Because platform fees turn into bonuses"],correct:0},
      {type:"mc",q:"How does a platform help make your income more predictable?",options:["It sends you a steady flow of potential projects","It guarantees one giant project per year","It eliminates all competition","It pays your rent directly"],correct:0}
    ],
    B:[
      {type:"mc",q:"A group that splits all income equally, no matter who does more work, is called:",options:["A shared revenue model -- everyone shares the total pot","Commission-only pay","A salary job","Volunteer work"],correct:0},
      {type:"mc",q:"Why might someone who works really hard be unhappy in an equal-split group?",options:["They earn the same as people who do less work -- that doesn't feel fair","They always earn more than everyone else","They never get any clients","They're forced to leave when they do well"],correct:0},
      {type:"fillin",q:"Your collective of 4 people earns $1,000 on a project and splits it equally. How much does each person get?",answer:250,prefix:"$"},
      {type:"mc",q:"What's one good thing about forming a collective?",options:["You share the risk -- if one person has a slow month, the group helps cover it","You get complete solo control of everything","You never need to find any clients","There are zero meetings required"],correct:0},
      {type:"mc",q:"If one member threatens to leave unless they get a bigger share, what concept are they using?",options:["Bargaining power -- using their importance as leverage","Tax optimization","Brand loyalty","Risk aversion"],correct:0},
      {type:"mc",q:"Why might some people still like a collective even if they work harder than others?",options:["They value the stability, shared risk, and community support","Everyone wants to do less work","It guarantees the highest individual pay","It removes all responsibility"],correct:0}
    ],
    C:[
      {type:"mc",q:"Paying someone $500/month to handle boring tasks like emails and scheduling is:",options:["A labor investment -- spending money to free up your time","Buying a physical product","Taking on a bank loan","Passive income"],correct:0},
      {type:"fillin",q:"Your admin costs $500/month. Because of their help, you earn an extra $1,500/month. What's your net gain (extra earnings minus the cost)?",answer:1000,prefix:"$"},
      {type:"mc",q:"Why does outsourcing the boring stuff make you more efficient?",options:["You spend more time on the high-value design work that actually makes money","You spend more time on filing paperwork","You stop taking on clients","You do double the admin work"],correct:0},
      {type:"mc",q:"When you keep full control of your pricing and client list, what do you keep?",options:["High bargaining power -- strong control over your business deals","No bargaining power at all","Guaranteed low rates forever","Dependence on a platform"],correct:0},
      {type:"mc",q:"Why is this solo + admin model good for the long run?",options:["You reduce burnout while keeping strong profits","You increase burnout and lower profits","You stop working entirely","You give away your brand"],correct:0},
      {type:"mc",q:"Compared to joining a platform, what do you keep more of?",options:["Your money and control over your brand","Platform loyalty points","Agency equity shares","Government tax breaks"],correct:0}
    ]
  },
  3:{
    A:[
      {type:"mc",q:"Why is a guaranteed $85,000 contract considered low-risk?",options:["Your income is locked in for the year no matter what -- no surprises","Your income is totally unpredictable","You can work for unlimited other clients","You only get paid if campaigns go viral"],correct:0},
      {type:"mc",q:"\"Exclusivity\" means you can ONLY work for this brand. What's the biggest cost of that?",options:["You miss out on earning money from other brands that whole year","Higher hourly rates","Less work to do","No time needed at all"],correct:0},
      {type:"fillin",q:"The exclusive deal pays $85,000 for 12 months. About how much is that per month? (Round to the nearest thousand)",answer:7000,prefix:"$"},
      {type:"mc",q:"If the brand makes huge profits from YOUR designs but only pays you the fixed salary, what's happening?",options:["You're creating value for THEM that you don't get to keep","You keep all the value you create","You automatically get royalties","You own shares in their company"],correct:0},
      {type:"mc",q:"What's a big downside of locking into a long contract?",options:["You can't take advantage of better deals that might come along later","You always get bonuses","It makes you a better designer","It removes all deadlines"],correct:0},
      {type:"mc",q:"Why would someone still choose this exclusive contract?",options:["They'd rather have guaranteed money and less stress than chase risky opportunities","They want maximum risk","They prefer earning nothing","They want unlimited clients at once"],correct:0}
    ],
    B:[
      {type:"mc",q:"When you ask for better pay because the brand specifically wants YOUR style, you're using:",options:["Bargaining power -- they want you, so you have leverage to negotiate","Inventory turnover","Tax tricks","Brand dilution"],correct:0},
      {type:"mc",q:"Getting a base salary PLUS bonuses based on how well campaigns do is called:",options:["Mixed income -- part guaranteed, part based on results","Pure fixed income","Pure commission only","Zero income"],correct:0},
      {type:"mc",q:"Why is it smart to keep the ability to work with 1-2 other clients on the side?",options:["You keep your options open and have more flexibility for the future","You remove all options","You must stay with one client forever","You can't learn new things"],correct:0},
      {type:"fillin",q:"The brand offers $85,000 base. You negotiate a 10% bonus if their campaign hits its goal. If it does, how much bonus do you get?",answer:8500,prefix:"$"},
      {type:"mc",q:"Why is negotiation even possible in this situation?",options:["You have something they want -- your unique style and followers","You are their only employee ever","The law forces them to negotiate","They have a million designers just like you"],correct:0},
      {type:"mc",q:"If the brand agrees to pay bonuses, what does that do to your expected (average) income?",options:["It can go UP because you earn more if their campaigns succeed","It guarantees lower income","It removes all upside","It locks your income at zero"],correct:0}
    ],
    C:[
      {type:"mc",q:"Turning down guaranteed money to build your own brand is:",options:["A higher-risk strategy with potentially bigger rewards","A guaranteed income strategy","Completely risk-free","Against the law"],correct:0},
      {type:"mc",q:"Your brand, your followers, and your digital products are all examples of:",options:["Business assets -- things you own that can produce income","Monthly bills","Bank loans","Government taxes"],correct:0},
      {type:"mc",q:"Why is income more up-and-down (volatile) on this path?",options:["Revenue changes with demand -- some months are great, others aren't","You get a fixed salary","You have a guaranteed minimum","Laws prevent your income from changing"],correct:0},
      {type:"mc",q:"Why might this path earn MORE money in the long run than taking a salary?",options:["There's no limit on how much your own brand can eventually earn","A salary always pays more","You never improve your skills","You lose all control"],correct:0},
      {type:"fillin",q:"You keep 100% ownership of your brand. If your business is worth $100,000, how much of that is YOURS?",answer:100000,prefix:"$"},
      {type:"mc",q:"What type of person is most likely to choose this path?",options:["Someone who values freedom and big long-term potential over short-term safety","Someone who hates any kind of risk","Someone about to retire","Someone who is banned from working independently"],correct:0}
    ]
  },
  4:{
    A:[
      {type:"mc",q:"Paying employees a salary every month is what type of cost?",options:["A fixed labor cost -- you pay it every month no matter what","A one-time equipment purchase","A loan payment","A tax refund"],correct:0},
      {type:"mc",q:"When your employees handle emails and scheduling, what increases?",options:["Your ability to take on more paying projects","Your time spent on boring tasks","Your need for new hobbies","Your rent payments"],correct:0},
      {type:"fillin",q:"You hire help for $3,000/month. Because of them, you take on 2 extra projects worth $2,500 each. What's your total extra revenue?",answer:5000,prefix:"$"},
      {type:"mc",q:"Why is a business with good employees and systems worth MORE as something someone would buy?",options:["It can keep making money without burning out the owner","It stops making money","It becomes illegal to sell","It has no customers"],correct:0},
      {type:"mc",q:"What's the risk of hiring employees?",options:["Your costs go up every month even if business slows down","Your rent disappears","You can never raise prices","Clients must pay more tax"],correct:0},
      {type:"mc",q:"The extra money you earn from taking on ONE more project is called:",options:["Marginal revenue -- the additional income from one more unit of work","Fixed cost","Sunk cost","Depreciation"],correct:0}
    ],
    B:[
      {type:"mc",q:"Selling digital templates that tons of people can buy is an example of:",options:["Scalable income -- you create it once and sell it many times","A one-time freelance project","A loan from the bank","A government grant"],correct:0},
      {type:"fillin",q:"You sell a template for $25. If 100 people buy it this month, how much do you earn?",answer:2500,prefix:"$"},
      {type:"mc",q:"Why does your cost per sale go DOWN the more people buy your template?",options:["You did the design work once but keep earning from it -- the work doesn't increase","You redesign it for every buyer","You hire new staff for each sale","You print physical copies"],correct:0},
      {type:"mc",q:"Earning money even while you sleep is called:",options:["Passive income -- money that comes in without active work","A regular salary","A penalty fee","Negative income"],correct:0},
      {type:"mc",q:"Moving from selling your TIME to selling PRODUCTS mainly improves:",options:["Scalability -- you can grow income without working way more hours","Your rent costs","Your tax rate","Your commute time"],correct:0},
      {type:"mc",q:"What's a risk of only selling templates?",options:["Trends can change and your designs might go out of style","You always earn guaranteed income","You keep all your time free forever","Clients must still pay for custom work"],correct:0}
    ],
    C:[
      {type:"fillin",q:"Your agency earns $25,000 in a month. You pay $12,000 in employee salaries. How much is left over (your profit)?",answer:13000,prefix:"$"},
      {type:"mc",q:"Paying 3 full-time employees every month is what type of cost?",options:["Fixed labor cost -- you pay salaries whether business is booming or slow","Variable tax cost","One-time startup cost","Passive income"],correct:0},
      {type:"mc",q:"When you shift from doing all the design work to managing others, your role becomes more like:",options:["A business owner and manager","An intern","A banker","A full-time customer"],correct:0},
      {type:"mc",q:"Why is an agency that can run WITHOUT you doing design work every day worth more?",options:["A buyer could step in and the business would keep making money","It can't function at all without you","It makes zero profit","It has no clients"],correct:0},
      {type:"mc",q:"What's the biggest risk of building an agency?",options:["You must pay your team even during slow months when fewer clients are paying","You never have any costs at all","You can't hire anyone","Demand is always guaranteed"],correct:0},
      {type:"mc",q:"What's the best thing about a successful agency?",options:["Revenue can grow beyond your own hours, making the business really valuable","Revenue is capped at what you personally can do","You must lower prices forever","You lose all clients automatically"],correct:0}
    ]
  },
  5:{
    A:[
      {type:"mc",q:"\"Asset valuation\" means:",options:["Figuring out how much your business is worth if you sold it today","Counting how many emails you sent","Measuring how many hours you work","Setting your alarm clock"],correct:0},
      {type:"mc",q:"Selling your business for $400,000 means you're trading future profits for:",options:["A big chunk of guaranteed cash right now","Unlimited future earnings and full ownership","Zero dollars","Just debt"],correct:0},
      {type:"fillin",q:"You sell for $400,000. If you had kept the business, you might have earned $10,000/month in profit. How much profit would you miss out on in just ONE year?",answer:120000,prefix:"$"},
      {type:"mc",q:"Why might someone prefer to sell even if the business could earn more over time?",options:["They want the safety of cash they can use RIGHT NOW (that's called liquidity)","They hate having savings","They want more uncertainty","They legally can't own money"],correct:0},
      {type:"mc",q:"What's the big downside of selling your business?",options:["You give up ALL future profits from it -- it's not yours anymore","You keep full control","You gain more ownership","You still own the brand"],correct:0},
      {type:"mc",q:"This decision is mainly about:",options:["Giving up ownership and future money in exchange for guaranteed cash today","Choosing between paint colors","Picking a new hobby","Deciding which phone to buy"],correct:0}
    ],
    B:[
      {type:"mc",q:"Giving investors 20% of your company is called:",options:["Equity sharing -- giving away a piece of ownership and future profits","Paying a monthly salary","Taking out a loan","Reducing your rent"],correct:0},
      {type:"fillin",q:"Investors take 20% of your company. That means you keep what percentage?",answer:80,suffix:"%"},
      {type:"mc",q:"If your business grows after getting investment, what happens to the value of YOUR 80%?",options:["It becomes worth MORE, even though you own a smaller piece of a bigger pie","It becomes worthless","It never changes at all","It's automatically sold"],correct:0},
      {type:"mc",q:"What do you lose when you bring in outside investors?",options:["Some control over decisions -- they get a say in how you run things","All revenue forever","Your personal skills","Your ability to work at all"],correct:0},
      {type:"mc",q:"Why do investors push you to grow faster?",options:["They want their share to become worth more in less time","They want the business to close","They don't care about making money","They want to keep the company small"],correct:0},
      {type:"mc",q:"What's risky about giving away equity too early?",options:["If the business becomes super valuable later, you gave away a huge chunk for too little","You must pay zero taxes","You lose all clients instantly","You can never grow again"],correct:0}
    ],
    C:[
      {type:"mc",q:"Keeping 100% ownership means:",options:["You keep ALL the profits and ALL the decision-making power","You must share profits with investors","You can't make any decisions","You have no legal rights"],correct:0},
      {type:"mc",q:"Growing slowly but steadily by reinvesting profits each year is an example of:",options:["Compounding -- your money earns more money, like a snowball getting bigger","Sudden shutdown","Only inflation matters","Value never changes"],correct:0},
      {type:"fillin",q:"You earn $10,000 profit in Year 1 and reinvest it. It grows 20%. How much do you have after Year 1 growth?",answer:12000,prefix:"$"},
      {type:"mc",q:"Why is this considered a safer growth path than taking investors?",options:["You avoid debt and outside pressure to grow at all costs","You take on more debt","Investors control everything anyway","You must sell immediately"],correct:0},
      {type:"mc",q:"What's the downside of refusing both a sale and investors?",options:["Growth is slower because you don't have extra cash to invest","Growth is guaranteed to be faster","You lose all clients","You never need to work again"],correct:0},
      {type:"mc",q:"As profits grow each year and you keep reinvesting, what happens to your business value?",options:["It keeps rising with sustained profitability -- compounding at work","It must fall","It becomes impossible to sell","It resets to zero every year"],correct:0}
    ]
  }
};

// ==================== FINAL ASSESSMENT QUESTION BANK ====================
const FINAL_QUESTIONS = [
  {type:"mc",q:"\"Expected value\" is best described as:",options:["The average outcome you'd get if you did something many times","The absolute worst that could happen","A guaranteed fixed result","Total income divided by your age"],correct:0},
  {type:"mc",q:"\"Revenue sharing\" means:",options:["Splitting the money you earn between you and someone else (like a platform)","Keeping all money to yourself","Getting a loan from a bank","Receiving free money from the government"],correct:0},
  {type:"mc",q:"\"Labor cost\" is:",options:["Money you pay workers for their time and effort","The cost of your computer","The cost of your internet","Taxes on profits"],correct:0},
  {type:"mc",q:"\"Bargaining power\" means:",options:["How much influence you have to negotiate a better deal","How much you can bench press","The size of your office","How many emails you send per day"],correct:0},
  {type:"mc",q:"\"Asset valuation\" is:",options:["Figuring out how much a business is worth","Counting your daily emails","Measuring hours worked","Setting an alarm"],correct:0},
  {type:"fillin",q:"You earn $1,000 on a project. A platform takes 25%. How much do you take home?",answer:750,prefix:"$"},
  {type:"mc",q:"A business that makes money even when the owner isn't working is:",options:["MORE valuable because it doesn't depend on one person","Less valuable","Not a real business","Illegal"],correct:0},
  {type:"mc",q:"Selling a digital course that 1,000 people can buy (you only made it once) is an example of:",options:["Scaling -- growing income without growing hours worked","Working more hours for the same pay","Charging less for more work","Doing unpaid work"],correct:0},
  {type:"mc",q:"Why do investors care about expected value?",options:["They want to know the average return they might get over time","They only care about worst-case outcomes","They only count employees","They never think about risk"],correct:0},
  {type:"mc",q:"Taking less money now for a chance at way more later means you're trading:",options:["Short-term safety for long-term potential","Long-term value for short-term safety","Rent for groceries","Time for nothing"],correct:0},
  {type:"mc",q:"\"Opportunity cost\" means:",options:["What you give up when you choose one thing over another","The money in your wallet","Your tax refund","How many hours you worked"],correct:0},
  {type:"mc",q:"Exclusive contracts reduce your options because:",options:["They prevent you from working with anyone else during the contract","They let you take unlimited projects","They increase your free time","They lower your tax rate"],correct:0},
  {type:"mc",q:"\"Equity\" in a business means:",options:["Your ownership share -- the piece of the company that's yours","A monthly paycheck","A tax payment","A loan you owe"],correct:0},
  {type:"fillin",q:"You own 100% of a company worth $200,000. An investor takes 20%. How much is YOUR remaining 80% worth?",answer:160000,prefix:"$"},
  {type:"mc",q:"Why do founders eventually hire employees?",options:["To get more done than they could ever do alone","To work more hours themselves","To earn less money","To avoid managing anyone"],correct:0},
  {type:"mc",q:"Having MANY potential clients instead of just ONE employer usually increases your:",options:["Bargaining power -- more options means more leverage","Rent cost","Electric bill","Number of bosses"],correct:0},
  {type:"fillin",q:"A template sells for $50. You sell 200 in a month. What's your monthly revenue?",answer:10000,prefix:"$"},
  {type:"mc",q:"Why might a freelancer work for less money for a famous brand?",options:["The portfolio boost and future opportunities are worth more than the short-term pay cut","They don't value money at all","They can't charge more later","The law requires it"],correct:0},
  {type:"mc",q:"What's dangerous about relying on just ONE big client for most of your income?",options:["If they leave, your income crashes","You have too many backup clients","Competition disappears","Your rent decreases"],correct:0},
  {type:"mc",q:"\"Passive income\" means:",options:["Money that comes in without you actively working for it (like template sales)","Money from working extra hours","Money borrowed from friends","Income that's illegal"],correct:0},
  {type:"mc",q:"Why can a business be valuable even if the founder plans to stop working there?",options:["If it has good systems and employees, it keeps making money without the founder","Value disappears when the founder leaves","Because it has a cool logo","Because taxes are low"],correct:0},
  {type:"mc",q:"If two deals pay the same average amount, but one is way riskier, a cautious person would pick:",options:["The safer, less risky deal","The riskier deal","Neither -- they'd pick randomly","The one with more pages in the contract"],correct:0},
  {type:"mc",q:"\"Compounding\" in business means:",options:["Reinvesting profits so your money grows on top of itself each year","Spending all profits immediately","Cutting all investment","Starting from scratch every year"],correct:0},
  {type:"fillin",q:"You start with $1,000 in profit and it grows 20% in one year. How much do you have after that year?",answer:1200,prefix:"$"},
  {type:"mc",q:"Selling your company for a big lump sum mostly gives you:",options:["Liquidity -- cash you can use right now","Higher future ownership","A guaranteed monthly salary from the business","More debt"],correct:0},
  {type:"mc",q:"\"Risk diversification\" means:",options:["Spreading your income across different clients so you're not relying on just one","Putting everything into one client","Avoiding contracts completely","Working fewer hours"],correct:0},
  {type:"mc",q:"Why might a founder reject a huge buyout offer?",options:["They believe the business will be worth even MORE in the future","They dislike having money","The law says they must accept every offer","They can't reinvest profits"],correct:0},
  {type:"mc",q:"What's the BIG tradeoff at the heart of most decisions in this game?",options:["Short-term safety vs long-term growth and bigger rewards","Font choice vs color choice","Email vs text messages","Desktop vs laptop"],correct:0}
];
