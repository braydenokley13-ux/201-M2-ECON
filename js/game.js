/* ==================================================================
   BOW SPORTS CAPITAL - GAME ENGINE
   Handles all interactives, quizzes, navigation, dashboard
   ================================================================== */

// ==================== STATE ====================
const state = {
  email:'',
  currentScreen:'screen-welcome',
  chapters:{1:null,2:null,3:null,4:null,5:null},
  chaptersPassed:{1:false,2:false,3:false,4:false,5:false},
  chapterScores:{1:0,2:0,3:0,4:0,5:0},
  finalPassed:false,
  finalScore:0,
  totalCorrect:0,
  totalAnswered:0,
  dash:{income:0,costs:0,savings:0,value:0,equity:100},
  interactiveDone:{1:false,2:false,3:false,4:false,5:false}
};

// ==================== UTILITIES ====================
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function selectRandom(arr,count){return shuffle(arr).slice(0,count)}
function randomizeQuestion(qObj){
  if(qObj.type==='fillin') return {...qObj};
  const indices=[0,1,2,3];
  const shuffled=shuffle(indices);
  const newOptions=shuffled.map(i=>qObj.options[i]);
  const newCorrect=shuffled.indexOf(qObj.correct);
  return{...qObj,options:newOptions,correct:newCorrect};
}
function $(id){return document.getElementById(id)}
function formatMoney(n){return (n<0?'-$':'$')+Math.abs(n).toLocaleString()}

// ==================== SAVE/LOAD ====================
function saveState(){try{localStorage.setItem('bsc_state',JSON.stringify(state))}catch(e){}}
function loadState(){
  try{
    const saved=localStorage.getItem('bsc_state');
    if(saved){const s=JSON.parse(saved);Object.assign(state,s);return true}
  }catch(e){}
  return false;
}

// ==================== DASHBOARD ====================
function updateDashboard(){
  const d=state.dash;
  $('dash-income').textContent=formatMoney(d.income);
  $('dash-costs').textContent=formatMoney(d.costs);
  $('dash-savings').textContent=formatMoney(d.savings);
  $('dash-value').textContent=formatMoney(d.value);
  $('dash-equity').textContent=d.equity+'%';
  $('dashboard').classList.add('visible');
}
function applyDashValues(chapter,choice){
  const v=DASH_VALUES[chapter]&&DASH_VALUES[chapter][choice];
  if(!v) return;
  state.dash.income=v.income;
  state.dash.costs=v.costs;
  state.dash.savings+=v.sav;
  state.dash.value=v.val;
  if(v.eq!==undefined && v.eq>0) state.dash.equity=v.eq;
  else if(v.eq===0 && chapter===5) state.dash.equity=0;
  updateDashboard();
}

// ==================== PROGRESS ====================
function updateProgress(){
  const passed=Object.values(state.chaptersPassed).filter(Boolean).length;
  const finalDone=state.finalPassed?1:0;
  const pct=Math.round(((passed+finalDone)/6)*100);
  $('progress-pct').textContent=pct+'%';
  $('progress-fill').style.width=pct+'%';
  document.querySelectorAll('.progress-step').forEach(el=>{
    const step=parseInt(el.dataset.step);
    el.classList.remove('completed','active');
    if(step===0) el.classList.add('completed');
    else if(step<=5){
      if(state.chaptersPassed[step]) el.classList.add('completed');
      else if(state.currentScreen==='screen-ch'+step) el.classList.add('active');
    }else if(step===6){
      if(state.finalPassed) el.classList.add('completed');
      else if(state.currentScreen==='screen-final') el.classList.add('active');
    }
  });
  $('stat-chapters').textContent=passed+'/5';
  $('stat-questions').textContent=state.totalAnswered;
  const acc=state.totalAnswered>0?Math.round((state.totalCorrect/state.totalAnswered)*100):0;
  $('stat-accuracy').textContent=acc+'%';
}

// ==================== SCREEN NAVIGATION ====================
function goToScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const target=$(id);
  if(target){target.classList.add('active');state.currentScreen=id}
  window.scrollTo({top:0,behavior:'smooth'});
  updateProgress();
  // Init interactives
  if(id==='screen-ch1') initIncomeRace();
  if(id==='screen-ch2') initMoneySplitter();
  if(id==='screen-ch3') initDealMaker();
  if(id==='screen-ch4') initPriceLab();
  if(id==='screen-ch5') initGrowthMachine();
  if(id==='screen-final') loadFinalQuiz();
  saveState();
}

// ==================== START ====================
function startSimulation(){
  const input=$('email-input');
  const email=input.value.trim();
  if(!email||!email.includes('@')){input.style.borderColor='var(--danger)';input.focus();setTimeout(()=>input.style.borderColor='',2000);return}
  state.email=email;
  updateDashboard();
  goToScreen('screen-ch1');
}

// ==================== CHAPTER 1: INCOME RACE ====================
let raceInterval=null;
let raceMonth=0;
let raceTotals={salary:0,agency:0,indie:0};
let raceData={salary:[],agency:[],indie:[]};

