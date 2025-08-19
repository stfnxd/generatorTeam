import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [teamSize, setTeamSize] = useState(5);
  const [teams, setTeams] = useState({ team1: [], team2: [] });

  const handleGenerateTeams = () => {
    const names = inputText
      .split('\n')
      .map(name => name.trim())
      .filter(name => name);

    const requiredCount = teamSize * 2;

    if (names.length < requiredCount) {
      alert(`Du skal mindst indtaste ${requiredCount} personer for holdstørrelse ${teamSize}.`);
      return;
    }

    const shuffled = [...names].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, requiredCount);

    const team1 = selected.slice(0, teamSize);
    const team2 = selected.slice(teamSize, requiredCount);

    setTeams({ team1, team2 });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Holdgenerator</h1>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        style={{ width: '100%', marginBottom: '1rem' }}
        placeholder="Indtast ét navn per linje..."
      />

      <div style={{ marginBottom: '1rem' }}>
        <label>Holdstørrelse: </label>
        <select
          value={teamSize}
          onChange={(e) => setTeamSize(Number(e.target.value))}
        >
          {[2, 3, 4, 5, 6, 7, 8].map(size => (
            <option key={size} value={size}>
              {size} personer per hold
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleGenerateTeams}>Lav hold</button>

      {(teams.team1.length > 0 || teams.team2.length > 0) && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Resultat:</h2>
          <div>
            <strong>Hold 1:</strong>
            <ul>
              {teams.team1.map((name, i) => (
                <li key={`team1-${i}`}>{name}</li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <strong>Hold 2:</strong>
            <ul>
              {teams.team2.map((name, i) => (
                <li key={`team2-${i}`}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
