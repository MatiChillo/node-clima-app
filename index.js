require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {

    const busquedas = new Busquedas();

    let opt;

    do {

        opt = await inquirerMenu();
    
        switch ( opt ) {

            case 1:

                // Mostramos mensaje
                const terminoDeBusqueda = await leerInput( 'Ciudad: ' );

                const lugares = await busquedas.ciudad( terminoDeBusqueda );

                const id = await listarLugares( lugares );

                if ( id === '0' ) continue;

                const lugarSeleccionado = lugares.find( lugar => lugar.id === id );
                
                const { nombre, lng, lat } = lugarSeleccionado;

                busquedas.agregarHistorial( lugarSeleccionado.nombre );

                const clima = await busquedas.climaLugar( lat, lng );

                const { desc, min, max, temp } = clima;

                console.clear();
                console.log('\nInformación de la ciudad\n'.green)
                console.log( 'Ciudad: ', nombre.white );
                console.log( 'Lat: ', lat );
                console.log( 'Long: ', lng );
                console.log( 'Temperatura: ', temp );
                console.log( 'Mínima: ', min );
                console.log( 'Máxima: ', max );
                console.log( 'Clima: ', desc.blue );
                
            break;

            case 2:

                busquedas.historialCapitalizado.forEach( ( lugar, i ) => {

                    const index = `${ i + 1 }.`.green;

                    console.log( `${ index } ${ lugar }` )
                    
                });
                
            break;

        }

        if ( opt !== 0 ) {

            await pausa();

        }

    } while ( opt !== 0 );

}

main();