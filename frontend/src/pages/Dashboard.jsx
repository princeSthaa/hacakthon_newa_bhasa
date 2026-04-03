function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Welcome, {user?.name}</h3>
        </div>
    );
}

export default Dashboard;