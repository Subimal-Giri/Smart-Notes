function Spinner({ size = 'md', center = false }) {
    const el = <div className={`spinner spinner--${size}`} />;

    return center ? <div className="spinner-center full-h">{el}</div> : el;
}

export default Spinner;
