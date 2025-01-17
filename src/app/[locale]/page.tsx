'use client';

import About from '../sections/about';
import Hero from '../sections/hero';
import Service from '../sections/service';

export default function HomePage() {


    return (
        // <Provider store={store} >
        // <Header />

        <>
            <Hero />
            <About/>
            <Service/>
        </>
        


        // </Provider>
    );
}