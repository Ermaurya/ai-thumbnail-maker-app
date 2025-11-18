
import React from 'react';
import { ImagePlaceholderIcon } from './icons/ImagePlaceholderIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ThumbnailDisplayProps {
    isLoading: boolean;
    generatedThumbnail: string | null;
    error: string | null;
    loadingMessage: string;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

export const ThumbnailDisplay: React.FC<ThumbnailDisplayProps> = ({
    isLoading,
    generatedThumbnail,
    error,
    loadingMessage
}) => {
    const downloadUrl = generatedThumbnail ? `data:image/png;base64,${generatedThumbnail}` : '#';

    return (
        <div className="space-y-4">
            <div className="relative w-full aspect-[16/9] bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700 flex items-center justify-center overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 z-10 animate-fade-in">
                         <LoadingSpinner />
                         <p className="mt-4 text-center text-gray-300 animate-pulse-fast">{loadingMessage}</p>
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-400 p-4">
                        <p className="font-semibold">An Error Occurred</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                {!isLoading && !error && !generatedThumbnail && (
                    <div className="text-center text-gray-500">
                        <ImagePlaceholderIcon />
                        <p className="mt-2">Your generated thumbnail will appear here</p>
                    </div>
                )}
                {generatedThumbnail && (
                    <img
                        src={downloadUrl}
                        alt="Generated YouTube Thumbnail"
                        className="w-full h-full object-cover animate-fade-in"
                    />
                )}
            </div>
            {generatedThumbnail && !isLoading && (
                 <a
                    href={downloadUrl}
                    download="ai-thumbnail.png"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center animate-fade-in"
                 >
                    <DownloadIcon />
                    <span className="ml-2">Download Thumbnail</span>
                </a>
            )}
        </div>
    );
};
