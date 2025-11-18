
import React from 'react';
import type { ImageData } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface InputFormProps {
    videoTitle: string;
    onTitleChange: (title: string) => void;
    headshot: ImageData | null;
    onImageChange: (file: File) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
    videoTitle,
    onTitleChange,
    headshot,
    onImageChange,
    onSubmit,
    isLoading,
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageChange(e.target.files[0]);
        }
    };

    const isFormValid = videoTitle.trim() !== '' && headshot !== null;

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700 space-y-6">
            <div>
                <label htmlFor="video-title" className="block text-sm font-medium text-gray-300 mb-2">
                    1. Video Title
                </label>
                <input
                    type="text"
                    id="video-title"
                    value={videoTitle}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="e.g., My Insane Trip to Japan"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    disabled={isLoading}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    2. Your Headshot
                </label>
                <div className="flex items-center space-x-4">
                    <label htmlFor="headshot-upload" className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors">
                        <UploadIcon />
                        <span className="ml-2">Choose Image</span>
                    </label>
                    <input
                        id="headshot-upload"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isLoading}
                    />
                    {headshot && (
                         <div className="flex items-center space-x-3">
                            <img src={headshot.previewUrl} alt="Preview" className="w-12 h-12 rounded-full object-cover border-2 border-blue-400" />
                            <span className="text-sm text-gray-400">Image selected.</span>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={onSubmit}
                disabled={!isFormValid || isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isLoading ? 'Generating...' : '✨ Generate Thumbnail'}
            </button>
        </div>
    );
};