function initIncomeRace(){
  const area=$('income-race-area');
  if(area.querySelector('.race-track')) return;
  raceMonth=0;
  raceTotals={salary:0,agency:0,indie:0};
  raceData={salary:[],agency:[],indie:[]};
  area.innerHTML=`
    <div class="race-month">Click "Simulate" to start! Month: <span id="race-month-num">0</span> / 12</div>
    <div class="race-track">
      <div class="race-lane">
        <div class="race-lane-label" style="color:#10b981">Salary (Job)</div>
        <div class="bar-container"><div class="bar-fill salary" id="bar-salary" style="height:0%"></div></div>
      </div>
      <div class="race-lane">
        <div class="race-lane-label" style="color:#f59e0b">Agency</div>
        <div class="bar-container"><div class="bar-fill agency" id="bar-agency" style="height:0%"></div></div>
      </div>
      <div class="race-lane">
        <div class="race-lane-label" style="color:#8b5cf6">Independent</div>
        <div class="bar-container"><div class="bar-fill indie" id="bar-indie" style="height:0%"></div></div>
      </div>
    </div>
    <div class="race-totals">
      <div class="race-total-card salary"><div class="val" id="race-total-salary">$0</div><div class="lbl">Salary Total</div></div>
      <div class="race-total-card agency"><div class="val" id="race-total-agency">$0</div><div class="lbl">Agency Total</div></div>
      <div class="race-total-card indie"><div class="val" id="race-total-indie">$0</div><div class="lbl">Indie Total</div></div>
    </div>
    <div style="text-align:center;margin-top:16px">
      <button class="sim-btn" id="race-btn" onclick="runRaceMonth()">Simulate Next Month</button>
      <button class="sim-btn accent" id="race-auto-btn" onclick="runRaceAuto()" style="margin-left:8px">Auto-Run All 12</button>
    </div>
  `;
}

function runRaceMonth(){
  if(raceMonth>=12) return;
  raceMonth++;
  const salary=5000;
  const agency=3500+Math.floor(Math.random()*3000);
  const indie=Math.floor(Math.random()*8000)+500;
  raceTotals.salary+=salary;
  raceTotals.agency+=agency;
  raceTotals.indie+=indie;
  raceData.salary.push(salary);
  raceData.agency.push(agency);
  raceData.indie.push(indie);
  const maxPossible=8500;
  $('bar-salary').style.height=Math.round((salary/maxPossible)*100)+'%';
  $('bar-salary').innerHTML='<span style="font-size:.7rem;padding:4px">'+formatMoney(salary)+'</span>';
  $('bar-agency').style.height=Math.round((agency/maxPossible)*100)+'%';
  $('bar-agency').innerHTML='<span style="font-size:.7rem;padding:4px">'+formatMoney(agency)+'</span>';
  $('bar-indie').style.height=Math.round((indie/maxPossible)*100)+'%';
  $('bar-indie').innerHTML='<span style="font-size:.7rem;padding:4px">'+formatMoney(indie)+'</span>';
  $('race-month-num').textContent=raceMonth;
  $('race-total-salary').textContent=formatMoney(raceTotals.salary);
  $('race-total-agency').textContent=formatMoney(raceTotals.agency);
  $('race-total-indie').textContent=formatMoney(raceTotals.indie);
  if(raceMonth>=12){
    $('race-btn').disabled=true;
    $('race-auto-btn').disabled=true;
    state.interactiveDone[1]=true;
    const avgS=Math.round(raceTotals.salary/12);
    const avgA=Math.round(raceTotals.agency/12);
    const avgI=Math.round(raceTotals.indie/12);
    const area=$('income-race-area');
    area.insertAdjacentHTML('beforeend',`
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px;margin-top:14px;text-align:center">
        <p style="font-size:.85rem;color:var(--text-bright);font-weight:700;margin-bottom:6px">12-Month Averages (Expected Value)</p>
        <p style="font-size:.8rem;color:var(--text-muted)">
          <span style="color:#10b981">Salary: ${formatMoney(avgS)}/mo</span> &nbsp;|&nbsp;
          <span style="color:#f59e0b">Agency: ${formatMoney(avgA)}/mo</span> &nbsp;|&nbsp;
          <span style="color:#8b5cf6">Indie: ${formatMoney(avgI)}/mo</span>
        </p>
        <p style="font-size:.75rem;color:var(--text-muted);margin-top:6px">Notice how the salary is the SAME every month, while indie swings wildly! That's the risk vs stability tradeoff.</p>
      </div>
    `);
  }
}

function runRaceAuto(){
  $('race-auto-btn').disabled=true;
  $('race-btn').disabled=true;
  const id=setInterval(()=>{
    if(raceMonth>=12){clearInterval(id);return}
    runRaceMonth();
  },400);
}

