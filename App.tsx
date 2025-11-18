
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ThumbnailDisplay } from './components/ThumbnailDisplay';
import { generateThumbnail } from './services/geminiService';
import type { ImageData } from './types';

const loadingMessages = [
    "Warming up the AI's creative circuits...",
    "Designing a scroll-stopping masterpiece...",
    "Optimizing for maximum clicks...",
    "Adding a touch of viral magic...",
    "Finalizing the pixels...",
];

export default function App() {
    const [videoTitle, setVideoTitle] = useState<string>('');
    const [headshot, setHeadshot] = useState<ImageData | null>(null);
    const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentLoadingMessage, setCurrentLoadingMessage] = useState<string>(loadingMessages[0]);

    useEffect(() => {
        let interval: number;
        if (isLoading) {
            setCurrentLoadingMessage(loadingMessages[0]);
            interval = window.setInterval(() => {
                setCurrentLoadingMessage(prev => {
                    const currentIndex = loadingMessages.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % loadingMessages.length;
                    return loadingMessages[nextIndex];
                });
            }, 2500);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isLoading]);

    const handleImageChange = (file: File) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const previewUrl = reader.result as string;
                const base64 = previewUrl.split(',')[1];
                setHeadshot({
                    base64,
                    mimeType: file.type,
                    previewUrl,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = useCallback(async () => {
        if (!videoTitle || !headshot) {
            setError('Please provide both a video title and a headshot.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedThumbnail(null);

        try {
            const thumbnailBase64 = await generateThumbnail(videoTitle, headshot.base64, headshot.mimeType);
            setGeneratedThumbnail(thumbnailBase64);
        } catch (err) {
            console.error(err);
            setError('Failed to generate thumbnail. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    }, [videoTitle, headshot]);

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-white">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <Header />
                <main className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="animate-fade-in">
                        <InputForm
                            videoTitle={videoTitle}
                            onTitleChange={setVideoTitle}
                            headshot={headshot}
                            onImageChange={handleImageChange}
                            onSubmit={handleGenerate}
                            isLoading={isLoading}
                        />
                    </div>
                     <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <ThumbnailDisplay
                            isLoading={isLoading}
                            generatedThumbnail={generatedThumbnail}
                            error={error}
                            loadingMessage={currentLoadingMessage}
                        />
                    </div>
                </main>
                 <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Powered by Gemini API. Designed for content creators.</p>
                </footer>
            </div>
        </div>
    );
}
