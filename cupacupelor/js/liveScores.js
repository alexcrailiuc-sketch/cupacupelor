// ==== Clasament ====
const liveTeams = [
  { id: "SteauaBucuresti", wins: 4, points: 13 },
  { id: "DinamoBucuresti", wins: 3, points: 10 },
  { id: "RapidBucuresti", wins: 3, points: 9 }
];

// ==== Cupa eliminatorie ====
const cupMatches = [
  { id: "match1", score: [3,1], teams:["Steaua","Dinamo"] },
  { id: "match2", score: [2,0], teams:["Rapid","CFR"] }
];

// ==== Meciuri tabel ====
const matchTable = [
  { row: 1, score: [2,1] },
  { row: 2, score: [1,0] },
  { row: 3, score: [0,3] }
];

// ==== Funcții update gradual ====
function updateClassament() {
  liveTeams.forEach(team => {
    const winsElem = document.getElementById(team.id+'V');
    const pointsElem = document.getElementById(team.id+'P');
    if(!winsElem || !pointsElem) return;
    const newWins = team.wins + (Math.random() < 0.5 ? 1 : 0);
    const newPoints = team.points + Math.floor(Math.random()*2);
    winsElem.style.opacity = 0;
    pointsElem.style.opacity = 0;
    setTimeout(()=>{
      winsElem.textContent = newWins;
      pointsElem.textContent = newPoints;
      winsElem.style.opacity = 1;
      pointsElem.style.opacity = 1;
      team.wins = newWins;
      team.points = newPoints;
      highlightLeader();
    },300);
  });
}

function highlightLeader() {
  let leader = liveTeams.reduce((a,b)=> a.points >= b.points ? a : b);
  liveTeams.forEach(team => {
    const row = document.getElementById(team.id+'Row');
    if(row) row.style.backgroundColor = (team.id===leader.id) ? "rgba(255,204,0,0.5)" : "rgba(255,255,255,0.95)";
  });
}

function updateCupa() {
  cupMatches.forEach(m=>{
    const el = document.getElementById(m.id);
    if(!el) return;
    let newScore = m.score.map(s => s + Math.floor(Math.random()*2));
    el.querySelector('span').textContent = newScore.join(' - ');
    m.score = newScore;
  });
}

function updateMeciuri() {
  matchTable.forEach(m=>{
    const table = document.getElementById('matchesTable');
    if(!table) return;
    const row = table.rows[m.row];
    if(!row) return;
    let newScore = m.score.map(s => s + Math.floor(Math.random()*2));
    row.cells[3].textContent = newScore.join('-');
    m.score = newScore;
  });
}

// ==== Interval update ====
setInterval(()=>{
  updateClassament();
  updateCupa();
  updateMeciuri();
},4000);

// ==== Actualizare scor după meci (formular) ====
function actualizeazaClasamentDupaMeci(echipaGazde, echipaOaspeti, scorGazde, scorOaspeti){
  const teamG = liveTeams.find(t => t.id.toLowerCase().includes(echipaGazde.toLowerCase()));
  const teamO = liveTeams.find(t => t.id.toLowerCase().includes(echipaOaspeti.toLowerCase()));
  if(!teamG || !teamO) return;

  if(scorGazde > scorOaspeti) teamG.points+=3, teamG.wins+=1;
  else if(scorGazde < scorOaspeti) teamO.points+=3, teamO.wins+=1;
  else teamG.points+=1, teamO.points+=1;

  const gV = document.getElementById(teamG.id+'V');
  const gP = document.getElementById(teamG.id+'P');
  const oV = document.getElementById(teamO.id+'V');
  const oP = document.getElementById(teamO.id+'P');
  if(gV && gP && oV && oP){
    gV.textContent = teamG.wins;
    gP.textContent = teamG.points;
    oV.textContent = teamO.wins;
    oP.textContent = teamO.points;
  }

  highlightLeader();
}

function actualizeazaCupaDupaMeci(echipaGazde, echipaOaspeti, scorGazde, scorOaspeti){
  let castigator = scorGazde>scorOaspeti ? echipaGazde : echipaOaspeti;
  const cupaEl = document.querySelector('#cupa tbody tr td[data-match="'+echipaGazde+'-'+echipaOaspeti+'"]');
  if(cupaEl){
    cupaEl.textContent = castigator;
    cupaEl.style.backgroundColor="rgba(144,238,144,0.5)";
  }
}
