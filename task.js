const task = ()=>{
    setTimeout(()=>{
        console.log("task finished")
    }, 3000)
}


console.log("start")
task()
console.log("end")