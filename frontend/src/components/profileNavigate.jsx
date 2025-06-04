import React from "react";
import { NavLink } from "react-router-dom";

function ProfileNavigate({ edit }) {
    if (!edit) return null;

    return (
        <section className="text-black text-center w-full flex justify-evenly items-center border-b-2 border-slate-600 text-xs sm:text-base sm:mt-4 md:mt-0 mt-2">
            <NavLink
                to={`/edit/personalInfo`}
                className={({ isActive }) =>
                    isActive
                        ? "bg-white text-purple-600 border-b-2 border-purple-600"
                        : ""
                }
            >
                <p className="p-2">Personal Information</p>
            </NavLink>
            <NavLink
                to={`/edit/password`}
                className={({ isActive }) =>
                    isActive
                        ? "bg-white text-purple-600 border-b-2 border-purple-600"
                        : ""
                }
            >
                <p className="p-2">Change Password</p>
            </NavLink>
        </section>
    );
}

export default ProfileNavigate;
