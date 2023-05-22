import {CodeComparisonJS} from "./code_comparison_js.js";
import {CodeComparisonHTML} from "./code_comparison_html.js";
import {CodeComparisonCSS} from "./code_comparison_css.js";

export class CodeComparison {
    #CodeCJS;
    #CodeCHTML;
    #CodeCCSS;

    #prepareCodeConfiguration;
    #analysisResults;

    #mainContainer;
    #compareButton;
    #configurationContainer;
    #informationField;
    #fileInput;
    #textFieldSelection;
    #fileInputContainer;
    #textFieldSelector;
    #selectedTextField;
    #addTextButton;
    #loadedText;



    constructor() {

        this.#CodeCJS = new CodeComparisonJS()
        this.#CodeCHTML = new CodeComparisonHTML()
        this.#CodeCCSS = new CodeComparisonCSS()

        this.#prepareCodeConfiguration = {
            obfuscateNames: {
                name: 'Ignore Names',
                checked: false,
            },
            ignoreComments: {
                name: 'Ignore Comments',
                checked: false,
            },
            ignoreEmptyLines: {
                name: 'Ignore Empty Lines',
                checked: false,
            },
        }

        this.#analysisResults = {
            charsSimilarityJS: {
                name: 'Similarity of symbols in JS:',
                value: '0%',
            },
            charsSimilarityHTML: {
                name: 'Similarity of symbols in HTML:',
                value: '0%',
            },
            charsSimilarityCSS: {
                name: 'Similarity of symbols in CSS:',
                value: '0%',
            },
            wordsSimilarityJS: {
                name: 'Similarity of words in JS:',
                value: '0%',
            },
            wordsSimilarityHTML: {
                name: 'Similarity of words in HTML:',
                value: '0%',
            },
            wordsSimilarityCSS: {
                name: 'Similarity of words in CSS:',
                value: '0%',
            },
        }

        this.#textFieldSelection = {
            leftJS: {
                name: 'Left text field for JS',
                field: this.#CodeCJS.leftTextFieldJS
            },
            rightJS: {
                name: 'Right text field for JS',
                field: this.#CodeCJS.rightTextFieldJS
            },
            leftHTML: {
                name: 'Left text field for HTML',
                field: this.#CodeCHTML.leftTextFieldHTML
            },
            rightHTML: {
                name: 'Right text field for HTML',
                field: this.#CodeCHTML.rightTextFieldHTML
            },
            leftCSS: {
                name: 'Left text field for CSS',
                field: this.#CodeCCSS.leftTextFieldCSS
            },
            rightCSS: {
                name: 'Right text field for CSS',
                field: this.#CodeCCSS.rightTextFieldCSS
            },
        }

        this.#selectedTextField = this.#CodeCJS.leftTextFieldJS
        this.#loadedText = ''

        this.#mainContainer = document.createElement('div')

        this.#fileInputContainer = document.createElement("div");
        this.#fileInputContainer.classList.add('code-comparison-file-input-container')

        this.#fileInput = document.createElement("input");
        this.#fileInput.classList.add('code-comparison-file-input')
        this.#fileInput.type = 'file'
        this.#fileInput.value = ''

        this.#fileInput.addEventListener('change', async () => {
            this.#loadedText = await this.#readFile(this.#fileInput)
        });

        this.#textFieldSelector = document.createElement("select");
        this.#textFieldSelector.name = "textField";

        const options = Object.values(this.#textFieldSelection).map(value => ({ name: value.name, field: value.field }));

        this.#textFieldSelector.innerHTML = '';

        options.forEach((option, index) => {
            const newOption = document.createElement('option');
            newOption.value = index.toString();
            newOption.textContent = option.name.toString();
            this.#textFieldSelector.appendChild(newOption);
        });

        this.#textFieldSelector.addEventListener('change', () => {
            const selectedOption = options[this.#textFieldSelector.value];
            this.#selectedTextField = selectedOption.field;
        });

        this.#addTextButton = document.createElement('button')
        this.#addTextButton.classList.add('code-comparison-button')
        this.#addTextButton.textContent = 'Add text'
        this.#addTextButton.onclick = () => {
            this.#selectedTextField.value = this.#loadedText
        }

        this.#compareButton = document.createElement('button')
        this.#compareButton.classList.add('code-comparison-compare-button')
        this.#compareButton.textContent = 'Compare'
        this.#compareButton.addEventListener('click', () => {
            const config = this.#prepareCodeConfiguration
            const jsCode1 = this.#prepareCode(
                this.#CodeCJS.leftTextFieldJS.value,
                this.#CodeCJS,
                config.obfuscateNames.checked,
                config.ignoreComments.checked,
                config.ignoreEmptyLines.checked
            )
            const jsCode2 = this.#prepareCode(
                this.#CodeCJS.rightTextFieldJS.value,
                this.#CodeCJS,
                config.obfuscateNames.checked,
                config.ignoreComments.checked,
                config.ignoreEmptyLines.checked
            )
            const htmlCode1 = this.#prepareCode(
                this.#CodeCHTML.leftTextFieldHTML.value,
                this.#CodeCHTML,
                config.obfuscateNames.checked,
                config.ignoreComments.checked,
                config.ignoreEmptyLines.checked
            )
            const htmlCode2 = this.#prepareCode(
                this.#CodeCHTML.rightTextFieldHTML.value,
                this.#CodeCHTML,
                config.obfuscateNames.checked,
                config.ignoreComments.checked,
                config.ignoreEmptyLines.checked
            )
            const cssCode1 = this.#prepareCode(
                this.#CodeCCSS.leftTextFieldCSS.value,
                this.#CodeCCSS,
                config.obfuscateNames.checked,
                config.ignoreComments.checked,
                config.ignoreEmptyLines.checked
            )
            const cssCode2 = this.#prepareCode(
                this.#CodeCCSS.rightTextFieldCSS.value,
                this.#CodeCCSS,
                config.obfuscateNames.checked,
                config.ignoreComments.checked,
                config.ignoreEmptyLines.checked
            )

            this.#compare(jsCode1, jsCode2, this.#analysisResults.charsSimilarityJS, this.#analysisResults.wordsSimilarityJS)
            this.#compare(htmlCode1, htmlCode2, this.#analysisResults.charsSimilarityHTML, this.#analysisResults.wordsSimilarityHTML)
            this.#compare(cssCode1, cssCode2, this.#analysisResults.charsSimilarityCSS, this.#analysisResults.wordsSimilarityCSS)

            this.#setInformation()
        })

        this.#informationField = document.createElement('div')
        this.#informationField.classList.add('code-comparison-information-field')

        this.#configurationContainer = document.createElement('div')
        this.#configurationContainer.classList.add('code-comparison-configuration-container')
    }


    #setUpObjects() {

        this.#CodeCJS.deleteButtonContainerJS.appendChild(this.#CodeCJS.deleteButtonJS)
        this.#CodeCHTML.deleteButtonContainerHTML.appendChild(this.#CodeCHTML.deleteButtonHTML)
        this.#CodeCCSS.deleteButtonContainerCSS .appendChild(this.#CodeCCSS.deleteButtonCSS )

        this.#CodeCJS.textFieldsContainerJS.appendChild(this.#CodeCJS.leftTextFieldJS)
        this.#CodeCJS.textFieldsContainerJS.appendChild(this.#CodeCJS.deleteButtonContainerJS)
        this.#CodeCJS.textFieldsContainerJS.appendChild(this.#CodeCJS.rightTextFieldJS)

        this.#CodeCHTML.textFieldsContainerHTML.appendChild(this.#CodeCHTML.leftTextFieldHTML)
        this.#CodeCHTML.textFieldsContainerHTML.appendChild(this.#CodeCHTML.deleteButtonContainerHTML)
        this.#CodeCHTML.textFieldsContainerHTML.appendChild(this.#CodeCHTML.rightTextFieldHTML)

        this.#CodeCCSS.textFieldsContainerCSS.appendChild(this.#CodeCCSS.leftTextFieldCSS)
        this.#CodeCCSS.textFieldsContainerCSS.appendChild(this.#CodeCCSS.deleteButtonContainerCSS)
        this.#CodeCCSS.textFieldsContainerCSS.appendChild(this.#CodeCCSS.rightTextFieldCSS)

        this.#mainContainer.appendChild(this.#CodeCJS.textFieldsContainerJS)
        this.#mainContainer.appendChild(this.#CodeCHTML.textFieldsContainerHTML)
        this.#mainContainer.appendChild(this.#CodeCCSS.textFieldsContainerCSS)
        this.#fileInputContainer.appendChild(this.#fileInput)
        this.#fileInputContainer.appendChild(this.#textFieldSelector)
        this.#fileInputContainer.appendChild(this.#addTextButton)
        this.#mainContainer.appendChild(this.#fileInputContainer)


        for (const [key, value] of Object.entries(this.#prepareCodeConfiguration)) {
            this.#createCheckbox(value)
        }

        this.#mainContainer.appendChild(this.#configurationContainer)

        for (const [key, value] of Object.entries(this.#analysisResults)) {
            this.#createInfo(value)
        }

        this.#mainContainer.appendChild(this.#informationField)
        this.#mainContainer.appendChild(this.#compareButton)
    }

    #createCheckbox(prepareCodeConfigurationValue) {
        const container = document.createElement('div')
        container.classList.add('code-comparison-checkbox-container')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.classList.add('code-comparison-checkbox')
        checkbox.id = 'code-comparison-checkbox-' + prepareCodeConfigurationValue.name
        checkbox.onchange = () => {
            prepareCodeConfigurationValue.checked = !prepareCodeConfigurationValue.checked
        }

        const label = document.createElement('label')
        label.textContent = prepareCodeConfigurationValue.name
        label.htmlFor = checkbox.id

        container.appendChild(checkbox)
        container.appendChild(label)

        this.#configurationContainer.appendChild(container)
    }

    #createInfo(information) {
        const container = document.createElement('div')
        container.classList.add('code-comparison-information')

        const infoText = document.createElement('label')
        infoText.textContent = information.name

        const infoValue = document.createElement('label')
        infoValue.textContent = information.value

        container.appendChild(infoText)
        container.appendChild(infoValue)

        this.#informationField.appendChild(container)
    }

    get MainContainer() {
        this.#setUpObjects()
        return [this.#mainContainer]
    }

    #calculateCER(str1, str2) {
        str1 = str1.replace(' ', '')
        str2 = str2.replace(' ', '')
        const str1Length = str1.length;
        const str2Length = str2.length;
        let distance = [];

        for (let i = 0; i <= str1Length; i++) {
            distance[i] = [];
            distance[i][0] = i;
        }

        for (let j = 0; j <= str2Length; j++) {
            distance[0][j] = j;
        }
        for (let i = 1; i <= str1Length; i++) {
            for (let j = 1; j <= str2Length; j++) {
                const substitutionCost =
                    str1.charAt(i - 1) === str2.charAt(j - 1) ? 0 : 1
                distance[i][j] = Math.min(
                    distance[i - 1][j] + 1,
                    distance[i][j - 1] + 1,
                    distance[i - 1][j - 1] + substitutionCost
                );
            }
        }
        return (distance[str1Length][str2Length] / str1Length) * 100;
    }

    #calculateWER(str1, str2) {
        const str1Words = str1.split(" ");
        const str2Words = str2.split(" ");
        const str1Length = str1Words.length;
        const str2Length = str2Words.length;
        let distance = [];

        for (let i = 0; i <= str1Length; i++) {
            distance[i] = [];
            distance[i][0] = i;
        }

        for (let j =
            0; j <= str2Length; j++) {
            distance[0][j] = j;
        }

        for (let i = 1; i <= str1Length; i++) {
            for (let j = 1; j <= str2Length; j++) {
                const substitutionCost = str1Words[i - 1] === str2Words[j - 1] ? 0 : 1;
                distance[i][j] = Math.min(
                    distance[i - 1][j] + 1,
                    distance[i][j - 1] + 1,
                    distance[i - 1][j - 1] + substitutionCost
                );
            }
        }

        return (distance[str1Length][str2Length] / str1Length) * 100;
    }


    #prepareCode(code, object, obfuscateNames=false, considerComments=false, considerEmptyLines=false) {
        if (obfuscateNames) {
            code = object.obfuscateCode(code)
        }
        if (considerComments) {
            code = object.considerComments(code)
        }
        if (considerEmptyLines) {
            code = object.considerEmptyLines(code)
        }

        return code
    }

    #compare(code1, code2, charsSimilarity, wordsSimilarity) {
        const cer = this.#calculateCER(code1, code2)
        const wer = this.#calculateWER(code1, code2)

        charsSimilarity.value = ` ${!isNaN(cer) ? 100.0 - cer.toFixed(2) : 100}%`
        wordsSimilarity.value = ` ${100.0 - wer.toFixed(2)}%`
    }

    #setInformation() {
        const analysisRes = []
        this.#informationField.childNodes.forEach(child => {
            analysisRes.push(child.childNodes[1])
        })

        for (const [index, [key, value]] of Object.entries(this.#analysisResults).entries()) {
            analysisRes[index].textContent = value.value
        }
    }
    #readFile(fileInput) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const text = reader.result;
                resolve(text);
            });
            reader.addEventListener('error', reject);
            reader.readAsText(fileInput.files[0]);
        });
    }

}