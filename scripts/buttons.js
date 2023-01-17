//buttons
const buttons= document.querySelectorAll(".buttons")
const numberBtns= document.querySelectorAll("#number")
const operatorBtns= document.querySelectorAll('#operator')
const equalsToBtn= document.querySelector('#equals')
const allClearBtn= document.querySelector('#ac')
const deleteBtn= document.querySelector('#delete')
const dotBtn= document.querySelector('#dot')

//Displays
const previous= document.querySelector('.previous-result')
const current= document.querySelector('.present-result')

let eqn = ""
let prevEqn = ""
let result = ""
var length = 0
var eqnChecker = 0
var maxCount = 18
var equalsToClickChecker = 0
var operatorClickChecker = 0

//When opening the calculator
eqn = "0"
current.innerHTML=eqn

//Clear function
function clear(){
    eqn = "0"
    prevEqn = ""
    result = ""
    length = 0
    eqnChecker = 0
    equalsToClickChecker = 0
    operatorClickChecker = 0
    current.innerHTML = eqn
    previous.innerHTML = ""
}

numberBtns.forEach((button)=>{
    button.addEventListener('click',()=>{
        //When equals to is pressed
        if(equalsToClickChecker==1)
        {
            eqn = ""
            result = ""
            text = button.innerHTML
            eqn=eqn+text
            result = eval(prevEqn)
            previous.innerHTML = result
            current.innerHTML = eqn
            equalsToClickChecker=0
        }
        //When 2 operators are pressed
        else if(operatorClickChecker== 1)
        {
            text = button.innerHTML
            eqn= eqn+text
            current.innerHTML=eqn
            operatorClickChecker= 0
        }
        //When number only is pressed
        else
        {
            //Starting part of calculation adds 0
            if(eqn.length==1 && eqn.includes('0'))
            {
                eqn = "0+"
                text = button.innerHTML
                eqn= eqn+ text
                current.innerHTML = eqn
            }
            //Checking if eqn size is correct or not
            else if(eqn.length<maxCount)
            {
                text = button.innerHTML
                eqn=eqn+text
                current.innerHTML = eqn
            }
            //When length is bigger nothing is to be added
            else return
        }
        
    })
})

dotBtn.addEventListener('click',()=>{
    text = dotBtn.innerHTML
    eqn= eqn+text
    current.innerHTML = eqn
})

operatorBtns.forEach((button)=>{
    button.addEventListener('click',()=>{
        //When equals to is clicked to calculate to the result
        if(equalsToClickChecker==1)
        {
            text = button.innerHTML
            eqn= result+text
            current.innerHTML=eqn
            equalsToClickChecker=0
            operatorClickChecker = 1
        }

        //TO calculate
        else{
            text = current.innerHTML
            length= text.length
            //if last digit of eqn isNaN then to aviod -- or ++ in eqn
            if(isNaN(text[length-1])){
                //Checking for * in eqn to put -+/%
                if(text[length-1]=="*" && text[length-2] != '*')
                {
                    text = button.innerHTML
                    eqn=eqn+text
                    current.innerHTML=eqn
                }
                //to avoid *** error
                else if (text[length-1]=='*' && text[length-2]=='*')
                {
                    return
                }
                //Checking for * if not found
                else
                return
            }
            //If last digit of eqn is no. then
            else
            {
                text = button.innerHTML
                eqn=eqn+text
                current.innerHTML=eqn
            }
        }
    })
})

allClearBtn.addEventListener('click',clear)

deleteBtn.addEventListener('click',()=>{
    if(equalsToClickChecker==1)
    {
        length = 0
        eqnChecker = 0
        equalsToClickChecker = 0
        operatorClickChecker = 0
        eqn = ""
        current.innerHTML = "0"
        previous.innerHTML = result
        equalsToClickChecker = 0
    }
    else
    {
        text = eqn.slice(0,-1)
        eqn = text
        current.innerHTML = eqn
    }
})

equalsToBtn.addEventListener('click',()=>{

    try{
        equalsToClickChecker = 1
        prevEqn = eqn
        result = eval(prevEqn)
        text= current.innerHTML
        length = text.length
    }
    catch(Exception)
    {
        current.innerHTML = 'error'
    }
  
    //If equals to is pressed when eqn is null
    if(eqn=="")
    {
        eqn="0"
        prevEqn="0"
        result="0"
        previous.innerHTML="0"
        current.innerHTML="0"
    }

    //if +- is the last digit
    else if(isNaN(eqn[length-1]))
    {
        return
    }

    //if infinity exists
    else if(result==Infinity || result== -Infinity)
    {
        previous.innerHTML = prevEqn
        current.innerHTML = result
        eqn=""
        result = ""
        return
    }
    //For 0/0
    else if(isNaN(result))
    {
        previous.innerHTML = prevEqn
        current.innerHTML = "Math Error"
        eqn=""
        result = ""
        return
    }
    //Format printing or displaying result
    else
    {   
        length = result.toString().length
        console.log(length)
        console.log(result)
        if(length>maxCount)
        {
            previous.innerHTML = prevEqn
            current.innerHTML = 'too long'
        }
        else
        {
            let numPrev = parseFloat(prevEqn)
            let numPres = parseFloat(result)
            let formatPres = numPres.toLocaleString('hi-IN')
            previous.innerHTML = prevEqn
            current.innerHTML = formatPres
        }
    }
})