// ==================== CHAPTER 2: MONEY SPLITTER ====================
function initMoneySplitter(){
  const area=$('money-split-area');
  if(area.querySelector('.split-controls')) return;
  area.innerHTML=`
    <div style="text-align:center;margin-bottom:12px">
      <span style="font-size:.75rem;color:var(--text-muted)">Choose a model to see how $1,000 gets split:</span>
    </div>
    <div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;flex-wrap:wrap">
      <button class="sim-btn" onclick="showSplit('platform')" id="split-btn-platform">Platform (25% fee)</button>
      <button class="sim-btn" onclick="showSplit('collective')" id="split-btn-collective">Collective (4-way split)</button>
      <button class="sim-btn" onclick="showSplit('solo')" id="split-btn-solo">Solo + Admin ($500)</button>
    </div>
    <div id="split-display" style="display:none">
      <div class="money-bar" id="split-bar"></div>
      <div id="split-details" style="text-align:center;font-size:.85rem;margin-top:8px"></div>
    </div>
    <div id="split-comparison" style="display:none;margin-top:16px;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px">
      <p style="font-size:.82rem;font-weight:700;color:var(--text-bright);text-align:center;margin-bottom:8px">Your Take-Home from $1,000:</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap" id="split-compare-cards"></div>
    </div>
  `;
}

let splitsSeen=new Set();
function showSplit(model){
  const bar=$('split-bar');
  const details=$('split-details');
  const display=$('split-display');
  display.style.display='block';
  document.querySelectorAll('[id^="split-btn-"]').forEach(b=>b.style.opacity=model===b.id.replace('split-btn-','')? '1':'0.5');
  if(model==='platform'){
    bar.innerHTML='<div class="money-segment yours" style="width:75%">You: $750</div><div class="money-segment fee" style="width:25%">Platform: $250</div>';
    details.innerHTML='<span style="color:var(--text)">The platform takes <strong style="color:#ef4444">$250</strong> (25%). You keep <strong style="color:#10b981">$750</strong>.</span>';
  } else if(model==='collective'){
    bar.innerHTML='<div class="money-segment yours" style="width:25%">You: $250</div><div class="money-segment cost" style="width:25%">Person 2: $250</div><div class="money-segment fee" style="width:25%">Person 3: $250</div><div class="money-segment" style="width:25%;background:#8b5cf6">Person 4: $250</div>';
    details.innerHTML='<span style="color:var(--text)">Split 4 ways equally. You get <strong style="color:#10b981">$250</strong> per $1,000 earned by the group.</span>';
  } else {
    bar.innerHTML='<div class="money-segment yours" style="width:85%">You: $850</div><div class="money-segment cost" style="width:15%">Admin: ~$150*</div>';
    details.innerHTML='<span style="color:var(--text)">You keep <strong style="color:#10b981">~$850+</strong>. Admin costs ~$500/mo total (not per project).</span><br><span style="font-size:.72rem;color:var(--text-muted)">*Estimated per-project share of $500/mo admin cost</span>';
  }
  splitsSeen.add(model);
  if(splitsSeen.size>=2){
    $('split-comparison').style.display='block';
    $('split-compare-cards').innerHTML=`
      <div style="text-align:center;padding:10px 16px;background:var(--bg-card);border-radius:8px;border:1px solid var(--border)">
        <div style="font-size:1.1rem;font-weight:800;color:#10b981;font-family:var(--mono)">$750</div>
        <div style="font-size:.65rem;color:var(--text-muted)">Platform</div>
      </div>
      <div style="text-align:center;padding:10px 16px;background:var(--bg-card);border-radius:8px;border:1px solid var(--border)">
        <div style="font-size:1.1rem;font-weight:800;color:#f59e0b;font-family:var(--mono)">$250</div>
        <div style="font-size:.65rem;color:var(--text-muted)">Collective</div>
      </div>
      <div style="text-align:center;padding:10px 16px;background:var(--bg-card);border-radius:8px;border:1px solid var(--border)">
        <div style="font-size:1.1rem;font-weight:800;color:#8b5cf6;font-family:var(--mono)">$850+</div>
        <div style="font-size:.65rem;color:var(--text-muted)">Solo+Admin</div>
      </div>
    `;
    state.interactiveDone[2]=true;
  }
}

