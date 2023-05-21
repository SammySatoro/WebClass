


export class CodeComparisonCSS {

    constructor() {
        this.deleteButtonContainerCSS= document.createElement('div')
        this.deleteButtonContainerCSS.classList.add('code-comparison-delete-button-container')
        this.deleteButtonContainerCSS.onclick = () => {
            this.leftTextFieldCSS.value = ''
            this.rightTextFieldCSS.value = ''
            this.leftTextFieldCSS.height = '60px'
            this.rightTextFieldCSS.height = '60px'

        }

        const deleteIconCSS = document.createElement('i');
        deleteIconCSS.classList.add('fas', 'fa-minus');
        this.deleteButtonCSS = document.createElement('button')
        this.deleteButtonCSS.classList.add('code-comparison-add-delete-button')
        this.deleteButtonCSS.appendChild(deleteIconCSS);




        this.textFieldsContainerCSS = document.createElement('div')
        this.textFieldsContainerCSS.classList.add('code-comparison-text-fields-container')

        this.leftTextFieldCSS = document.createElement('textarea')
        this.leftTextFieldCSS.classList.add('code-comparison-text-field-input')
        this.leftTextFieldCSS.placeholder = "Input some CSS code..."

        this.leftTextFieldCSS.addEventListener('input', () => {
            this.#adjustHeight(this.leftTextFieldCSS);
        });

        this.leftTextFieldCSS.addEventListener('mouseover', () => {
            this.leftTextFieldCSS.style.outline = '#36395A 1px solid'
        });

        this.leftTextFieldCSS.addEventListener('mouseout', () => {
            this.leftTextFieldCSS.style.outline = 'none'
        });

        this.rightTextFieldCSS = document.createElement('textarea')
        this.rightTextFieldCSS.classList.add('code-comparison-text-field-input')
        this.rightTextFieldCSS.placeholder = "Input some CSS code..."

        this.rightTextFieldCSS.addEventListener('input', () => {
            this.#adjustHeight(this.rightTextFieldCSS);
        });

        this.rightTextFieldCSS.addEventListener('mouseover', () => {
            this.rightTextFieldCSS.style.outline = '#36395A 1px solid'
        });

        this.rightTextFieldCSS.addEventListener('mouseout', () => {
            this.rightTextFieldCSS.style.outline = 'none'
        });
    }

    #adjustHeight(textarea) {
        textarea.style.height = `${textarea.value.split('\n').length * 18 + 10}px`
    }

    obfuscateCode(code) {
        // Regex for property names
        const propertyRegex = /([\w-]+\s*):/g;
        code = code.replace(propertyRegex, (_, p1) => {
            if (p1) return `*:`;
        });

        // Regex for selectors
        const selectorRegex = /(\.[\w-]+)|(#[\w-]+)|(@[\w-]+)/g;
        code = code.replace(selectorRegex, (_, p1, p2, p3) => {
            if (p1) return `.*`;
            if (p2) return `#*`;
            if (p3) return `@*`;
        });
        console.log(code)
        return code
    }

    considerComments(code) {
        code = code.replace(/\/\*[\s\S]*?\*\//g, '');

        return code;
    }

    considerEmptyLines(code) {
        return code.split('\n').filter(line => !line.match(/^\s*$/)).join('\n')
    }

}