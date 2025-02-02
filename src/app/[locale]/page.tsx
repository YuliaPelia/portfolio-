'use client';

import About from '../sections/about';
import Hero from '../sections/hero';
import Service from '../sections/service';
import Technologies from '../sections/technologies';

export default function HomePage() {


    return (
        // <Provider store={store} >
        // <Header />

        <>
            <Hero />
            <About/>
            <Service/>
            <Technologies/>
        </>
        


        // </Provider>
    );
}