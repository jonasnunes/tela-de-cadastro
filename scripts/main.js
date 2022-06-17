class Validator{

    constructor(){
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-equal',
            'data-password-validate',
        ]
    }

    // iniciar a validação de todos os campos
    validate(form){

        // resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation')

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations)
        }

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

    // verifica se um input tem um número máximo de caracteres
    maxlength(input, maxValue){

        let inputLength = input.value.length
        let errorMessage = `O campo não pode ter mais que ${maxValue} caracteres`

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage)
        }

    }

    // verificar se o email foi digitado
    required(input){

        let inputValue = input.value 

        if(inputValue === ''){
            let errorMessage = 'Este campo é obrigatório'
            this.printMessage(input, errorMessage)
        }

    }

    // validar emails
    emailvalidate(input){

        // email@email.com ou email@email.com.br por exemplo
        let re = /\S+@\S+\.\S+/

        let email = input.value

        let errorMessage = 'Insira um e-mail válido, ex.: email@email.com'

        if(!re.test(email)){
            this.printMessage(input, errorMessage)
        }

    }

    // verificar se o usuário digitou apenas letras
    onlyletters(input){

        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value;

        let errorMessage = `Não é permitido números e caracteres especiais`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }

    }

    // verificar se um campo está igual o outro
    equal(input, inputName) {

        let inputToCompare = document.getElementsByName(inputName)[0]

        let errorMessage = `Este campo precisa estar igual ao ${inputName}`

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage)
        }
    }

    // validando o campo de senha
    passwordvalidate(input) {

        // explodir string em array
        let charArr = input.value.split("")

        let uppercases = 0
        let numbers = 0

        for(let i = 0; charArr.length > i; i++) {
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++
            } else if(!isNaN(parseInt(charArr[i]))) {
                numbers++
            }
        }
        
        if(uppercases === 0 || numbers === 0){
            let errorMessage = 'Insira pelo menos um número e uma letra maiúscula'

            this.printMessage(input, errorMessage)
        }

    }

    // método para imprimir mensagens de erro na tela
    printMessage(input, msg){

        // verificar a quantidade de erros que o input já possui
        let errorQty = input.parentNode.querySelector('.error-validation')

        if(errorQty === null){
            let template = document.querySelector('.error-validation').cloneNode(true)
            template.textContent = msg
            let inputParent = input.parentNode
            template.classList.remove('template')
            inputParent.appendChild(template)
        }

    }

    // método para limpar as validações da tela
    cleanValidations(validations){

        validations.forEach(el => el.remove())

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