// ==================== CHAPTER 3: DEAL MAKER ====================
function initDealMaker(){
  const area=$('deal-maker-area');
  if(area.querySelector('.deal-panel')) return;
  area.innerHTML=`
    <div class="deal-panel">
      <div class="deal-sliders">
        <div class="deal-slider-row">
          <label>Your Pay: <span class="deal-val" id="deal-pay-val">$85,000</span></label>
          <input type="range" min="70" max="120" value="85" id="deal-pay" oninput="updateDeal()">
        </div>
        <div class="deal-slider-row">
          <label>Contract Length: <span class="deal-val" id="deal-length-val">12 months</span></label>
          <input type="range" min="3" max="18" value="12" id="deal-length" oninput="updateDeal()">
        </div>
        <div class="deal-slider-row">
          <label>Side Work Allowed: <span class="deal-val" id="deal-freedom-val">None</span></label>
          <input type="range" min="0" max="2" value="0" id="deal-freedom" oninput="updateDeal()">
        </div>
        <div class="deal-slider-row">
          <label>Bonus %: <span class="deal-val" id="deal-bonus-val">0%</span></label>
          <input type="range" min="0" max="20" value="0" id="deal-bonus" oninput="updateDeal()">
        </div>
      </div>
      <div class="brand-mood">
        <div class="mood-emoji" id="mood-emoji">&#128512;</div>
        <div class="mood-text" id="mood-text" style="color:var(--success)">Brand loves this deal!</div>
        <div class="mood-meter"><div class="mood-fill" id="mood-fill" style="width:100%;background:var(--success)"></div></div>
      </div>
    </div>
    <div id="deal-summary" style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:8px"></div>
    <div class="clause-sort">
      <p style="font-size:.85rem;font-weight:700;color:var(--text-bright);margin-bottom:8px">Sort these contract clauses -- are they GOOD or BAD for you?</p>
      <div class="clause-cards" id="clause-cards">
        <div class="clause-card" id="clause-0"><span>Exclusive for 12 months (no other clients)</span><div class="clause-btns"><button class="clause-btn good-btn" onclick="sortClause(0,'good',this)">Good for me</button><button class="clause-btn bad-btn" onclick="sortClause(0,'bad',this)">Bad for me</button></div></div>
        <div class="clause-card" id="clause-1"><span>10% performance bonus on successful campaigns</span><div class="clause-btns"><button class="clause-btn good-btn" onclick="sortClause(1,'good',this)">Good for me</button><button class="clause-btn bad-btn" onclick="sortClause(1,'bad',this)">Bad for me</button></div></div>
        <div class="clause-card" id="clause-2"><span>Non-compete: can't work in design for 6 months after</span><div class="clause-btns"><button class="clause-btn good-btn" onclick="sortClause(2,'good',this)">Good for me</button><button class="clause-btn bad-btn" onclick="sortClause(2,'bad',this)">Bad for me</button></div></div>
        <div class="clause-card" id="clause-3"><span>Your name featured in all marketing materials</span><div class="clause-btns"><button class="clause-btn good-btn" onclick="sortClause(3,'good',this)">Good for me</button><button class="clause-btn bad-btn" onclick="sortClause(3,'bad',this)">Bad for me</button></div></div>
        <div class="clause-card" id="clause-4"><span>You can leave with 30 days notice</span><div class="clause-btns"><button class="clause-btn good-btn" onclick="sortClause(4,'good',this)">Good for me</button><button class="clause-btn bad-btn" onclick="sortClause(4,'bad',this)">Bad for me</button></div></div>
      </div>
      <div id="clause-result" style="display:none;text-align:center;margin-top:10px;font-size:.82rem"></div>
    </div>
  `;
  updateDeal();
}

function updateDeal(){
  const pay=parseInt($('deal-pay').value);
  const length=parseInt($('deal-length').value);
  const freedom=parseInt($('deal-freedom').value);
  const bonus=parseInt($('deal-bonus').value);
  $('deal-pay-val').textContent='$'+pay+',000';
  $('deal-length-val').textContent=length+' months';
  const freedomLabels=['None','Some side work','Full freedom'];
  $('deal-freedom-val').textContent=freedomLabels[freedom];
  $('deal-bonus-val').textContent=bonus+'%';
  // Calculate brand happiness (0-100)
  let happiness=100;
  happiness-=(pay-85)*3;
  happiness-=(12-length)*2;
  happiness-=freedom*15;
  happiness-=bonus*2;
  happiness=Math.max(0,Math.min(100,happiness));
  const fill=$('mood-fill');
  const emoji=$('mood-emoji');
  const text=$('mood-text');
  fill.style.width=happiness+'%';
  if(happiness>=70){fill.style.background='var(--success)';emoji.innerHTML='&#128512;';text.textContent='Brand loves this deal!';text.style.color='var(--success)'}
  else if(happiness>=40){fill.style.background='var(--accent)';emoji.innerHTML='&#128528;';text.textContent='Brand is thinking...';text.style.color='var(--accent)'}
  else if(happiness>=15){fill.style.background='var(--danger)';emoji.innerHTML='&#128544;';text.textContent='Brand is getting upset!';text.style.color='var(--danger)'}
  else{fill.style.background='var(--danger)';emoji.innerHTML='&#128561;';text.textContent='DEAL REJECTED! Too much!';text.style.color='var(--danger)'}
  const totalPay=pay*1000+ (bonus>0 ? Math.round(pay*1000*bonus/100) : 0);
  $('deal-summary').textContent='Your deal: $'+pay+',000 base' + (bonus>0?' + up to $'+Math.round(pay*10*bonus)+' bonus':'') + ' for '+length+' months. '+freedomLabels[freedom]+' side work.';
}

