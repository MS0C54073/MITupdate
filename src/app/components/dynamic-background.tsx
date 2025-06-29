'use client';

import React, { useEffect, useState } from 'react';
import { useBackgroundTheme } from './background-theme-provider';

// Define state types for clarity
type NodeStyle = React.CSSProperties;
type DropStyle = { style: React.CSSProperties; content: string };
type TraceStyle = React.CSSProperties;
type RackStyle = React.CSSProperties;

export function DynamicBackground() {
    const { theme } = useBackgroundTheme();
    const [isClient, setIsClient] = useState(false);

    // State for each theme's randomly generated elements
    const [nodes, setNodes] = useState<NodeStyle[]>([]);
    const [drops, setDrops] = useState<DropStyle[]>([]);
    const [traces, setTraces] = useState<TraceStyle[]>([]);
    const [racks, setRacks] = useState<RackStyle[]>([]);

    useEffect(() => {
        // This effect runs once on mount on the client, setting up all themes.
        // This avoids re-calculating on every theme switch.
        setIsClient(true);

        // Neural Nexus
        setNodes([...Array(20)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
        })));

        // Matrix Rain
        setDrops([...Array(50)].map(() => ({
            style: {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
            },
            content: Array.from({ length: Math.floor(10 + Math.random() * 20) }, () => "¦").join('')
        })));

        // Circuit Board
        setTraces([...Array(30)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 150}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 5}s`,
        })));

        // Data Center
        setRacks([...Array(10)].map(() => ({
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 2}s`,
        })));

    }, []); // Empty dependency array means this runs only once on the client after mount.

    if (!isClient || theme === 'none') {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
            {theme === 'neural' && (
                <div className="neural-network-nexus">
                    {nodes.map((style, i) => (
                        <div key={i} className="node" style={style} />
                    ))}
                </div>
            )}
            {theme === 'matrix' && (
                <div className="quantum-matrix-rain">
                    {drops.map((drop, i) => (
                        <div key={i} className="rain-drop" style={drop.style}>
                            {drop.content}
                        </div>
                    ))}
                </div>
            )}
            {theme === 'circuit' && (
                <div className="circuit-board-topography">
                    {traces.map((style, i) => (
                        <div key={i} className="trace" style={style} />
                    ))}
                </div>
            )}
            {theme === 'datacenter' && (
                <div className="datacenter-labyrinth">
                    <div className="isometric-grid">
                        {racks.map((style, i) => (
                            <div key={i} className="server-rack" style={style}>
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
