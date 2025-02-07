const useRendered = (delay: number = 300): boolean => {
    const [rendered, setRendered] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setRendered(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);
    return rendered;
};

export default useRendered