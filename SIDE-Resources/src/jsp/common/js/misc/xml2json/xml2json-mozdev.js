function buildValue (sValue) {
        if (sValue.replace(/\s+/g, "") === "") { return(null); }
        else if (sValue.search(/^(true|false)$/i) > -1) { return(sValue.toLowerCase() === "true"); }
        else if (isFinite(sValue)) { return(parseFloat(sValue)); }
        else if (isFinite(Date.parse(sValue))) { return(new Date(sValue)); }
        else { return(sValue); }
}

function getXMLData (oXMLParent) {
        var vResult = true /* here is the default value for empty nodes */, nLength = 0, sTxtContent = "";
        if (oXMLParent.hasAttributes()) {
                vResult = {};
                for (nLength; nLength < oXMLParent.attributes.length; nLength++) {
                        iAttrib = oXMLParent.attributes.item(nLength);
                        vResult["@" + iAttrib.nodeName.toLowerCase()] = buildValue(iAttrib.nodeValue);
                }
        }
        if (oXMLParent.hasChildNodes()) {
                var iKey, iValue, iXMLChild;
                for (var iChildId = 0; iChildId < oXMLParent.childNodes.length; iChildId++) {
                        iXMLChild = oXMLParent.childNodes.item(iChildId);
                        if (iXMLChild.nodeType === 1 && !iXMLChild.prefix) {
                                if (nLength === 0) { vResult = {}; }
                                iKey = iXMLChild.nodeName.toLowerCase();
                                iValue = getXMLData(iXMLChild);
                                if (vResult.hasOwnProperty(iKey)) {
                                        if (vResult[iKey].constructor !== Array) { vResult[iKey] = [vResult[iKey]]; }
                                        vResult[iKey].push(iValue);
                                } else { vResult[iKey] = iValue; nLength++; }
                        } else if ((iXMLChild.nodeType - 1 | 1) === 3) { sTxtContent += iXMLChild.nodeType === 3 ? iXMLChild.nodeValue.replace(/^\s+|\s+$/g, "") : iXMLChild.nodeValue; }
                }
        }
        if (nLength > 0) { vResult.keyValue = buildValue(sTxtContent); } else if (sTxtContent) { vResult = buildValue(sTxtContent); }
        return (vResult);
}