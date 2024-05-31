const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${' 1.'.green } Buscar ciudad`
            },
            {
                value: 2,
                name: `${' 2.'.green } Historial`
            },
            {
                value: 0,
                name: `${' 0.'.green } Salir`
            }
        ]
    }
];

const pause = [
    {
        type: 'input',
        name: 'pause',
        message: `\nPresione ${ 'ENTER'.blue } para continuar\n`
    }
]

const inquirerMenu = async () => {

    //console.clear();
    console.log('======================'.green);
    console.log('Seleccione una opción'.white);
    console.log('======================\n'.green);

    const { opcion } = await inquirer.prompt( preguntas );

    return opcion;

}

const pausa = async () => {

    await inquirer.prompt( pause );

}

const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {

                if ( value.length === 0 ) {

                    return 'Por favor ingrese un valor';

                }

                return true;

            }
        }
    ]

    const { desc } = await inquirer.prompt( question );

    return desc;

}

const listarLugares = async ( lugares = [] ) => {

    const choices = lugares.map( ( lugar, index ) => {

        index = `${ index + 1 }.`.green;

        const { id, nombre } = lugar;
        
        return { 

            value: id,
            name: `${ index } ${ nombre }`

        }

    })

    choices.unshift( {

        value: '0',
        name: '0.'.green + ' Cancelar'

    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );

    return id;

}

const confirmarBorrado = async ( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );

    return ok;

}

const mostrarListadoCheckList = async ( tareas = [] ) => {

    const choices = tareas.map( ( tarea, index ) => {

        index = `${ index + 1 }.`.green;

        const { id, desc, completadoEn } = tarea;
        
        return { 

            value: id,
            name: `${ index } ${ desc }`,
            checked: completadoEn  ? true : false

        }

    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( pregunta );

    return ids;

}


module.exports = {

    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmarBorrado,
    mostrarListadoCheckList

}