const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const session = require('express-session');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    saveUninitialized: true,
    resave: false
}));

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'employeedb.sqlite'
});


const Employees = sequelize.define('employee', {
    รหัสพนักงาน: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ชื่อ_นามสกุล_ไทย: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ชื่อ_นามสกุล_อังกฤษ: {
        type: Sequelize.STRING,
        allowNull: false
    },
    วันเกิด: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DIV_: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DEPT: {
        type: Sequelize.STRING,
        allowNull: false
    },
    รหัสหน่วยงาน: {
        type: Sequelize.STRING,
        allowNull: false
    },
    รหัสตำแหน่ง: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ชื่อตำแหน่ง: {
        type: Sequelize.STRING,
        allowNull: false
    },
    บัตรประจำตัวประชาชน: {
        type: Sequelize.STRING,
        allowNull: false
    },
    line_user_id: {
        type: Sequelize.STRING,
        allowNull: true
    }
});


const Login_History = sequelize.define('history', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    รหัสพนักงาน: {
        type: Sequelize.INTEGER,
        references: {
            model: Employees,
            key: 'รหัสพนักงาน'
        },
        allowNull: false
    },
    ชื่อพนักงาน: {
        type: Sequelize.STRING,
        allowNull: false
    },
    line_user_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


Employees.hasMany(Login_History, { foreignKey: 'รหัสพนักงาน' });
Login_History.belongsTo(Employees, { foreignKey: 'รหัสพนักงาน' });


sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

sequelize.sync()
    .then(() => console.log('All models were synchronized successfully.'))
    .catch(error => console.error('Error synchronizing the models:', error));

app.listen(3000, () => console.log('Server running on port 3000'));
