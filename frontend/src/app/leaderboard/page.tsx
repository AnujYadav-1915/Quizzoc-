"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Flame, Crown } from "lucide-react";

const MOCK_LEADERBOARD = [
  { id: 1, username: "ProGamer99", score: 15420, elo: 2450, rank: 1, isMe: false },
  { id: 2, username: "TriviaMaster", score: 14200, elo: 2310, rank: 2, isMe: false },
  { id: 3, username: "QuizKing", score: 13800, elo: 2200, rank: 3, isMe: false },
  { id: 4, username: "AnujYadav", score: 12500, elo: 2150, rank: 4, isMe: true },
  { id: 5, username: "AshishSingh", score: 12100, elo: 2100, rank: 5, isMe: false },
  { id: 6, username: "Brainiac22", score: 11000, elo: 1950, rank: 6, isMe: false },
  { id: 7, username: "SmartyPants", score: 10500, elo: 1900, rank: 7, isMe: false },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-600/10 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-12">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Global <span className="text-yellow-400">Leaderboard</span></h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The top 1% of the trivia arena. Compete in multiplayer battles to climb the ranks.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 md:gap-8 mb-16 h-64">
          {[MOCK_LEADERBOARD[1], MOCK_LEADERBOARD[0], MOCK_LEADERBOARD[2]].map((user, idx) => {
            const isFirst = idx === 1;
            const isSecond = idx === 0;
            const height = isFirst ? "h-52" : isSecond ? "h-40" : "h-32";
            const color = isFirst ? "from-yellow-400 to-amber-600" : isSecond ? "from-slate-300 to-slate-500" : "from-amber-700 to-orange-900";
            const glow = isFirst ? "shadow-[0_0_30px_rgba(250,204,21,0.3)]" : "";

            return (
              <motion.div 
                key={user.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center relative"
              >
                {isFirst && <Crown className="w-8 h-8 text-yellow-400 mb-2 absolute -top-10" />}
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 mb-4 flex items-center justify-center backdrop-blur-md ${glow}`}>
                  <span className="text-2xl font-bold">{user.username.charAt(0)}</span>
                </div>
                <div className={`w-24 md:w-32 ${height} rounded-t-xl bg-gradient-to-b ${color} flex flex-col items-center justify-start pt-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="text-3xl font-bold text-white relative z-10">{user.rank}</span>
                  <span className="text-white/80 font-medium mt-1 relative z-10">{user.elo} ELO</span>
                </div>
                <p className="mt-4 font-bold text-sm md:text-base">{user.username}</p>
              </motion.div>
            )
          })}
        </div>

        {/* List */}
        <div className="glass-panel rounded-3xl border-white/10 overflow-hidden bg-black/20 backdrop-blur-xl">
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-6">Player</div>
            <div className="col-span-2 text-right">XP Score</div>
            <div className="col-span-2 text-right">ELO</div>
          </div>

          <div className="flex flex-col">
            {MOCK_LEADERBOARD.map((user, idx) => (
              <motion.div 
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`grid grid-cols-12 gap-4 p-6 items-center border-b border-white/5 transition-colors hover:bg-white/5 ${user.isMe ? 'bg-brand-500/10 border-brand-500/30' : ''}`}
              >
                <div className="col-span-2 text-center font-mono text-xl font-bold text-slate-500">
                  #{user.rank}
                </div>
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold">
                    {user.username.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-base flex items-center gap-2">
                      {user.username}
                      {user.isMe && <span className="text-[10px] uppercase bg-brand-500 text-white px-2 py-0.5 rounded-full">You</span>}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 text-right font-mono text-emerald-400 font-bold">
                  {user.score.toLocaleString()}
                </div>
                <div className="col-span-2 text-right font-mono text-yellow-400 font-bold flex items-center justify-end gap-1">
                  <Flame className="w-4 h-4" />
                  {user.elo}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