const clauseAnswers={0:'bad',1:'good',2:'bad',3:'good',4:'good'};
let clausesSorted=0;
let clausesCorrect=0;
function sortClause(idx,answer,btn){
  const card=$('clause-'+idx);
  if(card.classList.contains('good')||card.classList.contains('bad')) return;
  const isCorrect=answer===clauseAnswers[idx];
  card.classList.add(isCorrect?'good':'bad');
  card.querySelectorAll('.clause-btn').forEach(b=>{b.disabled=true;b.style.opacity=0.5});
  btn.style.opacity=1;
  btn.classList.add('active');
  clausesSorted++;
  if(isCorrect) clausesCorrect++;
  if(clausesSorted>=5){
    $('clause-result').style.display='block';
    $('clause-result').innerHTML=`<strong style="color:${clausesCorrect>=4?'var(--success)':'var(--accent)'}">You got ${clausesCorrect}/5 correct!</strong> Knowing which terms help or hurt you is bargaining power in action.`;
    state.interactiveDone[3]=true;
  }
}

// ==================== CHAPTER 4: PRICE LAB ====================
function initPriceLab(){
  const area=$('price-lab-area');
  if(area.querySelector('.price-lab')) return;
  area.innerHTML=`
    <div class="price-lab">
      <p style="font-size:.85rem;color:var(--text);margin-bottom:8px">Set the price of your design template:</p>
      <input type="range" min="5" max="100" value="25" id="price-slider" oninput="updatePriceLab()" style="width:100%;accent-color:var(--accent)">
      <div class="price-display" id="price-display">$25</div>
      <div class="rev-formula">Customers this month:</div>
      <div class="customers-display" id="customers-display"></div>
      <div class="rev-formula" id="rev-formula"></div>
      <div class="revenue-display" id="revenue-display">$0 / month</div>
      <div id="price-insight" style="font-size:.78rem;color:var(--text-muted);margin-top:8px;min-height:2em"></div>
    </div>
  `;
  updatePriceLab();
  state.interactiveDone[4]=true;
}

function updatePriceLab(){
  const price=parseInt($('price-slider').value);
  // Demand curve: more buyers at lower prices
  const customers=Math.max(1,Math.round(300/(price+5)));
  const revenue=price*customers;
  $('price-display').textContent='$'+price;
  let icons='';
  for(let i=0;i<Math.min(customers,50);i++) icons+='<span class="customer-icon">&#129489;</span>';
  if(customers>50) icons+='<span style="font-size:.8rem;color:var(--text-muted)"> +' + (customers-50) + ' more</span>';
  $('customers-display').innerHTML=icons;
  $('rev-formula').textContent='$'+price+' x '+customers+' customers =';
  $('revenue-display').textContent=formatMoney(revenue)+' / month';
  const insight=$('price-insight');
  if(price<=15) insight.textContent='Super cheap! Lots of buyers, but you earn very little per sale.';
  else if(price<=30) insight.textContent='Good middle ground! Decent number of buyers and decent earnings per sale.';
  else if(price<=60) insight.textContent='Getting expensive. Fewer buyers, but each one pays more.';
  else insight.textContent='Premium pricing! Very few buyers. You better have an amazing template!';
}

// ==================== CHAPTER 5: GROWTH MACHINE ====================
let growthYear=0;
let growthMode='reinvest';
let growthReinvest=[1000];
let growthSpend=[1000];

function initGrowthMachine(){
  const area=$('growth-machine-area');
  if(area.querySelector('.growth-chart')) return;
  growthYear=0;
  growthReinvest=[1000];
  growthSpend=[1000];
  growthMode='reinvest';
  let barsHTML='';
  for(let i=0;i<=10;i++){
    barsHTML+=`<div class="growth-bar-wrap"><div class="growth-bar reinvest" id="gbar-${i}" style="height:0"><span class="growth-bar-val" id="gval-${i}"></span></div><div class="growth-bar-label">Y${i}</div></div>`;
  }
  area.innerHTML=`
    <div style="text-align:center;margin-bottom:8px">
      <span style="font-size:.85rem;color:var(--text-bright);font-weight:600">Starting profit: $1,000/year. Growth rate: 20% per year.</span>
    </div>
    <div class="growth-toggle">
      <button class="active" id="gt-reinvest" onclick="setGrowthMode('reinvest')">Reinvest Profits</button>
      <button id="gt-spend" onclick="setGrowthMode('spend')">Spend Profits</button>
    </div>
    <div class="growth-chart" id="growth-chart">${barsHTML}</div>
    <div style="display:flex;gap:12px;justify-content:center;margin-top:4px">
      <div style="font-size:.72rem;color:var(--text-muted)"><span style="color:#10b981">&#9632;</span> Reinvest</div>
      <div style="font-size:.72rem;color:var(--text-muted)"><span style="color:#ef4444">&#9632;</span> Spend</div>
    </div>
    <div style="text-align:center;margin:16px 0 8px">
      <button class="sim-btn" id="growth-btn" onclick="growOneYear()">Grow 1 Year</button>
      <button class="sim-btn accent" onclick="growAllYears()" id="growth-all-btn" style="margin-left:8px">Grow All 10 Years</button>
    </div>
    <div id="growth-result" style="display:none;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px;text-align:center;margin-top:10px"></div>
  `;
  renderGrowthBars();
}

