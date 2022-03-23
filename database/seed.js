const { PromisedDatabase } = require('promised-sqlite3')

const db = new PromisedDatabase()

async function seed(){
    await db.open('./database/messages.db')

    await db.run(`
            INSERT INTO departments ('name')
            VALUES
                ('IT'),    
                ('Finance'),    
                ('Human Resources'),    
                ('Markting'),    
                ('Production'),    
                ('Research')    
    `)
    await db.close()
}
seed();