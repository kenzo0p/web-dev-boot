setInterval(() => {
    console.clear()
    const time = new Date()
    console.log(time.getHours() ,":" ,time.getMinutes() , ":" , time.getSeconds())
},1000)