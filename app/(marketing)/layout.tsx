import React from 'react';
import Navbar from '@/components/navigation/navbar';
import Footer from '@/components/navigation/footer';


interface Props {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <>
            <div id="home" className="absolute" />
            <Navbar />
            <main className="mx-auto w-full z-0 relative">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MarketingLayout