import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditAvatar from "./EditAvatar";
import Button from "./Button";

function ProfileHeader({
    coverImage,
    avatar,
    username,
    fullName,
}) {
    const userId = useSelector((state) => state.auth?.userData?._id);
    const profileId = useSelector((state) => state.user?.profileData?._id);

    const isOwnChannel = userId === profileId;

    return (
        <div className="w-full text-black">
            {/* Cover image section */}
            <section className="w-full">
                {coverImage ? (
                    <div className="relative">
                        <img
                            src={coverImage}
                            className="sm:h-40 h-28 w-full object-cover"
                            alt="Cover"
                        />
                    </div>
                ) : (
                    <div className="sm:h-40 h-28 w-full border-slate-600 border-b bg-black"></div>
                )}
            </section>

            {/* Channel info section */}
            <section className="w-full sm:px-5 p-2 flex sm:flex-row flex-col items-start sm:gap-4">
                <div className="h-12">
                    <div className="relative sm:w-32 w-28 sm:h-32 h-28">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="rounded-full sm:w-32 w-28 sm:h-32 h-28 object-cover absolute sm:bottom-10 bottom-20"
                        />
                    </div>
                </div>

                <div className="w-full md:h-24 sm:h-20 flex justify-between items-start px-1">
                    <div>
                        <h1 className="text-xl font-bold">{fullName}</h1>
                        <h3 className="text-sm text-slate-400">@{username}</h3>
                    </div>

                    {isOwnChannel && (
                        <Link to="/edit">
                            <Button className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500">
                                Edit
                            </Button>
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ProfileHeader;
