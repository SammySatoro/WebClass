
export class CodeComparisonJS {

    constructor() {
        this.deleteButtonContainerJS = document.createElement('div')
        this.deleteButtonContainerJS.classList.add('code-comparison-delete-button-container')
        this.deleteButtonContainerJS.onclick = () => {
            this.leftTextFieldJS.value = ''
            this.rightTextFieldJS.value = ''
            this.leftTextFieldJS.height = '60px'
            this.rightTextFieldJS.height = '60px'

        }

        const deleteIconJS = document.createElement('i');
        deleteIconJS.classList.add('fas', 'fa-minus');
        this.deleteButtonJS = document.createElement('button')
        this.deleteButtonJS.classList.add('code-comparison-add-delete-button')
        this.deleteButtonJS.appendChild(deleteIconJS);

        this.textFieldsContainerJS = document.createElement('div')
        this.textFieldsContainerJS.classList.add('code-comparison-text-fields-container')

        this.leftTextFieldJS = document.createElement('textarea')
        this.leftTextFieldJS.classList.add('code-comparison-text-field-input')
        this.leftTextFieldJS.placeholder = "Input some JavaScript code..."

        this.leftTextFieldJS.addEventListener('input', () => {
            this.#adjustHeight(this.leftTextFieldJS);
        });

        this.leftTextFieldJS.addEventListener('mouseover', () => {
            this.leftTextFieldJS.style.outline = '#36395A 1px solid'
        });

        this.leftTextFieldJS.addEventListener('mouseout', () => {
            this.leftTextFieldJS.style.outline = 'none'
        });

        this.rightTextFieldJS = document.createElement('textarea')
        this.rightTextFieldJS.classList.add('code-comparison-text-field-input')
        this.rightTextFieldJS.placeholder = "Input some JavaScript code..."

        this.rightTextFieldJS.addEventListener('input', () => {
            this.#adjustHeight(this.rightTextFieldJS);
        });

        this.rightTextFieldJS.addEventListener('mouseover', () => {
            this.rightTextFieldJS.style.outline = '#36395A 1px solid'
        });

        this.rightTextFieldJS.addEventListener('mouseout', () => {
            this.rightTextFieldJS.style.outline = 'none'
        });
    }

    #adjustHeight(textarea) {
        textarea.style.height = `${textarea.value.split('\n').length * 18 + 10}px`
    }

    obfuscateCode(code) {
        const regex = /(\bconst|\blet|\bvar|\bfunction)\s+(\w+)|(-\w+)|(\w+\s*[\-+*/%&|^<>]=?)|(\w+\s*&&|\|\||\+\+|--|\(\))/g;
        return code.replace(regex, (_, p1, p2, p3, p4, p5, p6) => {
            if (p2) return `${p1} *`;
            if (p3) return `-*`;
            if (p4) return `*${p4[p4.length - 1]}`;
            if (p5) return `*${p5[p5.length - 1]}=`;
            if (p6) return `*${p6[p6.length - 1]}`;
        });
    }

    considerComments(code) {
        code = code.replace(/\/\/.*/g, '');

        code = code.replace(/\/\*[\s\S]*?\*\//g, '');

        return code;
    }

    considerEmptyLines(code) {
        return code.split('\n').filter(line => !line.match(/^\s*$/)).join('\n')
    }
}