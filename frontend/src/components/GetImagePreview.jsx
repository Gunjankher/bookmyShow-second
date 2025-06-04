import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

function GetImagePreview({
    name,
    control,
    label,
    defaultValue = "",
    className,
    cameraIcon = false,
    cameraSize = 20,
    image
}) {
    const [preview, setPreview] = useState(null);

    const handlePreview = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
    
        const file = files[0];
        if (!(file instanceof Blob)) return;
    
        setPreview(URL.createObjectURL(file));
        return files;
    };
    
    return (
        <>
            <div className="w-full">
                <label
                    htmlFor={name}
                    className="cursor-pointer relative flex flex-col justify-center items-start"
                >
                    {label && (
                        <label className="inline-block mb-2 pl-1">
                            {label}
                        </label>
                    )}
                    {/* <div className="relative flex justify-center items-center"> */}
                    <img
                        src={preview || image}
                        className={className}
                    />
                    {cameraIcon && (
                        <FaCamera
                            size={cameraSize}
                            className="hover:text-pink-500 absolute inline-flex justify-center items-center w-full text-black"
                        />
                    )}
                    {/* </div> */}
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={defaultValue || ""}
                        render={({ field: { onChange } }) => (
                            <input
                                id={name}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    onChange(e.target.files)
                                    onChange(handlePreview(e));
                                }}
                            />
                        )}
                        rules={{ required: `${name} is required` }}
                    />
                </label>
            </div>
        </>
    );
}

export default GetImagePreview;