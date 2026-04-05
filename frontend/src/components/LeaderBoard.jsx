export default function LeaderBoard() {

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // mock data (you can later fetch from backend)
  let leaders = [
    { rank: 1, name: "Bijay Maharjan", xp: 3200 },
    { rank: 2, name: "Samira Tuladhar", xp: 2780 },
    { rank: 3, name: "Aarati Shrestha", xp: 1240 }, // will be replaced
    { rank: 4, name: "Roshan Shakya", xp: 0 },
    { rank: 5, name: "Lata Manandhar", xp: 0 },
  ];

  // 🔥 replace Aarati with logged-in user
  leaders = leaders.map((user) => {
    if (user.rank === 3) {
      return {
        ...user,
        name: currentUser?.name || "You",
        isYou: true,
      };
    }
    return user;
  });

  const medal = { 1: "🥇", 2: "🥈", 3: "🥉" };

  return (
    <div className="flex flex-col gap-6">

      {/* header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#1A0A0A]">
          Leaderboard
        </h2>
        <p className="text-gray-500 text-sm">
          See how you rank among learners
        </p>
      </div>

      {/* top 3 */}
      <div className="grid grid-cols-3 gap-4">
        {leaders.slice(0, 3).map((user, i) => (
          <div
            key={user.rank}
            className={`rounded-2xl p-4 text-center shadow-sm border
              ${i === 0
                ? "bg-[#FFF7E0] border-[#F5D97A]"
                : "bg-white border-[#F0E0D0]"
              }`}
          >
            <div className="text-2xl mb-1">{medal[user.rank]}</div>

            <div className="w-12 h-12 mx-auto rounded-xl bg-[#7A000015] flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0)}
            </div>

            <p className="text-sm font-semibold mt-2 text-[#1A0A0A]">
              {user.name} {user.isYou && <span className="text-xs text-gray-400">(You)</span>}
            </p>

            <p className="text-xs text-gray-500">
              {user.isYou ? localStorage.getItem("xp") : user.xp.toLocaleString()} XP
            </p>
          </div>
        ))}
      </div>

      {/* full list */}
      <div className="flex flex-col gap-3">
        {leaders.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl border
              ${user.isYou
                ? "bg-[#7A000010] border-[#7A000030]"
                : "bg-white border-[#F0E0D0]"
              }`}
          >
            {/* rank */}
            <span className="w-8 text-center text-lg">
              {medal[user.rank] ?? user.rank}
            </span>

            {/* avatar */}
            <div className="w-10 h-10 rounded-xl bg-[#7A000015] flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>

            {/* name */}
            <p className={`flex-1 text-sm font-semibold
              ${user.isYou ? "text-[#7A0000]" : "text-[#1A0A0A]"}`}
            >
              {user.name}
              {user.isYou && (
                <span className="text-xs text-gray-400 ml-1">
                  (You)
                </span>
              )}
            </p>

            {/* xp */}
            <span className="text-sm font-bold text-gray-500">
              {user.isYou ? localStorage.getItem("xp") : user.xp.toLocaleString()} XP
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}