'use client';

import React, { useEffect, useState } from 'react';
import { useBackgroundTheme } from './background-theme-provider';

export function DynamicBackground() {
    const { theme } = useBackgroundTheme();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || theme === 'none') {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
            {theme === 'neural' && (
                <div className="neural-network-nexus">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="node" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 5}s`,
                        }} />
                    ))}
                    <svg className="connections" width="100%" height="100%">
                        {/* Lines can be pre-rendered or generated, for simplicity we'll use CSS gradients for a line effect */}
                    </svg>
                </div>
            )}
            {theme === 'matrix' && (
                <div className="quantum-matrix-rain">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="rain-drop" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}>
                            {Array.from({length: Math.floor(10 + Math.random() * 20)}, () => "¦").join('')}
                        </div>
                    ))}
                </div>
            )}
            {theme === 'circuit' && (
                <div className="circuit-board-topography">
                    {[...Array(30)].map((_, i) => (
                        <div key={i} className="trace" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${50 + Math.random() * 150}px`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                            animationDelay: `${Math.random() * 5}s`,
                        }} />
                    ))}
                </div>
            )}
            {theme === 'datacenter' && (
                <div className="datacenter-labyrinth">
                    <div className="isometric-grid">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="server-rack" style={{
                                top: `${10 + Math.random() * 80}%`,
                                left: `${10 + Math.random() * 80}%`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}>
                                <div className="led"></div>
                                <div className="led" style={{ top: '40%', animationDelay: '0.2s' }}></div>
                                <div className="led" style={{ top: '70%', animationDelay: '0.4s' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
