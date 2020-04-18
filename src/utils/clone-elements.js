const cloneElements = (elements) => {
    const clone = {};
    Object.keys(elements).forEach((elementName) => {
        clone[elementName] = elements[elementName].cloneNode(true);
    });
    return clone;
};

export default cloneElements;
