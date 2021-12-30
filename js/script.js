'use strict';

 (() => {

    const formHandler = {
        form: null,
        inputs: null,
        inputsData: {},

        getForm() {
            this.form = document.getElementById('new-form');
            return this.form;
        },

        getFormItems() {
            this.inputs = document.querySelectorAll('input:not([type="submit"])');
            return this.inputs;
        },

        initEvent() {
            this.form.addEventListener('submit', (event) => {
                event.preventDefault();
                if(this.markEmptyInputs()) return;
                this.setData();
                this.renderContent();
                this.clearForm();
            })
        },

        clearForm() {
            this.form.reset();
        },

        setData() {
            this.inputs.forEach(input => {
                this.inputsData[input.name] = input.value;
            });
            console.log(this.inputsData);
            return this.inputsData;
        },

        renderContent() {
            const inputsDataArea = document.querySelector('.inputsDataArea');
            const div = document.createElement('div');
            const h3 = document.createElement('h3');
            const p = document.createElement('p');
            h3.append(`Title: ${this.inputsData.title}`);
            p.append(`Description: ${this.inputsData.desc}`);
            div.classList.add('m-3', 'p-2', 'data-wrap')
            div.append(h3, p);
            inputsDataArea.append(div);    
        },

        markEmptyInputs() {
            let flag = false;
            this.inputs.forEach(input => {
                if(input.value === '' || !input.value.trim()) {
                    input.classList.remove('form-control');
                    input.classList.add('red-border');
                    flag = true;
                };
            })
            return flag;
        },

        isValidData() {
            let flag = false;
            this.inputs.forEach(input => {
                if(!this.markEmptyInputs) {
                    flag = true;
                };
            });
            return flag;
        },

        returnDefaultStyles() {
            this.inputs.forEach(input => {
                input.oninput = () => {
                    if(this.isValidData) {
                        input.classList.remove('red-border');
                        input.classList.add('form-control');
                    };
                };
            });
        },

        init() {
            this.getForm();
            this.getFormItems();
            this.returnDefaultStyles();
            this.initEvent();
        }
    }

    formHandler.init();

 })();