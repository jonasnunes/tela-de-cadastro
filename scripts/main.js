class Validator{

    constructor(){
        this.validations = [
            'data-min-length',
        ]
    }

    // iniciar a validação de todos os campos
    validate(form){

        // pegar os inputs
        let inputs = document.getElementsByTagName('input')

        // transformar HTML.Collection em array
        let inputsArray = [...inputs]

        // loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input){
            
            // loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++){
                // verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    
                    // transformar o data-min-length em minlength()
                    // limpando a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-', '')

                    // valor do input
                    let value = input.getAttribute(this.validations[i])

                    // invocar o método
                    this[method](input, value)

                }
            }

        }, this)
    }

    // verifica se um input tem um número mínimo de caracteres
    minlength(input, minValue){

        let inputLength = input.value.length
        let errorMessage = `O campo precisa ter no mínimo ${minValue} caractereres`

        if(inputLength < minValue){
            this.printMessage(input, errorMessage)
        }
        
    }

    // método para imprimir mensagens de erro na tela
    printMessage(input, msg){

        let template = document.querySelector('.error-validation').cloneNode(true)
        template.textContent = msg
        let inputParent = input.parentNode
        template.classList.remove('template')
        inputParent.appendChild(template)

    }

}

let form = document.getElementById('register-form')
let submit = document.getElementById('btn-submit')
// iniciando o objeto validator
let validator = new Validator()

// evento que dispara as validações
submit.addEventListener('click', function(e){
    e.preventDefault()
    validator.validate(form)
})