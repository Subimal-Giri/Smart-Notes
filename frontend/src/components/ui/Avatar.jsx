import { getInitials } from "../../utils/textHelper.js";

function Avatar({ name, size = 'md' }) {
    return (
        <div className={`avatar avatar--${size}`}>{getInitials(name)}</div>
    );
}

export default Avatar;
