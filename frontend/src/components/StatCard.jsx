import "./StatCard.css";

function StatCard({ title, value, icon, color }) {
    return (
        <div
            className="stat-card"
            style={{
                background: color,
            }}
        >
            <div>

                <h6>{title}</h6>

                <h2>{value}</h2>

            </div>

            <div className="stat-icon">

                {icon}

            </div>

        </div>
    );
}

export default StatCard;