function setGrowthMode(mode){
  growthMode=mode;
  $('gt-reinvest').classList.toggle('active',mode==='reinvest');
  $('gt-spend').classList.toggle('active',mode==='spend');
}

function growOneYear(){
  if(growthYear>=10) return;
  growthYear++;
  const lastR=growthReinvest[growthReinvest.length-1];
  growthReinvest.push(Math.round(lastR*1.2));
  growthSpend.push(1000);
  renderGrowthBars();
  if(growthYear>=10){
    $('growth-btn').disabled=true;
    $('growth-all-btn').disabled=true;
    showGrowthResult();
  }
}

function growAllYears(){
  $('growth-all-btn').disabled=true;
  $('growth-btn').disabled=true;
  const id=setInterval(()=>{
    if(growthYear>=10){clearInterval(id);return}
    growOneYear();
  },350);
}

function renderGrowthBars(){
  const maxVal=Math.max(...growthReinvest,...growthSpend,1000);
  for(let i=0;i<=Math.min(growthYear,10);i++){
    const bar=$('gbar-'+i);
    const val=$('gval-'+i);
    const rVal=growthReinvest[i]||0;
    const sVal=growthSpend[i]||0;
    const showVal=growthMode==='reinvest'?rVal:sVal;
    const pct=Math.max(3,Math.round((showVal/maxVal)*100));
    bar.style.height=pct+'%';
    bar.className='growth-bar '+(growthMode==='reinvest'?'reinvest':'spend');
    val.textContent=showVal>=1000?'$'+Math.round(showVal/1000)+'k':'$'+showVal;
  }
}

function showGrowthResult(){
  const totalR=growthReinvest.reduce((a,b)=>a+b,0);
  const totalS=growthSpend.reduce((a,b)=>a+b,0);
  $('growth-result').style.display='block';
  $('growth-result').innerHTML=`
    <p style="font-size:.9rem;font-weight:700;color:var(--text-bright);margin-bottom:6px">10-Year Results</p>
    <p style="font-size:.85rem"><span style="color:#10b981;font-weight:700">Reinvest: ${formatMoney(totalR)} total</span> &mdash; Year 10 profit: ${formatMoney(growthReinvest[10])}</p>
    <p style="font-size:.85rem"><span style="color:#ef4444;font-weight:700">Spend: ${formatMoney(totalS)} total</span> &mdash; Year 10 profit: ${formatMoney(1000)}</p>
    <p style="font-size:.78rem;color:var(--accent);margin-top:8px;font-weight:600">Compounding made the reinvest strategy earn ${formatMoney(totalR-totalS)} MORE over 10 years!</p>
    <p style="font-size:.72rem;color:var(--text-muted);margin-top:4px">Click the toggle buttons above to compare the two strategies visually.</p>
  `;
  state.interactiveDone[5]=true;
}

