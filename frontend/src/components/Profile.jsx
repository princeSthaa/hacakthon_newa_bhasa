export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col gap-6">

      {/* ─── TOP PROFILE CARD ─── */}
      <div className="bg-gradient-to-r from-[#7A0000] to-[#3D0000] rounded-2xl p-6 flex items-center gap-5 text-white shadow-md">

        {/* avatar */}
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
          {user.name?.charAt(0)}
        </div>

        {/* user info */}
        <div>
          <h2 className="text-xl font-extrabold">{user.name}</h2>
          <p className="text-white/70 text-sm">{user.email}</p>
        </div>
      </div>

      {/* ─── STATS ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl p-5 border border-[#F0E0D0] shadow-sm">
          <p className="text-2xl font-extrabold text-[#1A0A0A]">{localStorage.getItem("xp")}</p>
          <p className="text-xs text-gray-500 uppercase">Total XP</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#F0E0D0] shadow-sm">
          <p className="text-2xl font-extrabold text-[#1A0A0A]">14 🔥</p>
          <p className="text-xs text-gray-500 uppercase">Day Streak</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#F0E0D0] shadow-sm">
          <p className="text-2xl font-extrabold text-[#1A0A0A]">#3 🏆</p>
          <p className="text-xs text-gray-500 uppercase">Rank</p>
        </div>

      </div>

      {/* ─── ACCOUNT DETAILS ─── */}
      <div className="bg-white rounded-2xl p-6 border border-[#F0E0D0] shadow-sm flex flex-col gap-4">

        <h3 className="font-bold text-[#1A0A0A] text-sm">Account Information</h3>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Full Name</span>
            <span className="font-medium text-[#1A0A0A]">{user.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-[#1A0A0A]">{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Member Since</span>
            <span className="font-medium text-[#1A0A0A]">2024</span>
          </div>
        </div>

      </div>

      {/* ─── ACTIONS ─── */}
      <div className="flex gap-3 flex-wrap">

        <button className="px-5 py-2.5 rounded-xl bg-[#7A0000] text-white text-sm font-semibold
                           hover:bg-[#9B0000] active:scale-95 transition-all shadow-md">
          Edit Profile
        </button>

        <button className="px-5 py-2.5 rounded-xl border border-[#E8D5CC] text-sm font-semibold text-[#1A0A0A]
                           hover:bg-[#F7F0E8] transition-all">
          Change Password
        </button>

      </div>

    </div>
  );
}