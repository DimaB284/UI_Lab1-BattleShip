export default function About() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 border rounded-lg shadow-sm mt-10 text-center">
      
      <div className="text-8xl mb-6 flex justify-center space-x-4">
        <span>⚓️</span>
        <span>🚢</span>
      </div>
      
      <h1 className="text-4xl font-extrabold mb-4 text-indigo-800">Battleship</h1>
      <p className="text-sm text-slate-500 mb-8 font-mono">Version 1.0.0 | Lab №1</p>
      
      <div className="text-left bg-slate-50 p-6 rounded-lg border">
        <h2 className="text-xl font-bold mb-3 text-slate-800">About</h2>
        <p className="mb-4 text-slate-600 leading-relaxed">
         This Web application is a classic implementation of the strategic game "BattleShip". 
         The player has to command his own fleet, placing ships on a 10x10 grid, 
         and engage in tactical confrontation with a computer opponent.
        </p>
        
        <h3 className="font-bold text-slate-800 mt-6 mb-2">Rules:</h3>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>At your disposal is a fleet of ships of various deck sizes (from 1 to 4).</li>
          <li>Ships cannot touch each other at corners or sides.</li>
          <li>Players take turns shooting. If you hit, you get an extra shot.</li>
          <li>The player who is the first to completely destroy the opponent fleet wins.</li>
        </ul>
      </div>

    </div>
  );
}