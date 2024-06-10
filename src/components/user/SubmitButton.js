import PropTypes from "prop-types";
import { useFormStatus } from "react-dom";

export function SubmitButton({ title, size, icon }) {
    const { pending } = useFormStatus();

    return (
        <>
            <button
                type="submit"
                className={` "flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                ${size === "fit" ? "w-fit" : "w-full"}
                `}
                disabled={pending}
            >
                <div
                    className={`flex justify-center gap-x-2 ${pending === true ? "hidden" : ""}`}
                >
                    <p
                        className={` ${pending === true ? "hidden" : ""} `}
                    >
                        {title}
                    </p>
                    <div className={` ${icon === undefined ? "hidden" : ""} `}>
                        {icon}
                    </div>
                </div>
                <div className={` ${pending === true ? "flex justify-center items-center" : "hidden"}  `}>
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white">
                    </div>
                </div>
            </button>
        </>
    );
}

SubmitButton.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    icon: PropTypes.reactNode
};