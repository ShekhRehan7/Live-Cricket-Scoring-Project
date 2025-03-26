import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoCloseCircleOutline } from "react-icons/io5";

export default function LiveScoring() {
  let location = useLocation();
  // console.log(location.state)  ;

  const [startMatch, setStartMatch] = useState(false);
  const [innings, setInnings] = useState(1);
  const [firstInningsRun, setfirstInningsRun] = useState();
  const [addNew, setAddNew] = useState(false);
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [overs, setOvers] = useState(0);
  const [extras, setExtras] = useState({ noBall: 0, wide: 0, legByes: 0, byes: 0, wickets: 0 });
  const [extraRuns,setextraRuns]= useState(false)
  const [isNoBall, setIsNoBall] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [isLegBye, setIsLegBye] = useState(false);
  const [isBye, setIsBye] = useState(false);
  const [batsman, setBatsman] = useState({ name: '', runs: 0, balls: 0, fours: 0, sixes: 0 });
  const [nonStriker, setNonStriker] = useState({ name: '', runs: 0, balls: 0, fours: 0, sixes: 0 });
  const [bowler, setBowler] = useState({ name: '', runs: 0, balls: 0, maiden: 0, wickets: 0, over:0, });
  const [thisOver, setThisOver] = useState([]);
  const [isWicket, setIsWicket] = useState(false);
  const [wicketType, setWicketType] = useState('');
  const [newPlayer, setNewPlayer] = useState('');
  const [isFreeHit, setIsFreeHit] = useState(false);
  const [newBowler, setNewBowler] = useState('');
  const [overComplete, setOverComplete] = useState(false);
  const [waitingForNewBowler, setWaitingForNewBowler] = useState(false); 
  const wicketOptions = ['Bowled', 'Catch out', 'Run out striker', 'Run out non-striker', 'Stumping', 'LBW', 'Hit wicket'];

  const calculateStrikeRate = (runs, balls) => (balls > 0 ? ((runs / balls) * 100).toFixed(2) : '0.00');

  
  // console.log(extras)
  const extratotal = extras
   let exrtaRunsTotal = extratotal.byes+extratotal.legByes+extratotal.noBall+extratotal.wide
  //  console.log(exrtaRunsTotal)
  
  let players= parseInt(location.state.playersPerTeam)  
  // console.log(players)
   let maxOver = parseInt(location.state.overs) 
  //  console.log(maxOver)

  

  const handleRun = (run) => {
    if (waitingForNewBowler) {
      alert("Please add the new bowler's name before proceeding.");
      return;
    }

    // if(overs == maxOver){
    //   // setStartMatch(true)
    //   setOverComplete(false)
    //   console.log("yes")
    //   setInnings(2)
    // }
    // // console.log(firstInningsRun)

    if (isWicket) {``
      if(wickets < players){
        setWickets((prevWickets) => prevWickets + 1);
      setBowler((prevBowler) => ({
          ...prevBowler,
          wickets: prevBowler.wickets + 1,
          balls:prevBowler.balls+1,
      }));

      setThisOver((prevOver) => [...prevOver, "W"]);
      setAddNew(true);

      setBatsman({ runs: 0, balls: 0, fours: 0, sixes: 0 });
      setIsWicket(false); // Auto uncheck
      return;
      }
      else {
            alert("All 10 wickets have fallen!");
          }
  }
  
     if (isNoBall) {
      // No Ball logic
      setScore((prevScore) => prevScore + run + 1);
      setExtras((prevExtras) => ({
          ...prevExtras,
          noBall: prevExtras.noBall + 1,
      }));
      setThisOver((prevOver) => [...prevOver, `NB+${run}`]);

  
      // Batsman ke runs update honge, lekin ball count nahi hogi
      if (run > 0) {
        setBatsman((prevBatsman) => ({
          ...prevBatsman,
          runs: prevBatsman.runs + run,
          fours: run === 4 ? prevBatsman.fours + 1 : prevBatsman.fours,
          sixes: run === 6 ? prevBatsman.sixes + 1 : prevBatsman.sixes,
        }));
      }
      setIsNoBall(false);
      setIsFreeHit(true);
      return;
  
    } 
     if (isWide) {  
      setScore((prevScore) => prevScore + run + 1);
      setExtras((prevExtras) => ({
          ...prevExtras,
          wide: prevExtras.wide + 1,
      }));
      setThisOver((prevOver) => [...prevOver, `WD+${run}`]);

      // ✅ Wide Checkbox automatically uncheck ho jayega
      setIsWide(false);
      return;
  } 

    if (isLegBye) {
    setScore((prevScore) => prevScore + run);
    setExtras((prevExtras) => ({
        ...prevExtras,
        legByes: prevExtras.legByes + run,
    }));
    setThisOver((prevOver) => [...prevOver, `LB+${run}`]);

    setIsLegBye(false);
    return;
}

    if (isBye) {
  
  setScore((prevScore) => prevScore + run);
  setExtras((prevExtras) => ({ ...prevExtras, byes: prevExtras.byes + run }));
  setThisOver((prevOver) => [...prevOver, `B+${run}`]);
  setIsBye(false);
  return;
}
  else {
      // Normal run update
      setScore((prevScore) => prevScore + run);
  
      setBatsman((prevBatsman) => ({
        ...prevBatsman,
        runs: prevBatsman.runs + run,
        balls: prevBatsman.balls + 1,
        fours: run === 4 ? prevBatsman.fours + 1 : prevBatsman.fours,
        sixes: run === 6 ? prevBatsman.sixes + 1 : prevBatsman.sixes,
      }));
  
      setBowler((prevBowler) => ({
        ...prevBowler,
        runs: prevBowler.runs + run,
        balls: prevBowler.balls + 1,
      }));
  
      setBalls((prevBalls) => {
        const newBalls = prevBalls + 1;
        if (newBalls === 6) {
          setOvers((prevOvers) => prevOvers + 1);
          setBowler(bowler.over+1)
          // console.log(bowler.over+1)
          setOverComplete(true);
          setThisOver([]);
          setWaitingForNewBowler(true);
          return 0;
        }
        return newBalls;
      });
  
      setThisOver((prevOver) => [...prevOver, run]);
    }
  

  };
  
  useEffect(() => {
    if (overs === maxOver || wickets === players - 1) {
      if (innings === 1) {
        setfirstInningsRun(score);
        setInnings(2);
        setScore(0);
        setWickets(0);
        setOvers(0);
        setBalls(0);
        setExtras({ noBall: 0, wide: 0, legByes: 0, byes: 0, wickets: 0 });
        setThisOver([]);
        setBatsman({ name: '', runs: 0, balls: 0, fours: 0, sixes: 0 });
        setNonStriker({ name: '', runs: 0, balls: 0, fours: 0, sixes: 0 });
  
        // ✅ Bowler ka naam retain karein, sirf stats reset karein
        setBowler((prevBowler) => ({
          ...prevBowler,  // Naam ko retain karega
          runs: 0, 
          balls: 0, 
          maiden: 0, 
          wickets: 0, 
          over: 0 
        }));
  
        setStartMatch(false);
        // setOverComplete(false);
      } else {
        if (score > firstInningsRun) {
          alert("Second innings team won the match!");
        } else if (score === firstInningsRun) {
          alert("Match Tied!");
        } else {
          alert("First innings team won the match!");
        }
      }
    }
  }, [overs, wickets]);
  
  

  useEffect(() => {
    if (innings === 2 && score > firstInningsRun) {
      alert("Second innings team won the match!");
    }
  }, [score, innings, firstInningsRun]);
  
  const changeBowler = () => {
    if (newBowler.trim() !== '') {
      // Reset the current bowler's stats if needed
      setBowler({ name: newBowler, runs: 0, balls: 0, maiden: 0, wickets: 0 ,over:0});
      setNewBowler('');
      setOverComplete(false); // Reset over complete status
      setWaitingForNewBowler(false); // Reset waiting for new bowler
    } else {
      alert('Please enter a new bowler name');
    }
  };

  
  



  const calculateCRR = () => {
    const totalBalls = overs * 6 + balls;
    return totalBalls > 0 ? (score / (totalBalls / 6)).toFixed(2) : '0.00';
  };

  const handleExtra = ()=>{
    setextraRuns(!extraRuns)
  }

  if (!startMatch) {
    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Select Opening Players</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block mb-2 text-green-600">Striker</label>
          <input 
            type="text" 
            className="w-full p-2 mb-4 border capitalize rounded" 
            placeholder="Player name" 
            value={batsman.name} 
            onChange={(e) => setBatsman({ ...batsman, name: e.target.value })}
          />
          <label className="block mb-2 text-green-600">Non-striker</label>
          <input 
            type="text" 
            className="w-full p-2 mb-4 capitalize border rounded" 
            placeholder="Player name" 
            value={nonStriker.name} 
            onChange={(e) => setNonStriker({ ...nonStriker, name: e.target.value })}
          />
          <label className="block mb-2 text-green-600">Opening bowler</label>
          <input 
            type="text" 
            className="w-full p-2 mb-4 capitalize border rounded" 
            placeholder="Player name" 
            value={bowler.name} 
            onChange={(e) => setBowler({ ...bowler, name: e.target.value })}
          />
          <button 
            className="w-full px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setStartMatch(true)}
          >
            Start Match
          </button>
        </div>
      </div>
    );
  }
  

  // const handleWicketCheckbox = () => {
  //   if (wickets < location.state.playersPerTeam) {
  //     setWickets((prev) => prev + 1);
  //     setBowler((prevBowler) => ({
  //       ...prevBowler,
  //       wickets: prevBowler.wickets + 1,
  //       balls: prevBowler.balls + 1,
  //   }));
  //    setThisOver((prevOver) => [...prevOver, "W"]);
  //     setAddNew(true); // Show UI to select new player
  //   } else {
  //     alert("All 10 wickets have fallen!");
  //   }
  
  //   //  Checkbox ko turant uncheck karne ke liye timeout ka use karein
  //   setIsWicketChecked(true);
  //   setTimeout(() => setIsWicketChecked(false),1000);
  // };
  

  

  const handleConfirmNewPlayer = () => {
    if (wicketType && newPlayer) {
      setBatsman({ name: newPlayer, runs: 0, balls: 0, fours: 0, sixes: 0 }); // New player as striker
      setNewPlayer('');
      setWicketType('');
      setAddNew(false); // Hide form
    } else {
      alert('Please select dismissal type and enter new player name!');
    }
  };

 
  

  if (addNew) {
    return (
      <div className="p-4 bg-gray-100 h-screen">
        <h1 className="text-2xl mb-4 text-green-600">Fall of Wicket</h1>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <label className="block mb-2 text-green-600">How did the wicket fall?</label>
          <select
            className="w-full p-2 mb-4 border rounded"
            value={wicketType}
            onChange={(e) => setWicketType(e.target.value)}
          >
            <option value="">Select dismissal type</option>
            {wicketOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>

          <label className="block mb-2 text-green-600">New Player Name</label>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter new player name"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
          />

          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleConfirmNewPlayer}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <li className="text-md list-none mb-4">{location.state.tossWinner} have won the toss and have opted to {location.state.tossDecision}</li>
        <div className='flex flex-wrap justify-between'>
          <h1 className="text-2xl mb-4">{location.state.teamA} v/s {location.state.teamB}</h1>
          <h2 className="text-xl font-bold">{innings === 1 ? "First Innings" : "Second Innings"}</h2>

        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <div className="flex justify-between">
            {/* <span className="text-2xl capitalize"> {(location.state?.firstBatting || "").substring(0, 3)}  {score} - {wickets} ({overs}.{balls})</span> */}
            <span className="text-2xl capitalize">  {innings === 1 ? (location.state.firstBatting || "").substring(0, 3) : 
  (location.state.firstBatting.substring(0, 3) === location.state.teamA.substring(0, 3) ? location.state.teamB.substring(0, 3) : location.state.teamA.substring(0, 3))}  
  {score} - {wickets} ({overs}.{balls})
</span>

            <span>CRR: {calculateCRR()}</span>
            
          </div>
          <div className='flex justify-between'>
            <span className='text-lg'> Total Run  {firstInningsRun}</span> 
            <span className='text-lg'>ExtraRun: {exrtaRunsTotal}</span>
          </div>
        </div>
        <div className="mt-4">
          {overComplete && (
            <div>
              <input 
                type="text" 
                className="p-2 border rounded w-full" 
                placeholder="Enter new bowler name" 
                value={newBowler} 
                onChange={(e) => setNewBowler(e.target.value)} 
              />
              <button 
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                onClick={changeBowler}
              >
                Change Bowler
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-6 gap-4 border-b-2 border-[#8f8f8f] pb-4">
            <span>Batter</span><span>R</span><span>B</span><span>4s</span><span>6s</span><span>SR</span>
            <span className=' capitalize'>{(batsman.name).substring(0, 7)}</span><span>{batsman.runs}</span><span>{batsman.balls}</span><span>{batsman.fours}</span><span>{batsman.sixes}</span><span>{calculateStrikeRate(batsman.runs, batsman.balls)}</span>
            <span className='capitalize'>{(nonStriker.name).substring(0, 7)}</span><span>{nonStriker.runs}</span><span>{nonStriker.balls}</span><span>{nonStriker.fours}</span><span>{nonStriker.sixes}</span><span>{calculateStrikeRate(nonStriker.runs, nonStriker.balls)}</span>
          </div>
          <div className="grid grid-cols-6 gap-2 mt-3 border-b-2 pb-2 border-[#8f8f8f]">
            <span >Bowler</span><span>M</span><span>O</span><span>R</span><span>W</span><span>ER</span>
            <span className='capitalize'>{(bowler.name|| "").substring(0, 7)}</span><span>{bowler.maiden}</span><span>{bowler.over}</span><span>{bowler.runs}</span><span>{bowler.wickets}</span><span>{(bowler.runs / (bowler.balls / 6)).toFixed(2)}</span>
          </div>

          <div className="mt-4">
            <h2 className="text-lg mb-2">This Over: &nbsp;
              <span className='flex flex-wrap gap-3 mt-1'>
                {thisOver.map((run, index) => (
                  <span 
                    key={index} 
                    className={`rounded-full py-1 px-3 text-center ${
                      run === 'W' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
                  >
                    {run}
                  </span>
                ))}
              </span>
            </h2>
          </div>
        </div>

        <div className="p-4 bg-white shadow-lg rounded-lg flex flex-wrap justify-between items-center gap-4 mt-2 border-2 border-[#e1e0e0]">
          <div className="grid grid-cols-3 gap-4">
            <div className='flex gap-2 justify-center items-center '>
            <input type="checkbox" className="w-4 h-5  " name="" id="wide"  checked={isWide}  onChange={(e) => setIsWide(e.target.checked)} />
            <label htmlFor="wide" className='text-lg'>Wide</label>
            </div>
            <div className='flex gap-2 justify-center items-center '>
            <input type="checkbox" className="w-4 h-5  " name="" id="no" checked={isNoBall} onChange={(e) => setIsNoBall(e.target.checked)} />
            <label htmlFor="no" className='text-lg'>No Ball</label>
            </div>
            <div className='flex gap-2 justify-center items-center '>
            <input type="checkbox" className="w-4 h-5  " name="" id="leg"  checked={isLegBye} onChange={(e) => setIsLegBye(e.target.checked)} />
            <label htmlFor="leg" className='text-lg'>Leg Byes</label>
            </div>
            <div className='flex gap-2 justify-center items-center '>
            <input type="checkbox" className="w-4 h-5  " name="" id="byes" checked={isBye}  onChange={(e) => setIsBye(e.target.checked)} />
            <label htmlFor="byes" className='text-lg'>Byes</label>
            </div>
            <div className='flex gap-2 justify-center items-center '>
            <input type="checkbox" className="w-4 h-5 "  checked={isWicket} onChange={(e) => setIsWicket(e.target.checked)}  name="" id="wicket" />
            <label htmlFor="wicket" className='text-lg'>Wicket</label>
            </div>
            <div className='flex gap-2 justify-center items-center'>
                <input type="checkbox" className="w-4 h-5" checked={isFreeHit} disabled />
                <label className='text-lg'>Free Hit</label>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Retire</button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Swap Batsman</button>
          </div>
        </div>

        <div className='flex justify-around relative'>
          <div className="mt-4 flex flex-col gap-2 flex-wrap">
            <button className="px-4 py-2 bg-green-500 text-white rounded">Undo</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Partnerships</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={handleExtra} >Extra</button>
            { extraRuns &&
              <div className='bg-green-500 absolute xl:left-[500px] lg:left-[350px] md:left-[300px] sm:left-[230px] left-[200px]  h-34 w-46  rounded-md'>
                <button className=' absolute right-2 top-1  rounded-full ' onClick={handleExtra}><IoCloseCircleOutline color='white' size={28}/></button>
                <ul className='flex flex-col gap-1'>
                <li li className='text-lg text-white mt-2 ml-3'>Wide:- {extras.wide}</li>
                <li className='text-lg text-white  ml-3'>No Ball:- {extras.noBall}</li>
                <li className='text-lg text-white  ml-3'>LegByes:- {extras.legByes}</li>
                <li className='text-lg text-white  ml-3'>Byes:- {extras.byes}</li>
                </ul>
              </div>
            }
          </div>

          <div>
            <div className='mt-4 flex flex-wrap gap-2'>
              
                <button  className="bg-green-500 py-3 px-5 text-white rounded-full" onClick={()=>handleRun(0)} >0</button>
                <button  className="bg-green-500 py-3 px-5 text-white rounded-full" onClick={()=>handleRun(1)} >1</button>
                <button  className="bg-green-500 py-3 px-5 text-white rounded-full" onClick={()=>handleRun(2)}>2</button>
                <button  className="bg-green-500 py-3 px-5 text-white rounded-full"onClick={()=>handleRun(3)} >3</button>
             
            </div>

            <div className='mt-4 flex flex-wrap gap-2'>
              
                <button  className="bg-green-500 py-3 px-5 text-white rounded-full" onClick={() => handleRun(4)}> 4</button>
                <button  className="bg-green-500 py-3 px-5 text-white rounded-full" onClick={() => handleRun(5)}> 5</button>
                <button  className="bg-green-500 py-3 px-5 text-white rounded-full" onClick={() => handleRun(6)}> 6</button>
            
              <button className="bg-green-500 py-3 px-5 text-white rounded-full">...</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




