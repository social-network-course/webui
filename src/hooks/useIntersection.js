import { useEffect } from 'react';

let listenerCallbacks = new WeakMap();

let observer;

const handleIntersections = (entries) => {
    entries.forEach((entry) => {
        if (listenerCallbacks.has(entry.target)) {
            let cb = listenerCallbacks.get(entry.target);

            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                listenerCallbacks.delete(entry.target);
                cb();
            }
        }
    });
}

const getIntersectionObserver = () => {
    if (!observer) {
        observer = new IntersectionObserver(handleIntersections, {
            threshold: '0.15',
        });
    }

    return observer;
}

export const useIntersection = (elem, callback) => {
    useEffect(() => {
        if (elem.current) {
            const target = elem.current;
            const observer = getIntersectionObserver();

            listenerCallbacks.set(target, callback);
            observer.observe(target);

            return () => {
                listenerCallbacks.delete(target);
                observer.unobserve(target);
            };
        }
    }, []);
}