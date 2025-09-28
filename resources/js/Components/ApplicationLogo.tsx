import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            {/* Main content panel with gradient background */}
            <defs>
                <linearGradient id="panelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.1"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0.05"/>
                </linearGradient>
                <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0.6"/>
                </linearGradient>
            </defs>
            
            {/* Main content panel */}
            <rect x="3" y="5" width="18" height="14" rx="3" fill="url(#panelGradient)" stroke="white" strokeWidth="1.5"/>
            
            {/* Content lines with varying lengths */}
            <path d="M6 9h12M6 12h9M6 15h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
            
            {/* Analytics/insights circle */}
            <circle cx="17.5" cy="7.5" r="2.5" fill="url(#accentGradient)"/>
            
            {/* Search/magnify icon */}
            <path d="M20 20l-2.5-2.5" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
            
            {/* Widget indicator corners */}
            <rect x="1" y="1" width="5" height="5" rx="1.5" fill="white" opacity="0.3"/>
            <rect x="18" y="1" width="5" height="5" rx="1.5" fill="white" opacity="0.3"/>
            
            {/* Inner accent dots */}
            <circle cx="3.5" cy="3.5" r="1" fill="white" opacity="0.6"/>
            <circle cx="20.5" cy="3.5" r="1" fill="white" opacity="0.6"/>
        </svg>
    );
}
