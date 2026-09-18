import { useNavigate } from "react-router-dom";

function StatCard({ icon, label, value, to, bg, color }) {
    const navigate = useNavigate();

    return (
        <div className="stat-card" onClick={() => to && navigate(to)}>
            <div className="stat-card__icon" style={{ background: bg, color }}>
                <i className={`fa-solid ${icon}`} />
            </div>
            <div>
                <div className="stat-card__value">{value}</div>
                <div className="stat-card__label">{label}</div>
            </div>
        </div>
    );
}

export default StatCard;

