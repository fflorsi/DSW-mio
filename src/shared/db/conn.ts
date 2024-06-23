import mysql from 'mysql2/promise'

export const pool = mysql.createPool(
    {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.USER || 'dsw',
        password: process.env.PASSWORD || 'dsw',
        database: process.env.DATABASE || 'veterinaria',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        maxIdle:10,
        idleTimeout:60000,
        enableKeepAlive:true,
        keepAliveInitialDelay:0,
})