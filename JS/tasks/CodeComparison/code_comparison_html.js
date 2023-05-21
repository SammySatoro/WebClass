

export class CodeComparisonHTML {

    constructor() {
        this.deleteButtonContainerHTML = document.createElement('div')
        this.deleteButtonContainerHTML.classList.add('code-comparison-delete-button-container')
        this.deleteButtonContainerHTML.onclick = () => {
            this.leftTextFieldHTML.value = ''
            this.rightTextFieldHTML.value = ''
            this.leftTextFieldHTML.height = '60px'
            this.rightTextFieldHTML.height = '60px'

        }

        const deleteIconHTML = document.createElement('i');
        deleteIconHTML.classList.add('fas', 'fa-minus');
        this.deleteButtonHTML = document.createElement('button')
        this.deleteButtonHTML.classList.add('code-comparison-add-delete-button')
        this.deleteButtonHTML.appendChild(deleteIconHTML);

        this.textFieldsContainerHTML = document.createElement('div')
        this.textFieldsContainerHTML.classList.add('code-comparison-text-fields-container')

        this.leftTextFieldHTML = document.createElement('textarea')
        this.leftTextFieldHTML.classList.add('code-comparison-text-field-input')
        this.leftTextFieldHTML.placeholder = "Input some HTML code..."

        this.leftTextFieldHTML.addEventListener('input', () => {
            this.#adjustHeight(this.leftTextFieldHTML);
        });

        this.leftTextFieldHTML.addEventListener('mouseover', () => {
            this.leftTextFieldHTML.style.outline = '#36395A 1px solid'
        });

        this.leftTextFieldHTML.addEventListener('mouseout', () => {
            this.leftTextFieldHTML.style.outline = 'none'
        });

        this.rightTextFieldHTML = document.createElement('textarea')
        this.rightTextFieldHTML.classList.add('code-comparison-text-field-input')
        this.rightTextFieldHTML.placeholder = "Input some HTML code..."

        this.rightTextFieldHTML.addEventListener('input', () => {
            this.#adjustHeight(this.rightTextFieldHTML);
        });

        this.rightTextFieldHTML.addEventListener('mouseover', () => {
            this.rightTextFieldHTML.style.outline = '#36395A 1px solid'
        });

        this.rightTextFieldHTML.addEventListener('mouseout', () => {
            this.rightTextFieldHTML.style.outline = 'none'
        });
    }

    #adjustHeight(textarea) {
        textarea.style.height = `${textarea.value.split('\n').length * 18 + 10}px`
    }

    obfuscateCode(code) {
        const regex = /<(\/?)(\w+)(\s*[^>]*)>/g;
        return code.replace(regex, (_, p1, p2, p3) => {
            return `<${p1}*${p3}>`;
        });
    }

    considerComments(code) {
        const regex = /<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?|<[?][^>]*>?)/g;

        return code.replace(regex, '');
    }

    considerEmptyLines(code) {
        return code.split('\n').filter(line => !line.match(/^\s*$/)).join('\n')
    }

}