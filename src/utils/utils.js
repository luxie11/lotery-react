const randomUniqueNumbers = (range, count) => {
    let nums = new Set();
    while (nums.size < count) {
        nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
    }
    return [...nums];
}

export {
    randomUniqueNumbers,
}