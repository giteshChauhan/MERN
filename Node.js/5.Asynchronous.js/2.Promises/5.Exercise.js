
// Task is to notify customer on the email the top movies if he/she is having gold membership

async function notifyCustomer(){
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    if(customer.isGold){
        const movies = await getTopMovies();
        console.log('Top Movies: ',movies);
        await sendEmail(customer.email, movies);
        console.log('Email sent....');
    }
}
notifyCustomer();

function getCustomer(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({   
                id: 1,
                name: 'Gitesh Chauhan',
                isGold: true,
                email: 'email'
            });
        },4000);
    });
}

function getTopMovies(){
    return new Promise((resolve,reject) =>{
        setTimeout(() =>{
            resolve(['movie1','movie2']);
        },4000);
    });
}

function sendEmail(email,movies){
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            resolve();
        },4000);
    });
}