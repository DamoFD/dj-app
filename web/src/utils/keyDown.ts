export const handleEnter = (e: React.KeyboardEvent, fn: () => void) => {
    if (e.key === 'Enter') {
        fn();
    }
}
