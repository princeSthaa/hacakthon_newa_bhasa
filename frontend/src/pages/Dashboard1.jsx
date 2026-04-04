import React, { useEffect, useState } from "react";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/data/api/v0/food/1/json.json")
            .then((res) => res.json())
            .then((result) => {
                setData(result);
            })
            .catch((err) => console.error("Error fetching:", err));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Welcome, {user?.name}</h3>

            <h4>Food Data:</h4>
            {data.map((item) => (
                <div key={item.id}>
                    <p>English: {item.english}</p>
                    <p>Newari: {item.newari}</p>
                    <p>Category: {item.category}</p>
                    <p>Level: {item.level}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Dashboard;