const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'moveon',
    password: 'root',
    port: 5432
})

const createUser = (request, response) => {
    const { first_name, last_name, password, email } = request.body

    if (first_name == null || last_name ==  null || password == null || !validateEmail(email)) { response.status(400).send(`Bad request`) }
    else {
        pool.query('INSERT INTO users (first_name, last_name, password, email) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, password, email], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


module.exports = {
    createUser
}