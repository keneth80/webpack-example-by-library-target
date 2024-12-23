const createContainer = (display: string = 'block'): HTMLElement => {
    const container = document.createElement('DIV');
    container.style.cssText = `vertical-align: middle; text-align: center; padding: 10px; display:${display}`;
    return container;
};

const createButton = (btnLabel: string): HTMLElement => {
    const btn = document.createElement('button');
    btn.textContent = btnLabel;
    return btn;
};

const createLabel = (): HTMLElement => {
    const textDiv = document.createElement('label');
    return textDiv;
};

const createPre = (): HTMLElement => {
    const textDiv = document.createElement('pre');
    return textDiv;
};

const createInput = (): HTMLInputElement => {
    const textInput = document.createElement('INPUT') as HTMLInputElement;
    return textInput;
};

export const setState = (value: any) => {
    let returnValue = value;

    function getValue() {
        return returnValue;
    }

    function setValue(modifyValue: any) {
        returnValue = modifyValue;
    }

    return [getValue, setValue];
};

function syntaxHighlight(json: any) {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match: string) => {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

export const parseJson = (jsonObj: any) => {
    // return JSON.stringify(jsonObj, null, 4);
    return syntaxHighlight(JSON.stringify(jsonObj, null, 4));
};

export const makeTemplete = (buttonLabel: string, callback: Function): HTMLElement => {
    const root = document.getElementById('container');
    const container = createContainer();
    const btn = createButton(buttonLabel);
    btn.addEventListener('click', () => {
        callback(textDiv);
    });
    container.appendChild(btn);
    const textDiv = createPre();
    container.appendChild(textDiv);
    root?.appendChild(container);
    return textDiv;
};

export const makeInputTemplete = (buttonLabel: string, labelTitle: string, callback: Function): HTMLElement => {
    const root = document.getElementById('container');
    const container = createContainer();
    const btn = createButton(buttonLabel);
    btn.addEventListener('click', () => {
        callback(textDiv, textInput.value);
    });
    const paramContainer = createContainer();
    const textInput = createInput();
    const label = createLabel();
    label.textContent = labelTitle;
    paramContainer.appendChild(btn);
    paramContainer.appendChild(label);
    paramContainer.appendChild(textInput);
    container.appendChild(paramContainer);
    const textDiv = createPre();
    container.appendChild(textDiv);
    root?.appendChild(container);
    return textDiv;
};

export const init = () => {
    console.log('init');
};
