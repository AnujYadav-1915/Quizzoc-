"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Timer, Star, AlertCircle, Lightbulb, Image as ImageIcon, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";

const SOLO_QUESTIONS = [
  {
    id: 1,
    category: "Science",
    question: "What is the primary gas found in the Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 2,
    hint: "It makes up about 78% of the air we breathe.",
    imageUrl: null,
  },
  {
    id: 2,
    category: "Geography",
    question: "Which of these planets is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Saturn", "Mars"],
    correctAnswer: 3,
    hint: "Elon Musk really wants to go there.",
    imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Pop Culture",
    question: "Who directed the movie 'Inception'?",
    options: ["Steven Spielberg", "Christopher Nolan", "Quentin Tarantino", "Martin Scorsese"],
    correctAnswer: 1,
    hint: "He also directed Interstellar and The Dark Knight.",
    imageUrl: null,
  },
  {
    id: 4,
    category: "History",
    question: "In what year did the Titanic sink?",
    options: ["1905", "1912", "1918", "1923"],
    correctAnswer: 1,
    hint: "It was before World War I began.",
    imageUrl: "https://images.unsplash.com/photo-1542385262-cdf06b2f4f21?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Technology",
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "Hyperlink Transfer Technology",
      "HyperText Transmission Process",
      "Hyperlink Text Transfer"
    ],
    correctAnswer: 0,
    hint: "It is the foundation of data communication for the World Wide Web.",
    imageUrl: null,
  }
];

export default function SoloMode() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  // Lifelines
  const [hintUsed, setHintUsed] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);

  const question = SOLO_QUESTIONS[currentQ];

  useEffect(() => {
    if (gameOver || isAnswering) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQ, isAnswering, gameOver]);

  const handleTimeOut = () => {
    setIsAnswering(true);
    setSelectedOption(-1); // -1 means timeout
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswer = (index: number) => {
    if (isAnswering) return;
    setIsAnswering(true);
    setSelectedOption(index);

    if (index === question.correctAnswer) {
      setScore((prev) => prev + (timeLeft * 10) + 100); // Speed bonus
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQ < SOLO_QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
      setTimeLeft(15);
      setSelectedOption(null);
      setIsAnswering(false);
      setHintUsed(false);
      setEliminatedOptions([]);
    } else {
      setGameOver(true);
    }
  };

  const useHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      setScore(prev => Math.max(0, prev - 50)); // Cost 50 points
    }
  };

  const useFiftyFifty = () => {
    if (!fiftyFiftyUsed) {
      setFiftyFiftyUsed(true);
      const wrongOptions = [0, 1, 2, 3].filter(idx => idx !== question.correctAnswer);
      // Eliminate 2 random wrong options
      const shuffled = wrongOptions.sort(() => 0.5 - Math.random());
      setEliminatedOptions([shuffled[0], shuffled[1]]);
    }
  };

  // Utility to handle classNames easily without importing clsx everywhere
  const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

  if (gameOver) {
    return (
      <div className="min-h-screen bg-[#0a0514] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-12 rounded-3xl max-w-md w-full text-center border-emerald-500/30 relative"
        >
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          <h1 className="text-4xl font-bold text-white mb-2">Solo Completed!</h1>
          <p className="text-slate-400 mb-8">You survived the Arena.</p>
          
          <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
            <p className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-1">Final Score</p>
            <p className="text-5xl font-bold text-emerald-400 font-mono">{score}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors"
            >
              Play Again
            </button>
            <button 
              onClick={() => router.push("/")}
              className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-900/20 rounded-full blur-[120px] -z-10" />
      
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <div className="glass-panel px-6 py-3 rounded-2xl border-white/10 flex items-center gap-3">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-bold font-mono">{score}</span>
        </div>

        <div className="text-sm font-bold text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          Question {currentQ + 1} / {SOLO_QUESTIONS.length}
        </div>

        <div className={cn(
          "glass-panel px-6 py-3 rounded-2xl border-white/10 flex items-center gap-3 transition-colors",
          timeLeft <= 5 ? "bg-red-500/20 border-red-500/50 text-red-400" : "text-brand-300"
        )}>
          <Timer className="w-5 h-5" />
          <span className="text-xl font-bold font-mono">{timeLeft}s</span>
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-6">
        {/* Main Question Area */}
        <div className="flex-1 flex flex-col gap-6">
          <motion.div 
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 md:p-12 rounded-3xl border-brand-500/20 flex-1 flex flex-col justify-center relative overflow-hidden"
          >
            <span className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              {question.category}
            </span>
            
            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-8">
              {question.question}
            </h2>

            {question.imageUrl && (
              <div className="w-full h-64 rounded-2xl overflow-hidden mb-8 relative border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={question.imageUrl} alt="Question Context" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
              {question.options.map((opt, idx) => {
                const isEliminated = eliminatedOptions.includes(idx);
                const isSelected = selectedOption === idx;
                const isCorrect = idx === question.correctAnswer;
                
                let btnStyle = "bg-white/5 border-white/10 hover:bg-white/10";
                
                if (isAnswering) {
                  if (isCorrect) btnStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
                  else if (isSelected) btnStyle = "bg-red-500/20 border-red-500/50 text-red-400";
                  else btnStyle = "opacity-50 border-white/5";
                }

                if (isEliminated) {
                  return <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/5 opacity-20 text-transparent">Hidden</div>;
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!isAnswering ? { scale: 1.02 } : {}}
                    whileTap={!isAnswering ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(idx)}
                    disabled={isAnswering}
                    className={cn(
                      "p-4 rounded-xl border text-left font-medium transition-all duration-300 relative overflow-hidden",
                      btnStyle
                    )}
                  >
                    {isAnswering && isCorrect && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />}
                    {isAnswering && isSelected && !isCorrect && <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />}
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Lifelines Sidebar */}
        <div className="w-full lg:w-72 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl border-white/10">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Lifelines</h3>
            
            <button 
              onClick={useFiftyFifty}
              disabled={fiftyFiftyUsed || isAnswering}
              className={cn(
                "w-full p-4 rounded-xl border flex items-center gap-3 mb-3 transition-colors",
                fiftyFiftyUsed ? "opacity-50 border-white/5 bg-white/5 cursor-not-allowed" : "border-brand-500/30 bg-brand-500/10 hover:bg-brand-500/20"
              )}
            >
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                <span className="font-bold text-brand-300">50</span>
              </div>
              <div className="text-left">
                <p className="font-bold">50 / 50</p>
                <p className="text-xs text-slate-400">Remove 2 options</p>
              </div>
            </button>

            <button 
              onClick={useHint}
              disabled={hintUsed || isAnswering}
              className={cn(
                "w-full p-4 rounded-xl border flex items-center gap-3 transition-colors",
                hintUsed ? "opacity-50 border-white/5 bg-white/5 cursor-not-allowed" : "border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20"
              )}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="font-bold">Hint</p>
                <p className="text-xs text-slate-400">-50 Points</p>
              </div>
            </button>
          </div>

          <AnimatePresence>
            {hintUsed && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel p-6 rounded-3xl border-amber-500/30 bg-amber-500/5 relative overflow-hidden"
              >
                <Lightbulb className="absolute -top-4 -right-4 w-24 h-24 text-amber-500/10" />
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Hint Revealed
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                  {question.hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