// ==================== CHOICE SELECTION ====================
function selectChoice(chapter,choice,el){
  if(document.querySelector('#quiz-ch'+chapter+' .question-card')) return;
  const container=$('choices-ch'+chapter);
  container.querySelectorAll('.choice-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  state.chapters[chapter]=choice;
  applyDashValues(chapter,choice);
  const outcomeBox=$('outcome-ch'+chapter);
  outcomeBox.innerHTML='<h3>What Happens:</h3><p>'+OUTCOMES[chapter][choice]+'</p>';
  outcomeBox.classList.add('visible');
  setTimeout(()=>loadChapterQuiz(chapter,choice),400);
}

// ==================== QUIZ ENGINE ====================
function loadChapterQuiz(chapter,choice){
  const container=$('quiz-ch'+chapter);
  if(container.querySelector('.question-card')) return;
  const bank=CHAPTER_QUESTIONS[chapter][choice];
  const selected=selectRandom(bank,5);
  const questions=selected.map(q=>randomizeQuestion(q));
  let html='<div class="quiz-header"><h3>Knowledge Check</h3><span class="quiz-score-badge" id="score-badge-ch'+chapter+'">0 / 5</span></div>';
  questions.forEach((q,idx)=>{
    html+=buildQuestionHTML(q,idx,chapter,'ch'+chapter);
  });
  container.innerHTML=html;
  container.classList.add('visible');
  container.dataset.totalCorrect='0';
  container.dataset.totalAnswered='0';
}

function loadFinalQuiz(){
  const container=$('quiz-final');
  if(container.querySelector('.question-card')) return;
  const selected=selectRandom(FINAL_QUESTIONS,10);
  const questions=selected.map(q=>randomizeQuestion(q));
  let html='<div class="quiz-header"><h3>Final Assessment</h3><span class="quiz-score-badge" id="score-badge-final">0 / 10</span></div>';
  questions.forEach((q,idx)=>{
    html+=buildQuestionHTML(q,idx,'final','final');
  });
  container.innerHTML=html;
  container.dataset.totalCorrect='0';
  container.dataset.totalAnswered='0';
}

function buildQuestionHTML(q,idx,chapter,prefix){
  const totalQ=prefix==='final'?10:5;
  let html='<div class="question-card" id="qcard-'+prefix+'-'+idx+'"><div class="question-number">Question '+(idx+1)+' of '+totalQ+'</div><div class="question-text">'+q.q+'</div>';
  if(q.type==='fillin'){
    html+=`<div class="fillin-wrap">
      <span style="font-size:.9rem;color:var(--text)">${q.prefix||''}</span>
      <input type="number" class="fillin-input" id="fillin-${prefix}-${idx}" placeholder="?" data-answer="${q.answer}" data-chapter="${chapter}" data-q="${idx}">
      <button class="fillin-check" onclick="checkFillin('${prefix}',${idx},'${chapter}')">Check</button>
      <span class="fillin-feedback" id="fillin-fb-${prefix}-${idx}"></span>
    </div>`;
  } else {
    const labels=['A','B','C','D'];
    html+='<div class="options-list">';
    q.options.forEach((opt,oi)=>{
      html+='<button class="option-btn" data-chapter="'+chapter+'" data-q="'+idx+'" data-opt="'+oi+'" data-correct="'+q.correct+'" data-prefix="'+prefix+'" onclick="answerMC(this)"><span class="option-letter">'+labels[oi]+'</span><span>'+opt+'</span></button>';
    });
    html+='</div>';
  }
  html+='</div>';
  return html;
}

function answerMC(btn){
  const card=btn.closest('.question-card');
  if(card.classList.contains('answered-correct')||card.classList.contains('answered-wrong')) return;
  const ch=btn.dataset.chapter;
  const optIdx=parseInt(btn.dataset.opt);
  const correctIdx=parseInt(btn.dataset.correct);
  const prefix=btn.dataset.prefix;
  card.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
  state.totalAnswered++;
  const container=btn.closest('.quiz-section');
  container.dataset.totalAnswered=parseInt(container.dataset.totalAnswered)+1;
  if(optIdx===correctIdx){
    btn.classList.add('correct');
    card.classList.add('answered-correct');
    state.totalCorrect++;
    container.dataset.totalCorrect=parseInt(container.dataset.totalCorrect)+1;
  }else{
    btn.classList.add('wrong');
    card.classList.add('answered-wrong');
    card.querySelectorAll('.option-btn').forEach(b=>{if(parseInt(b.dataset.opt)===correctIdx) b.classList.add('correct')});
  }
  updateScoreBadge(container,prefix,ch);
}

function checkFillin(prefix,idx,chapter){
  const input=$('fillin-'+prefix+'-'+idx);
  const fb=$('fillin-fb-'+prefix+'-'+idx);
  const card=input.closest('.question-card');
  if(card.classList.contains('answered-correct')||card.classList.contains('answered-wrong')) return;
  const userVal=parseInt(input.value);
  const correctVal=parseInt(input.dataset.answer);
  if(isNaN(userVal)){fb.textContent='Type a number!';fb.className='fillin-feedback wrong';return}
  input.disabled=true;
  input.nextElementSibling.disabled=true;
  state.totalAnswered++;
  const container=card.closest('.quiz-section');
  container.dataset.totalAnswered=parseInt(container.dataset.totalAnswered)+1;
  // Accept within 5% tolerance
  const tolerance=Math.max(correctVal*0.05,1);
  if(Math.abs(userVal-correctVal)<=tolerance){
    input.classList.add('correct');
    card.classList.add('answered-correct');
    fb.textContent='Correct!';
    fb.className='fillin-feedback correct';
    state.totalCorrect++;
    container.dataset.totalCorrect=parseInt(container.dataset.totalCorrect)+1;
  }else{
    input.classList.add('wrong');
    card.classList.add('answered-wrong');
    fb.textContent='Answer: '+(input.dataset.answer.includes('%')?'':' $')+correctVal;
    fb.className='fillin-feedback wrong';
  }
  updateScoreBadge(container,prefix,chapter);
}

function updateScoreBadge(container,prefix,ch){
  const isFinal=prefix==='final';
  const totalQ=isFinal?10:5;
  const answered=parseInt(container.dataset.totalAnswered);
  const correct=parseInt(container.dataset.totalCorrect);
  const badge=$(isFinal?'score-badge-final':'score-badge-ch'+ch);
  if(badge) badge.textContent=correct+' / '+totalQ;
  if(answered===totalQ){
    if(isFinal) finishFinalCheck(correct);
    else finishChapter(parseInt(ch),correct);
  }
  updateProgress();
}

// ==================== FINISH CHAPTER ====================
function finishChapter(chapter,correct){
  const passed=correct>=4;
  state.chapterScores[chapter]=correct;
  state.chaptersPassed[chapter]=passed;
  const banner=$('result-ch'+chapter);
  if(passed){
    banner.className='result-banner visible pass';
    banner.innerHTML='<h3>Chapter '+chapter+' Passed!</h3><p>Score: '+correct+'/5 &mdash; You need 4/5 to pass. Great work!</p>';
  }else{
    banner.className='result-banner visible fail';
    banner.innerHTML='<h3>Not Quite...</h3><p>Score: '+correct+'/5 &mdash; You need at least 4/5 to pass. Try again!</p>';
  }
  $('nav-ch'+chapter).style.display='flex';
  if(passed){const nb=$('next-ch'+chapter);if(nb) nb.disabled=false}
  updateProgress();
  saveState();
}

// ==================== RETRY CHAPTER ====================
function retryChapter(chapter){
  state.chaptersPassed[chapter]=false;
  state.chapterScores[chapter]=0;
  state.chapters[chapter]=null;
  const container=$('choices-ch'+chapter);
  container.querySelectorAll('.choice-card').forEach(c=>c.classList.remove('selected'));
  $('outcome-ch'+chapter).classList.remove('visible');
  $('outcome-ch'+chapter).innerHTML='';
  const quiz=$('quiz-ch'+chapter);
  quiz.innerHTML='';quiz.classList.remove('visible');
  const banner=$('result-ch'+chapter);
  banner.className='result-banner';banner.innerHTML='';
  $('nav-ch'+chapter).style.display='none';
  const nb=$('next-ch'+chapter);if(nb) nb.disabled=true;
  window.scrollTo({top:0,behavior:'smooth'});
  updateProgress();saveState();
}

// ==================== FINAL CHECK ====================
function finishFinalCheck(correct){
  const passed=correct>=7;
  state.finalScore=correct;
  state.finalPassed=passed;
  const allChapters=Object.values(state.chaptersPassed).every(Boolean);
  const banner=$('result-final');
  if(passed&&allChapters){
    banner.className='result-banner visible pass';
    banner.innerHTML='<h3>You Passed the Final Challenge!</h3><p>Score: '+correct+'/10. You completed the entire simulation!</p>';
    $('nav-final').style.display='flex';
    setTimeout(()=>{goToScreen('screen-complete');showCompletion()},2000);
  }else if(passed){
    banner.className='result-banner visible pass';
    banner.innerHTML='<h3>Assessment Passed!</h3><p>Score: '+correct+'/10. But you need to pass all 5 chapters first!</p>';
    $('nav-final').style.display='flex';
  }else{
    banner.className='result-banner visible fail';
    banner.innerHTML='<h3>Not Quite...</h3><p>Score: '+correct+'/10 &mdash; You need at least 7/10. Review the concepts and try again!</p>';
    $('nav-final').style.display='flex';
  }
  updateProgress();saveState();
}

function retryFinal(){
  state.finalPassed=false;state.finalScore=0;
  const quiz=$('quiz-final');quiz.innerHTML='';
  const banner=$('result-final');banner.className='result-banner';banner.innerHTML='';
  $('nav-final').style.display='none';
  loadFinalQuiz();
  window.scrollTo({top:0,behavior:'smooth'});
  updateProgress();saveState();
}

// ==================== COMPLETION ====================
function showCompletion(){
  const code=CLAIM_CODES[Math.floor(Math.random()*CLAIM_CODES.length)];
  $('claim-code').textContent=code;
  const choices={1:'A',2:'A',3:'A',4:'A',5:'A'};
  const labels={A:['Full-Time Job','Join Platform','Take the Deal','Hire Employees','Sell Business'],B:['Agency Contract','Form Collective','Negotiate Terms','Sell Templates','Take Investors'],C:['Go Independent','Solo + Admin','Turn It Down','Build Agency','Stay Independent']};
  let rows='';
  for(let i=1;i<=5;i++){
    const ch=state.chapters[i]||'?';
    const lbl=labels[ch]?labels[ch][i-1]:ch;
    rows+=`<tr><td>Chapter ${i}</td><td>${lbl} (${state.chapterScores[i]}/5)</td></tr>`;
  }
  rows+=`<tr><td>Final Score</td><td>${state.finalScore}/10</td></tr>`;
  rows+=`<tr><td>Overall Accuracy</td><td>${state.totalAnswered>0?Math.round((state.totalCorrect/state.totalAnswered)*100):0}%</td></tr>`;
  $('summary-table').innerHTML=rows;
  launchConfetti();
  saveState();
}

function restartSimulation(){
  localStorage.removeItem('bsc_state');
  location.reload();
}

// ==================== CONFETTI ====================
function launchConfetti(){
  const canvas=$('confetti-canvas');
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  const pieces=[];
  const colors=['#f59e0b','#10b981','#8b5cf6','#ef4444','#3b82f6','#ec4899'];
  for(let i=0;i<150;i++){
    pieces.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height-canvas.height,w:Math.random()*8+4,h:Math.random()*6+3,color:colors[Math.floor(Math.random()*colors.length)],vy:Math.random()*3+2,vx:(Math.random()-0.5)*2,rot:Math.random()*360,vr:(Math.random()-0.5)*6});
  }
  let frame=0;
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.y+=p.vy;p.x+=p.vx;p.rot+=p.vr;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();
    });
    frame++;
    if(frame<200) requestAnimationFrame(animate);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  animate();
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded',()=>{
  updateProgress();
});
