export function logDocument() {
    console.log(formatXml(new XMLSerializer().serializeToString(document), "    "));
}
function formatXml(xml: string, tab?: string) {
    let formatted = "",
        indent = "";
    xml.split(/>\s*</).forEach(function (node) {
        tab ??= "\t";
        if (node.match(/^\/\w/)) indent = indent.substring(tab.length); // decrease indent by one 'tab'
        formatted += indent + "<" + node + ">\r\n";
        if (node.match(/^<?\w[^>]*[^/]$/)) indent += tab; // increase indent
    });
    return formatted.substring(1, formatted.length - 3);
}
