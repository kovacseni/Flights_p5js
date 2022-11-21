let flightsTable;
let flights;
let fromLongitudes;
let fromLatitudes;
let toLongitudes;
let toLatitudes;

function preload() {
    flightsTable = loadTable('flights.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    fromLongitudes = flightsTable.getColumn('from_long').map(
        l => map(l, -180, 180, 0, width) 
    );
    fromLatitudes = flightsTable.getColumn('from_lat'). map(
        l => map(l, 90, -90, 0, height)
    );
    toLongitudes = flightsTable.getColumn('to_long').map(
        l => map(l, -180, 180, 0, width) 
    );
    toLatitudes = flightsTable.getColumn('to_lat'). map(
        l => map(l, 90, -90, 0, height)
    );

    flights = flightsTable.getRows().map( 
        (f, i) =>
        ({
            from_airport: f.get('from_airport'),
            from_city: f.get('from_city'),
            from_country: f.get('from_country'),
            from_long: fromLongitudes[i],
            from_lat: fromLatitudes[i],
            to_airport: f.get('to_lat'),
            to_city: f.get('to_city'),
            to_country: f.get('to_country'),
            to_long: toLongitudes[i],
            to_lat: toLatitudes[i],
            airline: f.get('airline'),
            airline_country: f.get('airline_country'),
            distance: f.get('distance'),
            active: false
        })
    )
   
    colorMode(HSL);
    noLoop();
}

function draw() {
    background(80);
   
    const fromPoints = fromLongitudes.forEach(
        (p, i) => {
            point(fromLongitudes[i], fromLatitudes[i]);
            stroke(240, 50, 50, 50);
            strokeWeight(3); 
        }
    );

    const toPoints = toLongitudes.forEach(
        (p, i) => {
            point(toLongitudes[i], toLatitudes[i]);
            stroke(240, 50, 50, 50);
            strokeWeight(3); 
        }
    );

    /*
    let curves = fromLongitudes.map(
        (p, i) => 
            curve(fromLongitudes[i] - 40, fromLatitudes[i] + 40, 
                    fromLongitudes[i], fromLatitudes[i], toLongitudes[i], toLatitudes[i], 
                    toLongitudes[i] - 40, toLatitudes[i] + 40)
    );
    */

    noFill();

    flights.forEach(
        (flight, i) => {
            if (flight.active) {
                stroke(0, 50, 50, 50);
                strokeWeight(0.5); 
                curve(fromLongitudes[i] - 40, fromLatitudes[i] + 40, 
                    fromLongitudes[i], fromLatitudes[i], toLongitudes[i], toLatitudes[i], 
                    toLongitudes[i] - 40, toLatitudes[i] + 40)
            }
        }
    ); 

    /*
    activeCurves.forEach(
        (c, i) => {
            stroke(0, 50, 50, 50);
            strokeWeight(10);
            curve(fromLongitudes[i] - 40, fromLatitudes[i] + 40, 
                fromLongitudes[i], fromLatitudes[i], toLongitudes[i], toLatitudes[i], 
                toLongitudes[i] - 40, toLatitudes[i] + 40)
        }
    )  
    */
}


function mouseMoved() {
    
    console.log(`${mouseX} ${mouseY}`);
    flights.forEach((flight) => {
        flight.active = abs(flight.from_long - mouseX) < 5 && abs(flight.from_lat - mouseY) < 5 ? true : false;
    });
    flights.filter((flight) => flight.active).forEach((flight) => {
        console.log(`V2${flight.from_long} ${flight.from_lat}}`);
    });
    draw();
} 
