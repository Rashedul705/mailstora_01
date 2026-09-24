'use client';
import { useState } from 'react';
import Image from "next/image";

export default function HeroViewerClient({ item }: { item: any }) {
    const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

    return (
        <div className="sp-hero-viewer">
            <div className="viewer-controls">
                <button 
                    className={`viewer-btn ${deviceView === 'desktop' ? 'active' : ''}`}
                    onClick={() => setDeviceView('desktop')}
                >🖥 Desktop</button>
                <button 
                    className={`viewer-btn ${deviceView === 'mobile' ? 'active' : ''}`}
                    onClick={() => setDeviceView('mobile')}
                >📱 Mobile</button>
            </div>
            
            <div className="device-frame">
                {deviceView === 'desktop' ? (
                    <div className="laptop-mockup">
                        <div className="screen">
                            <Image 
                                src={(item.desktopImages && item.desktopImages[0]) || item.coverImage || "/mockup.png"} 
                                alt="Desktop View" 
                                width={600} 
                                height={400} 
                                priority
                                className="mockup-inner-img"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="phone-mockup">
                        <div className="screen">
                            <Image 
                                src={(item.mobileImages && item.mobileImages[0]) || item.coverImage || "/mockup.png"} 
                                alt="Mobile View" 
                                width={300} 
                                height={600} 
                                priority
                                className="mockup-inner-img"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
