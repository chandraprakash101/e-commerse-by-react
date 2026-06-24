import React, { useEffect, useRef, useState } from 'react'
import Grocery from '../Accest/Grocery.webp'
import HomeDecoration from '../Accest/Home-decoration.webp'
import Laptop from '../Accest/laptop.avif'
import Shoes from '../Accest/shoes.jpg'
import SkinCare from '../Accest/skin-care.jpg'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

const images = [Grocery,HomeDecoration,Laptop,Shoes,SkinCare]

const Crousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    // const [activeIndex, setActiveIndex] = useState(1)

    function handleLeft(e) {
        e.stopPropagation();
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    }

    function handleRight(e) {
        e.stopPropagation();
        setActiveIndex((activeIndex + 1) % images.length);
    }

    const timerRef = useRef(null);

    function clearTimer() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }

    function addTimer() {
        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => {
                return (prev + 1) % images.length;
            });
        }, 2000);
    }

    useEffect(() => {
        clearTimer();
        addTimer();
        return clearTimer;
    }, []);

    function handleMouseEnter() {
        clearTimer();
    }

    function handleMouseLeave() {
        clearTimer();
        addTimer();
    }
    return (
        <div className='w-full h-55 relative' 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className='cursor-pointer absolute top-[40%] bg-amber-50 rounded-2xl flex justify-center items-center lg:p-1'
            onClick={handleLeft}><ArrowBigLeft /></div>
            <img src={images[activeIndex]} alt="" 
            className='h-full w-full' />
            <div className='cursor-pointer absolute right-1 top-[40%] bg-amber-50 rounded-2xl flex justify-center items-center lg:p-1'
            onClick={handleRight}><ArrowBigRight /></div>
        </div>
    )
}

export default Crousel
