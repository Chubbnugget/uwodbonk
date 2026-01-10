import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function MeleeCalculator() {
  // --- STATE MANAGEMENT ---
  const [inputs, setInputs] = useState({
    crew: 0, meleeSupport: 0, battleLevel: 0, swordplayRank: 0,
    firstAidRank: 0, characterAttack: 0, characterdefence: 0,
    sailorsAbility: 0, fatigue: 0, exEffectRank: 0
  });

  const [checkboxes, setCheckboxes] = useState({
    meleeTactics1: false, meleeTactics2: false, strengthenMelee1: false,
    strengthenMelee2: false, preEmptiveAttack: false,
    welcomeMeleeBattle: false, attackPreventionNet: false
  });

  const [results, setResults] = useState({
    baseAttack: 0, baseDefence: 0, boostedAttack: 0, boostedDefence: 0
  });

  // --- LOGIC FUNCTIONS ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
  };

  const handleCheckChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxes(prev => ({ ...prev, [id]: checked }));
  };

  const calculateAll = () => {
    // 1. Calculate Base Attack
    const attack = Math.floor(inputs.crew / 2) + Math.floor(inputs.meleeSupport * 5) +
                   Math.floor(inputs.battleLevel / 2) + Math.floor(inputs.swordplayRank * 3) +
                   Math.floor(inputs.characterAttack / 4) + Math.floor((inputs.sailorsAbility - 2) / 10) -
                   Math.floor((inputs.fatigue + 5) / 10);

    // 2. Calculate Base Defence
    const defence = Math.floor(inputs.crew / 4) + Math.floor(inputs.battleLevel / 2) +
                    Math.floor(inputs.firstAidRank * 3) + Math.floor(inputs.characterdefence / 3) +
                    Math.floor((inputs.fatigue - 1) / 10);

    // 3. Calculate Boosts
    const exResult = inputs.exEffectRank >= 1 ? Math.floor(inputs.exEffectRank * 10) : 0;
    const mt1A = checkboxes.meleeTactics1 ? Math.floor(attack * 0.1) : 0;
    const mt1D = checkboxes.meleeTactics1 ? Math.floor(defence * 0.1) : 0;
    const mt2A = checkboxes.meleeTactics2 ? Math.floor(attack * 0.15) : 0;
    const mt2D = checkboxes.meleeTactics2 ? Math.floor(defence * 0.15) : 0;
    const sm1A = checkboxes.strengthenMelee1 ? Math.floor(attack * 0.05) : 0;
    const sm2A = checkboxes.strengthenMelee2 ? Math.floor(attack * 0.1) : 0;
    const peaA = checkboxes.preEmptiveAttack ? Math.floor(attack * 0.2) : 0;
    const wmbD = checkboxes.welcomeMeleeBattle ? Math.floor(defence) : 0;
    const apnD = checkboxes.attackPreventionNet ? Math.floor(defence * 0.3) : 0;

    setResults({
      baseAttack: attack,
      baseDefence: defence,
      boostedAttack: Math.floor(attack + exResult + mt1A + mt2A + sm1A + sm2A + peaA),
      boostedDefence: Math.floor(defence + exResult + mt1D + mt2D + wmbD + apnD)
    });
  };

  return (
    <Layout title="Melee Calculator" description="Bears Melee Calculator for UWO">
      <Head>
        <style>{`
          .calc-container { display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; }
          .calc-box { flex: 1; min-width: 350px; border: 1px solid #4498bd; padding: 20px; border-radius: 8px; background: var(--ifm-background-surface-color); }
          .input-row { margin-bottom: 15px; }
          .input-row label { display: block; font-weight: bold; margin-bottom: 5px; }
          .input-row input[type="number"] { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
          .check-group { display: flex; flex-direction: column; gap: 8px; margin: 10px 0; }
          .check-item { display: flex; align-items: center; gap: 10px; cursor: pointer; }
          .res-box { font-size: 1.2rem; font-weight: bold; color: #4498bd; margin-top: 15px; }
          .calc-button { width: 100%; padding: 12px; background: #4498bd; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 10px; }
          .calc-button:hover { background: #213f4e; }
        `}</style>
      </Head>

      <main className="container margin-vert--lg">
        <h1>Bears Melee Calculator</h1>
        <div className="calc-container">
          
          {/* LEFT COLUMN: BASE STATS */}
          <div className="calc-box">
            <h2>Base Stats</h2>
            {[
              { id: 'crew', label: 'Crew' },
              { id: 'meleeSupport', label: 'Melee Support' },
              { id: 'battleLevel', label: 'Battle Level' },
              { id: 'swordplayRank', label: 'Swordplay Rank' },
              { id: 'firstAidRank', label: 'First Aid Rank' },
              { id: 'characterAttack', label: 'Character Attack' },
              { id: 'characterdefence', label: 'Character Defence' },
              { id: 'sailorsAbility', label: 'Sailors Ability' },
              { id: 'fatigue', label: 'Fatigue' },
            ].map(item => (
              <div key={item.id} className="input-row">
                <label>{item.label}</label>
                <input type="number" id={item.id} value={inputs[item.id]} onChange={handleInputChange} />
              </div>
            ))}
            <div className="res-box">Base Attack: {results.baseAttack}</div>
            <div className="res-box">Base Defence: {results.baseDefence}</div>
          </div>

          {/* RIGHT COLUMN: BOOSTERS */}
          <div className="calc-box">
            <h2>Extra Boosters</h2>
            <div className="input-row">
              <label>Ex Effect Rank</label>
              <input type="number" id="exEffectRank" value={inputs.exEffectRank} onChange={handleInputChange} />
            </div>

            <h3>Oxford Skills</h3>
            <div className="check-group">
              {['meleeTactics1', 'meleeTactics2', 'strengthenMelee1', 'strengthenMelee2'].map(id => (
                <label key={id} className="check-item">
                  <input type="checkbox" id={id} checked={checkboxes[id]} onChange={handleCheckChange} />
                  {id.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
              ))}
            </div>

            <h3>Ship Skills</h3>
            <div className="check-group">
              {['preEmptiveAttack', 'welcomeMeleeBattle', 'attackPreventionNet'].map(id => (
                <label key={id} className="check-item">
                  <input type="checkbox" id={id} checked={checkboxes[id]} onChange={handleCheckChange} />
                  {id.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
              ))}
            </div>

            <button className="calc-button" onClick={calculateAll}>Calculate Everything</button>
            
            <div className="res-box" style={{color: '#e67e22'}}>Boosted Attack: {results.boostedAttack}</div>
            <div className="res-box" style={{color: '#e67e22'}}>Boosted Defence: {results.boostedDefence}</div>
          </div>

        </div>
      </main>
    </Layout>
  );
}