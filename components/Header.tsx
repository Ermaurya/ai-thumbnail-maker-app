
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    AI Thumbnail Maker
                </span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
                Generate professional, scroll-stopping YouTube thumbnails in seconds.
            </p>
        </header>
    );
};
