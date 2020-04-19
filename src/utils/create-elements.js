const createElements = (tree) => {
    const elements = {};

    const handleNode = (node, nodeName, nodeElement) => {
        const { classList, childNodes, attributes } = node;
        if (classList !== undefined) {
            nodeElement.classList.add(...classList);
        }
        if (attributes !== undefined) {
            Object.keys(attributes).forEach((attributeName) => {
                nodeElement.setAttribute(attributeName, attributes[attributeName]);
            });
        }
        elements[nodeName] = nodeElement;
        if (childNodes !== undefined) {
            Object.keys(childNodes).forEach((childNodeName) => {
                const childNode = childNodes[childNodeName];
                const childNodeElement = document.createElement(childNode.element);
                elements[childNodeName] = childNodeElement;
                nodeElement.appendChild(childNodeElement);
                handleNode(childNode, childNodeName, childNodeElement);
            });
        }
    };

    const { main } = tree;
    handleNode(main, 'main', document.createElement(main.element));
    return elements;
};

export default createElements;
