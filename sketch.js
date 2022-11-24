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
    background(240, 80, 90, 100);
   
    const fromPoints = fromLongitudes.forEach(
        (p, i) => {
            point(fromLongitudes[i], fromLatitudes[i]);
            stroke(240, 100, 25, 100);
            strokeWeight(3); 
        }
    );

    const toPoints = toLongitudes.forEach(
        (p, i) => {
            point(toLongitudes[i], toLatitudes[i]);
            stroke(240, 100, 25, 100);
            strokeWeight(3); 
        }
    );

  

    flights.forEach(
        (flight, i) => {
            if (flight.active) {
                noFill();
                stroke(0, 100, 50, 1);
                strokeWeight(0.5); 
                curve(fromLongitudes[i] - 40, fromLatitudes[i] + 40, 
                    fromLongitudes[i], fromLatitudes[i], toLongitudes[i], toLatitudes[i], 
                    toLongitudes[i] - 40, toLatitudes[i] + 40);
                noStroke();    
                textFont('Arial'); 
                textSize(20);
                textStyle(BOLD); 
                fill(0, 0, 0, 100); 
                text(flight.from_city, fromLongitudes[i], fromLatitudes[i]);   
            }
        }
    ); 
}


function mouseMoved() {
    
    flights.forEach((flight) => {
        flight.active = abs(flight.from_long - mouseX) < 1 && abs(flight.from_lat - mouseY) < 1 ? true : false;
    });
    draw();
} 
