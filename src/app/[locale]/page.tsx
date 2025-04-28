'use client';

import About from '../sections/about';
import Hero from '../sections/hero';
import Portfolio from '../sections/portfolio';
import Service from '../sections/service';
import Technologies from '../sections/technologies';
import Work from '../sections/work';
export default function HomePage() {


    return (
        // <Provider store={store} >
        // <Header />

        <>
            <Hero />
            <About/>
            <Service/>
            <Technologies/>
            <Portfolio/>
            <Work/>
        </>
        


        // </Provider>
    );
}